<?php

namespace App\Filament\Resources\CommunityPostLikes\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Illuminate\Support\Str;

class CommunityPostLikeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Data Like')
                    ->schema([
                    Select::make('community_post_id')
                        ->relationship('post', 'content')
                        ->getOptionLabelFromRecordUsing(fn ($record) => "Post #{$record->id}: " . Str::limit($record->content, 40))
                        ->searchable()
                        ->required()
                        ->label('Target Post'),

                    Select::make('user_id')
                        ->relationship('user', 'name')
                        ->searchable()
                        ->required()
                        ->label('Liker'),
                ])->columns(2),
        ]);
    }
}
