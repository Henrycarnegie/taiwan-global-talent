<?php

namespace Database\Seeders;

use App\Models\CourseCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Mandarin Course',
                'slug' => 'mandarin-course',
                'order' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Agricultural Course',
                'slug' => 'agricultural-course',
                'order' => 2,
            ],
            [
                'id' => 3,
                'name' => 'Mechanical Course',
                'slug' => 'mechanical-course',
                'order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            CourseCategory::updateOrCreate(
                ['id' => $category['id']],
                [
                    'name' => $category['name'],
                    'slug' => $category['slug'],
                    'order' => $category['order'],
                ]
            );
        }
    }
}