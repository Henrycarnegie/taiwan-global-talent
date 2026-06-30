<?php

namespace App\Filament\Resources\Lessons\Pages;

use App\Filament\Resources\Lessons\LessonsResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLessons extends CreateRecord
{
    protected static string $resource = LessonsResource::class;
}
