<?php

namespace App\Filament\Resources\CourseRoutes;

use App\Filament\Resources\CourseRoutes\Pages\CreateCourseRoute;
use App\Filament\Resources\CourseRoutes\Pages\EditCourseRoute;
use App\Filament\Resources\CourseRoutes\Pages\ListCourseRoutes;
use App\Filament\Resources\CourseRoutes\Schemas\CourseRouteForm;
use App\Filament\Resources\CourseRoutes\Tables\CourseRoutesTable;
use App\Models\CourseRoute;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CourseRouteResource extends Resource
{
    protected static ?string $model = CourseRoute::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static UnitEnum|string|null $navigationGroup = 'Course';

    public static function form(Schema $schema): Schema
    {
        return CourseRouteForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CourseRoutesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCourseRoutes::route('/'),
            'create' => CreateCourseRoute::route('/create'),
            'edit' => EditCourseRoute::route('/{record}/edit'),
        ];
    }
}
