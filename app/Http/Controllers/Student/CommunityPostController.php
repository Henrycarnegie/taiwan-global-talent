<?php

namespace App\Http\Controllers\Student;

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

class CommunityPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil data posts seperti biasa
        $postsQuery = CommunityPost::with(['user', 'likes', 'comments.user'])
            ->orderBy('is_pinned', 'desc')
            ->latest()
            ->paginate(10);

        // Transformasi data posts (logika data array mapping yang sudah kamu buat sebelumnya)
        $formattedPosts = $postsQuery->through(function ($post) {
            return [
                'id' => $post->id,
                'user' => [
                    'id' => $post->user->id,
                    'name' => $post->user->name,
                    'avatar_url' => $post->user->avatar_url,
                    'university' => $post->user->university ?? 'Taiwan Alumni',
                    'role' => $post->user->role,
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
                        'name' => $comment->user->name,
                        'avatar_url' => $comment->user->avatar_url,
                    ],
                ]),
                'created_at' => $post->created_at->toIso8601String(),
            ];
        });

        if ((request()->wantsJson() || request()->ajax()) && ! request()->hasHeader('X-Inertia')) {
            return response()->json($formattedPosts);
        }

        // Jika load pertama kali atau redirect setelah posting dari Inertia, render halaman seperti biasa
        return Inertia::render('Student/Community/Index', [
            'initialPosts' => $formattedPosts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
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
                    // Proses upload langsung ke disk s3 (Cloudflare R2)
                    $mediaPath = $file->store('community-media', 's3');

                    $mime = $file->getClientMimeType();
                    $mediaType = str_contains($mime, 'video') ? 'video' : 'image';
                } else {
                    return redirect()->back()->withErrors(['media' => 'File unggahan tidak valid atau rusak.']);
                }
            } catch (\Exception $e) {
                // JIKA R2 EROR, LOG AKAN MENCATAT ALASAN ASLINYA
                Log::error('Gagal upload ke Cloudflare R2: '.$e->getMessage());

                // Mengembalikan pesan error ke frontend agar kamu tahu kerusakannya di mana
                return redirect()->back()->withErrors(['media' => 'Koneksi Cloudflare R2 Gagal: '.$e->getMessage()]);
            }
        }

        // Buat data ke MySQL
        $post = CommunityPost::create([
            'user_id' => auth()->id(),
            'content' => $request->content,
            'tag' => $request->tag,
            'media_path' => $mediaPath,
            'media_type' => $mediaType,
        ]);

        $post->load('user');

        // Memicu real-time update Reverb
        broadcast(new CommunityPostCreated($post))->toOthers();

        return redirect()->back()->with('success', 'Post shared successfully!');
    }

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

        // Pemicu siaran real-time angka likes ke user lainnya
        broadcast(new CommunityPostLiked($post->id, $post->likes_count, $userId, $isLiked))->toOthers();

        return redirect()->back();
    }

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

        // Load relasi user untuk keperluan profile penulisan real-time di frontend
        $comment->load('user');

        // Pemicu siaran komentar real-time
        broadcast(new CommunityCommentCreated($comment))->toOthers();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
