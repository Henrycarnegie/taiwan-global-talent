<?php

namespace App\Filament\Resources\CourseRoutes\Pages;

use App\Filament\Resources\CourseRoutes\CourseRouteResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCourseRoutes extends ListRecords
{
    protected static string $resource = CourseRouteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
