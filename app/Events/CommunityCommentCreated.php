<?php

namespace App\Events;

use App\Models\CommunityComment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommunityCommentCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $comment;

    public function __construct(CommunityComment $comment)
    {
        $this->comment = [
            'id' => $comment->id,
            'community_post_id' => $comment->community_post_id,
            'content' => $comment->content,
            'created_at' => $comment->created_at->toIso8601String(),
            'user' => [
                'name' => $comment->user->name,
                'avatar_url' => $comment->user->avatar_url,
            ],
        ];
    }

    public function broadcastOn(): array
    {
        return [new Channel('community-feed')];
    }

    public function broadcastAs(): string
    {
        return 'CommunityCommentCreated';
    }
}