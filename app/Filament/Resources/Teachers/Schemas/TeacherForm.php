<?php

namespace App\Filament\Resources\Teachers\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TeacherForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('full_name')
                    ->label('Full Name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Email Address')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                TextInput::make('phone')
                    ->label('Phone Number (WhatsApp)')
                    ->tel()
                    ->placeholder('e.g. +886912345678')
                    ->maxLength(20),

                TextInput::make('expertise')
                    ->label('Expertise')
                    ->placeholder('e.g. Mathematics, English')
                    ->maxLength(255),

                TextInput::make('learning_goal')
                    ->label('Learning Goal')
                    ->placeholder('e.g. Preparing for IELTS')
                    ->maxLength(255),

                Textarea::make('bio')
                    ->label('Bio / Teaching Experience')
                    ->rows(4)
                    ->columnSpanFull(),

                Select::make('status')
                    ->label('Application Status')
                    ->options([
                        'pending' => 'Pending (Waiting Approval)',
                        'approved' => 'Approved (Active)',
                        'rejected' => 'Rejected',
                    ])
                    ->required()
                    ->default('pending')
                    ->native(false),
            ]);
    }
}
