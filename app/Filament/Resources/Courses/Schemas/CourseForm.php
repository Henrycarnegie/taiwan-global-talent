<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // --- FIELD UTAMA UNTUK COURSE ---
                TextInput::make('title')
                    ->required(),

                TextInput::make('mandarin_level')
                    ->required(),

                Toggle::make('is_published')
                    ->required(),

                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),

                // --- REPEATER UNTUK LESSONS (CUKUP SATU SAJA) ---
                Repeater::make('lessons')
                    ->relationship('lessons') // Menghubungkan ke Course ->hasMany(Lesson)
                    ->hiddenOn('edit') // Hanya muncul saat Create baru
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

                        // --- DROPDOWN PILIH KOSAKATA (BERADA DI DALAM LESSON) ---
                        Select::make('vocabularies')
                            ->relationship('vocabularies', 'hanzi') // Menghubungkan Lesson ->belongsToMany(Vocabulary)
                            ->multiple() 
                            ->searchable(['hanzi', 'pinyin', 'translation']) 
                            ->preload() 
                            ->label('Kosa Kata dalam Pelajaran Ini')
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