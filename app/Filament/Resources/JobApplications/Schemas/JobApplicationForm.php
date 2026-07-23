<?php

namespace App\Filament\Resources\JobApplications\Schemas;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class JobApplicationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Information of Applicant & Job')
                    ->schema([
                        Select::make('company_job_id')
                            ->relationship('companyJob', 'title')
                            ->required()
                            ->label('Job Title'),

                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->label('User (Student)'),

                        TextInput::make('candidate_name')
                            ->required()
                            ->label('Candidate Name'),

                        TextInput::make('candidate_email')
                            ->email()
                            ->required()
                            ->label('Email'),

                        TextInput::make('candidate_phone')
                            ->label('Phone / Whatsapp'),

                        Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'reviewed' => 'Reviewed',
                                'interviewed' => 'Interviewed',
                                'hired' => 'Hired',
                                'rejected' => 'Rejected',
                            ])
                            ->required()
                            ->default('pending'),
                    ])->columns(2),

                Section::make('Resume & Cover Letter')
                    ->schema([
                        TextInput::make('resume_path')
                            ->label('Resume Path (R2 Storage)')
                            ->disabled(),

                        Textarea::make('cover_letter')
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
