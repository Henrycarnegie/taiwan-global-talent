<?php

namespace App\Filament\Resources\Students\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StudentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->maxLength(255),

                TextInput::make('password')
                    ->password()
                    ->required(fn (string $context): bool => $context === 'create')
                    ->dehydrated(fn ($state) => filled($state))
                    ->label('Password'),

                TextInput::make('studentProfile.country')
                    ->label('Country'),

                TextInput::make('studentProfile.university')
                    ->label('University'),

                TextInput::make('studentProfile.major')
                    ->label('Major'),

                Select::make('studentProfile.mandarin_level')
                    ->label('Mandarin Level')
                    ->options([
                        'Beginner' => 'Beginner',
                        'Intermediate' => 'Intermediate',
                        'Advanced' => 'Advanced',
                    ]),

                TextInput::make('studentProfile.tocfl_score')
                    ->label('TOCFL Score')
                    ->numeric(),

                Textarea::make('studentProfile.bio')
                    ->label('Bio')
                    ->rows(3),

                Toggle::make('studentProfile.is_public')
                    ->label('Public Profile?')
                    ->default(true),            ]);
    }
}
