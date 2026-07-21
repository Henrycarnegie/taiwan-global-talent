<?php

namespace App\Http\Controllers\Company;

use App\Events\CommunityCommentCreated;
use App\Events\CommunityPostCreated;
use App\Events\CommunityPostLiked;
use App\Http\Controllers\Controller;
use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CommunityPostLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyCommunityController extends Controller
{
    /**
     * Display the community feed for company portal.
     */
    public function index()
    {
        $user = auth()->user()->load('companyProfile');
        $company = $user->companyProfile;

        if ($company) {
            $disk = Storage::disk('s3');
            $company->logo_url = $company->logo_path ? $disk->url($company->logo_path) : null;
            $company->banner_url = $company->banner_path ? $disk->url($company->banner_path) : null;
        }

        $postsQuery = CommunityPost::with(['user.companyProfile', 'likes', 'comments.user.companyProfile'])
            ->orderBy('is_pinned', 'desc')
            ->latest()
            ->paginate(10);

        $formattedPosts = $postsQuery->through(function ($post) {
            return [
                'id' => $post->id,
                'user' => [
                    'id' => $post->user->id,
                    'name' => $post->user->display_name,           
                    'avatar_url' => $post->user->display_avatar,   
                    'university' => $post->user->display_subtitle, 
                    'role' => $post->user->companyProfile ? 'company' : 'student',
                ],
                'tag' => $post->tag ?? 'General',
                'content' => $post->content,
                'media_url' => $post->media_url,
                'media_type' => $post->media_type,
                'is_pinned' => (bool) $post->is_pinned,
                'likes_count' => $post->likes_count,
                'comments_count' => $post->comments()->count(),
                'is_liked_by_me' => auth()->check() ? $post->likes->contains('user_id', auth()->id()) : false,
                'comments' => $post->comments->map(fn ($comment) => [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'created_at' => $comment->created_at->toIso8601String(),
                    'user' => [
                        'name' => $comment->user->display_name,     
                        'avatar_url' => $comment->user->display_avatar, 
                    ],
                ]),
                'created_at' => $post->created_at->toIso8601String(),
            ];
        });

        if ((request()->wantsJson() || request()->ajax()) && ! request()->hasHeader('X-Inertia')) {
            return response()->json($formattedPosts);
        }

        return Inertia::render('Company/Community/Index', [
            'company' => $company,
            'initialPosts' => $formattedPosts,
        ]);
    }

    /**
     * Store a newly created post from company.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:5000',
            'tag' => 'required|string',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov|max:20480', // Max 20MB
        ]);

        $mediaPath = null;
        $mediaType = null;

        if ($request->hasFile('media')) {
            try {
                $file = $request->file('media');

                if ($file->isValid()) {
                    // Upload langsung ke Cloudflare R2 ('s3')
                    $mediaPath = $file->store('community-media', 's3');
                    $mime = $file->getClientMimeType();
                    $mediaType = str_contains($mime, 'video') ? 'video' : 'image';
                } else {
                    return redirect()->back()->withErrors(['media' => 'File unggahan tidak valid.']);
                }
            } catch (\Exception $e) {
                Log::error('Gagal upload R2 dari Company Community: '.$e->getMessage());

                return redirect()->back()->withErrors(['media' => 'Upload Cloudflare R2 Gagal: '.$e->getMessage()]);
            }
        }

        $post = CommunityPost::create([
            'user_id' => auth()->id(),
            'content' => $request->content,
            'tag' => $request->tag,
            'media_path' => $mediaPath,
            'media_type' => $mediaType,
        ]);

        $post->load('user.companyProfile');

        // Siaran real-time via Reverb
        broadcast(new CommunityPostCreated($post))->toOthers();

        return redirect()->back()->with('success', 'Company update posted successfully!');
    }

    /**
     * Toggle like post.
     */
    public function toggleLike($id)
    {
        $userId = auth()->id();
        $like = CommunityPostLike::where('community_post_id', $id)->where('user_id', $userId)->first();
        $post = CommunityPost::findOrFail($id);

        if ($like) {
            $like->delete();
            $post->decrement('likes_count');
            $isLiked = false;
        } else {
            CommunityPostLike::create([
                'community_post_id' => $id,
                'user_id' => $userId,
            ]);
            $post->increment('likes_count');
            $isLiked = true;
        }

        broadcast(new CommunityPostLiked($post->id, $post->likes_count, $userId, $isLiked))->toOthers();

        return redirect()->back();
    }

    /**
     * Store comment.
     */
    public function storeComment(Request $request, $postId)
    {
        $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $comment = CommunityComment::create([
            'community_post_id' => $postId,
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        $comment->load('user.companyProfile');

        broadcast(new CommunityCommentCreated($comment))->toOthers();

        return redirect()->back();
    }
}