<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'instructor',
        'duration',
        'thumbnail_path',
        'price',
        'order',
    ];

    public function modules(): HasMany
    {
        return $this->hasMany(Module::class, 'category_id')->orderBy('order');
    }
    
    public function enrollments()
    {
        return $this->hasMany(CourseEnrollment::class);
    }
    
    public function scopeFilter($query, $filters)
    {
        return $query
            ->when($filters['status'], fn($q) => $q->where('status', $filters['status']))
            ->when($filters['level'], fn($q) => $q->where('level', $filters['level']))
            ->when($filters['category_id'], fn($q) => $q->where('category_id', $filters['category_id']))
            ->when($filters['search'], function ($q) use ($filters) {
                return $q->where('title', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
    }
}
