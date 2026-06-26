<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    protected $fillable = [
        'user_id', 'country', 'university', 'major', 'mandarin_level', 
        'toefl_score', 'tocfl_score', 'skills', 'certificates', 'learning_goal', 'bio', 'is_public'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
