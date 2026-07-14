<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        $record = $schema->getRecord();

        // When editing, use category_id from the database. When creating, use the URL query.
        $categoryId = $record ? $record->category_id : (request()->query('category') ?? 1);

        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),

                // 1. Safely set category_id automatically and keep it locked.
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->default($categoryId)
                    ->disabled()
                    ->dehydrated()
                    ->required(),

                // 2. Make the level field label dynamic.
                TextInput::make('level')
                    ->label(fn () => $categoryId == 1 ? 'Mandarin Level (e.g. HSK 1)' : 'Course Level')
                    ->required(),

                Toggle::make('is_published')
                    ->required(),

                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('google_slides_template_id')
                    ->label('Google Slides Template ID')
                    ->helperText('Contoh ID dari URL: https://docs.google.com/presentation/d/[TEMPLATE_ID]/edit')
                    ->placeholder('1A2b3C4d5E6f7G8h9I0J...')
                    ->columnSpanFull()
                    ->required(),

                // --- REPEATER UNTUK LESSONS ---
                Repeater::make('lessons')
                    ->relationship('lessons')
                    ->hiddenOn('edit')
                    ->schema([
                        TextInput::make('title')
                            ->label('Lesson Title')
                            ->required(),

                        Textarea::make('content')
                            ->label('Content')
                            ->required(),

                        TextInput::make('order')
                            ->label('Order')
                            ->numeric()
                            ->required(),

                        Select::make('vocabularies')
                            ->relationship('vocabularies', 'hanzi')
                            ->multiple()
                            ->searchable(['hanzi', 'pinyin', 'translation'])
                            ->preload()
                            ->label('Vocabulary in This Lesson')
                            ->hidden(fn () => $categoryId != 1)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull()
                    ->label('Lessons List')
                    ->addActionLabel('Add New Lesson')
                    ->reorderable('order')
                    ->collapsible(),
            ]);
    }
}
