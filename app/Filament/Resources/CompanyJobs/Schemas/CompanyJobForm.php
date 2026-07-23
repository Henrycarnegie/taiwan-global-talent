<?php

namespace App\Filament\Resources\CompanyJobs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CompanyJobForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Job Information')
                    ->schema([
                        Select::make('company_profile_id')
                            ->relationship('companyProfile', 'company_display_name')
                            ->searchable()
                            ->required()
                            ->label('Perusahaan'),

                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        Select::make('type')
                            ->options([
                                'Full-time' => 'Full-time',
                                'Part-time' => 'Part-time',
                                'Contract' => 'Contract',
                                'Internship' => 'Internship',
                            ])
                            ->required(),

                        Select::make('location_type')
                            ->options([
                                'On-site' => 'On-site',
                                'Remote' => 'Remote',
                                'Hybrid' => 'Hybrid',
                            ])
                            ->required(),

                        TextInput::make('city')
                            ->placeholder('e.g. Taipei, Hsinchu'),

                        TextInput::make('salary_range')
                            ->placeholder('e.g. NT$ 40,000 - 60,000 / month'),

                        Select::make('status')
                            ->options([
                                'published' => 'Published',
                                'draft' => 'Draft',
                                'closed' => 'Closed',
                            ])
                            ->required()
                            ->default('published'),
                    ])->columns(2),

                Section::make('Details & Requirements')
                    ->schema([
                        RichEditor::make('description')
                            ->columnSpanFull(),

                        RichEditor::make('requirements')
                            ->columnSpanFull(),
                    ]),

                Section::make('Metadata')
                    ->schema([
                        DateTimePicker::make('published_at')
                            ->label('Date Published'),

                        DateTimePicker::make('application_deadline')
                            ->label('Application Deadline'),
                    ])->columns(2),
            ])->columns(1);
    }
}
