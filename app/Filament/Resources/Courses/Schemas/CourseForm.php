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

        // Jika sedang edit, ambil category_id dari database. Jika bikin baru, ambil dari URL query.
        $categoryId = $record ? $record->category_id : (request()->query('category') ?? 1);

        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),

                // 1. Amankan category_id secara otomatis dan sembunyikan/kunci
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->default($categoryId)
                    ->disabled()
                    ->dehydrated()
                    ->required(),

                // 2. Buat field level menjadi dinamis labelnya
                TextInput::make('level')
                    ->label(fn () => $categoryId == 1 ? 'Mandarin Level (e.g. HSK 1)' : 'Tingkat Kursus / Level')
                    ->required(),

                Toggle::make('is_published')
                    ->required(),

                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),

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
                            ->label('Kosa Kata dalam Pelajaran Ini')
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
