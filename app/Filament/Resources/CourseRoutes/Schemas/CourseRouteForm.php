<?php

namespace App\Filament\Resources\CourseRoutes\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use App\Models\CourseRoute;
use Filament\Schemas\Components\Utilities\Set; // 👈 Class Set yang benar untuk versi ini

class CourseRouteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, Set $set) => 
                        $operation === 'create' ? $set('slug', \Str::slug($state)) : null
                    ),

                TextInput::make('slug')
                    ->disabled()
                    ->dehydrated()
                    ->required()
                    ->unique(CourseRoute::class, 'slug', ignoreRecord: true),

                TextInput::make('icon')
                    ->placeholder('heroicon-o-academic-cap'),

                TextInput::make('order')
                    ->numeric()
                    ->default(0),
        ]);
    }
}