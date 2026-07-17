<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommunityPostLiked implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $postId;
    public int $likesCount;
    public int $userId;
    public bool $isLiked;

    public function __construct(int $postId, int $likesCount, int $userId, bool $isLiked)
    {
        $this->postId = $postId;
        $this->likesCount = $likesCount;
        $this->userId = $userId;
        $this->isLiked = $isLiked;
    }

    public function broadcastOn(): array
    {
        return [new Channel('community-feed')];
    }

    public function broadcastAs(): string
    {
        return 'CommunityPostLiked';
    }
}