<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'bio',
        'cv_path',
        'expertise',
        'certificate_path',
        'learning_goal',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
