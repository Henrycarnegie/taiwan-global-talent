<?php

namespace App\Filament\Resources\CourseRoutes\Schemas;

use App\Models\CourseRoute;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema; // Correct Set class for this version.

class CourseRouteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, Set $set) => $operation === 'create' ? $set('slug', \Str::slug($state)) : null
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
