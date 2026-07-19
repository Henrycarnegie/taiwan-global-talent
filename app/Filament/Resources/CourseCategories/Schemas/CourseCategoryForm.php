<?php

namespace App\Filament\Resources\CourseCategories\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CourseCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('name')
                ->live(onBlur: true)
                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

            TextInput::make('slug')
                ->disabled()
                ->dehydrated(),

            TextInput::make('order')
                ->numeric()
                ->default(0),

            TextInput::make('description')->required(),
            TextInput::make('instructor')->required(),
            TextInput::make('duration')->placeholder('Contoh: 10 Jam'),
            TextInput::make('price')->numeric()->prefix('TWD'),
            Select::make('icon')
                ->options([
                    'Code' => 'Code',
                    'BookOpen' => 'Book',
                    'Database' => 'Database',
                    'Laptop' => 'Laptop',
                    'Globe' => 'Globe',
                    'Palette' => 'Design',
                ]),
            FileUpload::make('thumbnail_path')
                ->label('Thumbnail')
                ->directory('course-categories/thumbnails')
                ->disk('s3')
                ->acceptedFileTypes(['image/jpeg', 'image/png'])
                ->live(),
        ]);
    }
}
