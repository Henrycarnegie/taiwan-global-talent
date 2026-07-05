<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Vocabulary extends Model
{
    protected $fillable = [
        'lesson_id',
        'hanzi',
        'pinyin',
        'meaning',
        'audio_path',
        'sort_order',
        'is_active',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function getPronunciationAttribute()
    {
        if ($this->audio_path) {
            return $this->audio_path;
        }

        return Storage::url('vocabularies/'.$this->id.'.mp3');
    }
}
