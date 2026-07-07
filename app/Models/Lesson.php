<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'content',
        'order',
        'sentence_hanzi',
        'audio_path',
        'audio_hash',
        
        'content_type',
        'video_url',
        'video_path',
        'lesson_audio_path',
        'pdf_path',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function sentences(): HasMany
    {
        return $this->hasMany(Sentence::class)->orderBy('sort_order');
    }

    public function vocabularies(): BelongsToMany
    {
        return $this->belongsToMany(Vocabulary::class, 'lesson_vocabulary')
            ->withPivot('sort_order')
            ->withTimestamps();
    }
}