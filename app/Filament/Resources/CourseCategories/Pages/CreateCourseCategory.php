<?php

namespace App\Filament\Resources\CourseCategories\Pages;

use App\Filament\Resources\CourseCategories\CourseCategoryResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCourseCategory extends CreateRecord
{
    protected static string $resource = CourseCategoryResource::class;

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'New Course created';
    }
}
