<?php

namespace App\Events;

use App\Models\CommunityPost;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommunityPostCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $post;

    /**
     * Create a new event instance.
     */
    public function __construct(CommunityPost $post)
    {
        $this->post = [
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
            'likes_count' => 0,
            'comments_count' => 0,
            'is_liked_by_me' => false,
            'comments' => [],
            'created_at' => $post->created_at->toIso8601String(),
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('community-feed'),
        ];
    }

    /**
     * Nama event yang akan didengar oleh Laravel Echo di frontend
     */
    public function broadcastAs(): string
    {
        return 'CommunityPostCreated';
    }
}