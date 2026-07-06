<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function lessons(): BelongsToMany
    {
        return $this->belongsToMany(Lesson::class, 'lesson_vocabulary')
                    ->withPivot('sort_order')
                    ->withTimestamps();
    }

    public function getPronunciationAttribute()
    {
        if ($this->audio_path) {
            return $this->audio_path;
        }

        return Storage::url('vocabularies/'.$this->id.'.mp3');
    }
}
