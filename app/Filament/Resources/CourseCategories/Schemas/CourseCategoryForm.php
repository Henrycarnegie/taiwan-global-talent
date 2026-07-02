<?php

namespace App\Filament\Resources\CourseCategories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
class CourseCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('name')
                ->required(),

            TextInput::make('slug')
                ->required(),

            TextInput::make('order')
                ->numeric()
                ->default(0),
        ]);
    }
}
