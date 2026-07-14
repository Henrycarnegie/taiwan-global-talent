<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonAudio extends Model
{
    protected $table = 'lesson_audios';

    protected $fillable = [
        'lesson_id',
        'lesson_audio_path',
        'lesson_audio_description',
        'sort_order',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}