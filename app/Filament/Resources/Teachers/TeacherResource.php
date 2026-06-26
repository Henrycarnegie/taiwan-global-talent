<?php

namespace App\Filament\Resources\Teachers;

use App\Filament\Resources\Teachers\Pages\CreateTeacher;
use App\Filament\Resources\Teachers\Pages\EditTeacher;
use App\Filament\Resources\Teachers\Pages\ListTeachers;
use App\Models\User;
use Filament\Resources\Resource;
use Filament\Schemas\Schema; 
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use BackedEnum;

class TeacherResource extends Resource
{
    protected static ?string $model = User::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Teachers';

    protected static ?string $slug = 'teachers';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('role_id', 3); 
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Full Name')
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

                TextInput::make('teacherProfile.university')
                    ->label('Graduated From / University'),

                TextInput::make('teacherProfile.major')
                    ->label('Expertise / Major'),

                TextInput::make('teacherProfile.skills')
                    ->label('Skills (e.g., Mandarin, Teaching)'),

                Textarea::make('teacherProfile.bio')
                    ->label('Teacher Biography')
                    ->rows(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable(),

                TextColumn::make('teacherProfile.university')
                    ->label('University')
                    ->searchable(),

                TextColumn::make('teacherProfile.major')
                    ->label('Major/Expertise'),
            ])
            ->filters([
                //
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTeachers::route('/'),
            'create' => CreateTeacher::route('/create'),
            'edit' => EditTeacher::route('/{record}/edit'),
        ];
    }
}