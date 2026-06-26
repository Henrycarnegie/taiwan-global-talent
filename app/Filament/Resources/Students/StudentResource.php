<?php

namespace App\Filament\Resources\Students;

use App\Filament\Resources\Students\Pages\CreateStudent;
use App\Filament\Resources\Students\Pages\EditStudent;
use App\Filament\Resources\Students\Pages\ListStudents;
use App\Models\User;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table; 
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Illuminate\Database\Eloquent\Builder;
use BackedEnum;

class StudentResource extends Resource
{
    // Menggunakan model User karena data akun ada di tabel users
    protected static ?string $model = User::class;

    // 2. Hapus deklarasi type-hinting 'string|BackedEnum|null' agar serasi dengan kelas induk v5
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Students';

    protected static ?string $slug = 'students';

    /**
     * Filter global agar menu ini HANYA menampilkan user yang ber-role Student (role_id = 2)
     */
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('role_id', 2); 
    }

    /**
     * 3. Struktur form diubah menggunakan Schema $schema : Schema
     */
    public static function form(Schema $schema): Schema
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
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable(),
                
                TextColumn::make('studentProfile.university')
                    ->label('University')
                    ->searchable(),
                TextColumn::make('studentProfile.mandarin_level')
                    ->label('Mandarin Level'),

                IconColumn::make('studentProfile.is_public')
                    ->label('Public')
                    ->boolean(),
            ])
            ->filters([
                //
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListStudents::route('/'),
            'create' => CreateStudent::route('/create'),
            'edit' => EditStudent::route('/{record}/edit'),
        ];
    }
}