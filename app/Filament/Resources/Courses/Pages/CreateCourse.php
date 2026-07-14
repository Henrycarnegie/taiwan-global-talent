<?php

namespace App\Filament\Resources\Courses\Pages;

use App\Filament\Resources\Courses\CourseResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCourse extends CreateRecord
{
    protected static string $resource = CourseResource::class;

    protected function getRedirectUrl(): string
    {
        // After creating a record, redirect to edit while preserving the original category.
        return $this->getResource()::getUrl('edit', [
            'record' => $this->record,
            'category' => $this->record->category_id,
        ]);
    }
}
