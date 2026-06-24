<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'country',
        'university',
        'mandarin_level',
        'toefl_score',
        'tocfl_score',
        'skills',
        'certificates',
        'learning_goal',
        'bio',
        'is_public',
    ];

    protected $casts = [
        'is_public' => 'boolean',
    ];
}
