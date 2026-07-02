<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class CourseRoute extends Model
{
    protected $fillable = ['title', 'slug', 'icon', 'order', 'is_active'];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function booted()
    {
        static::saved(fn() => Cache::forget('dynamic_course_sidebar_menu'));
        static::deleted(fn() => Cache::forget('dynamic_course_sidebar_menu'));
    }
}
