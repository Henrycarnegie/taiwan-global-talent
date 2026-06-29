<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use HasFactory;

    // Use this to tell Laravel which fields are safe to save
    protected $fillable = ['user_id', 'lesson_id', 'is_completed'];

    public function user()
    {
        // This links to the standard Laravel User model
        return $this->belongsTo(User::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}