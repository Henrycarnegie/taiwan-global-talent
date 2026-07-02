<?php

namespace App\Filament\Resources\CourseRoutes\Pages;

use App\Filament\Resources\CourseRoutes\CourseRouteResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCourseRoute extends EditRecord
{
    protected static string $resource = CourseRouteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
