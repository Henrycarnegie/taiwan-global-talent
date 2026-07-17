<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class CommunityPost extends Model
{
    protected $fillable = ['user_id', 'content', 'media_path', 'media_type', 'is_pinned', 'likes_count'];

    // Menghasilkan full URL dari R2 Cloudflare untuk frontend React
    protected $appends = ['media_url'];

    public function getMediaUrlAttribute(): ?string
    {
        return $this->media_path ? Storage::disk('s3')->url($this->media_path) : null;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(CommunityComment::class)->whereNull('parent_id');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(CommunityPostLike::class);
    }
}