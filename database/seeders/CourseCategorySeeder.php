<?php

namespace Database\Seeders;

use App\Models\CourseCategory;
use Illuminate\Database\Seeder;

class CourseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Mandarin Course',
                'slug' => 'mandarin-course',
                'description' => 'Master Mandarin from basic to advanced levels with professional guidance.',
                'icon' => 'Globe', // Icon dari Lucide
                'instructor' => 'Wang Laoshi',
                'duration' => '12 Weeks',
                'price' => 500000,
                'order' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Agricultural Course',
                'slug' => 'agricultural-course',
                'description' => 'Modern farming techniques and sustainable agriculture practices.',
                'icon' => 'Leaf',
                'instructor' => 'Dr. Budi Santoso',
                'duration' => '8 Weeks',
                'price' => 350000,
                'order' => 2,
            ],
            [
                'id' => 3,
                'name' => 'Mechanical Course',
                'slug' => 'mechanical-course',
                'description' => 'Learn the fundamentals of mechanical engineering and machine maintenance.',
                'icon' => 'Settings',
                'instructor' => 'Eng. Kevin Hart',
                'duration' => '10 Weeks',
                'price' => 450000,
                'order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            CourseCategory::updateOrCreate(
                ['id' => $category['id']],
                $category
            );
        }
    }
}