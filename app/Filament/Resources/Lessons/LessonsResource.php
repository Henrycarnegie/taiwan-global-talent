<?php

namespace App\Filament\Resources\Lessons;

use App\Filament\Resources\Lessons\Pages\CreateLessons;
use App\Filament\Resources\Lessons\Pages\EditLessons;
use App\Filament\Resources\Lessons\Pages\ListLessons;
use App\Filament\Resources\Lessons\Schemas\LessonsForm;
use App\Filament\Resources\Lessons\Tables\LessonsTable;
use App\Models\Lesson;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class LessonsResource extends Resource
{
    protected static ?string $model = Lesson::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-book-open';

    protected static UnitEnum|string|null $navigationGroup = 'Courses Management';

    protected static ?string $navigationLabel = 'Add New Lessons';

    public static function form(Schema $schema): Schema
    {
        return LessonsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LessonsTable::configure($table);
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
            'index' => ListLessons::route('/'),
            'create' => CreateLessons::route('/create'),
            'edit' => EditLessons::route('/{record}/edit'),
        ];
    }
}
