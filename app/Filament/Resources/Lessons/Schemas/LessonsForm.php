<?php

namespace App\Filament\Resources\Lessons\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

class LessonsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('course_id')
                    ->relationship('course', 'title')
                    ->label('Course')
                    ->preload(),

                TextInput::make('title')
                    ->label('Title')
                    ->required(),

                Textarea::make('content')
                    ->label('Content')
                    ->required(),

                TextInput::make('order')
                    ->label('Order')
                    ->numeric()
                    ->required(),
            ]);
    }
}
