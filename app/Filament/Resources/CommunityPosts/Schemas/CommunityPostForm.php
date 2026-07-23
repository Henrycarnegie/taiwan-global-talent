<?php

namespace App\Filament\Resources\CommunityPosts\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CommunityPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required()
                    ->label('Penulis'),

                Select::make('tag')
                    ->options([
                        'General' => 'General',
                        'Scholarships & Paperwork' => 'Scholarships & Paperwork',
                        'Internship Info' => 'Internship Info',
                        'Life in Taiwan' => 'Life in Taiwan',
                    ])
                    ->required(),

                Textarea::make('content')
                    ->rows(5)
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('media_path')
                    ->label('Path Media (R2)')
                    ->placeholder('community-media/xyz.jpg')
                    ->disabled(),

                Select::make('media_type')
                    ->options([
                        'image' => 'Image',
                        'video' => 'Video',
                    ]),

                Toggle::make('is_pinned')
                    ->label('Sematkan ke Atas (Pin Post)')
                    ->default(false),
            ]);
    }
}
