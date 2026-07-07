<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // protected $fillable = ['title', 'description', 'mandarin_level', 'is_published'];
    protected $fillable = [
        'title',
        'description',
        'level',
        'category_id',
        'is_published',
    ];

    public function isCompletedByUser($userId)
    {
        $totalLessons = $this->lessons()->count();
        $completedLessons = $this->lessons()
            ->whereHas('progress', function ($query) use ($userId) {
                $query->where('user_id', $userId)->where('is_completed', true);
            })->count();

        return $totalLessons > 0 && $completedLessons === $totalLessons;
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function category()
    {
        return $this->belongsTo(CourseCategory::class);
    }
}
