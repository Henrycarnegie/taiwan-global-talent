<?php

namespace App\Filament\Resources\CommunityComments\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CommunityCommentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('community_post_id')
                    ->relationship('post', 'content')
                    ->getOptionLabelFromRecordUsing(fn ($record) => "Post #{$record->id}: ".Str::limit($record->content, 40))
                    ->searchable()
                    ->required()
                    ->label('Main Post'),

                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required()
                    ->label('Author'),

                Select::make('parent_id')
                    ->relationship('replies', 'content')
                    ->getOptionLabelFromRecordUsing(fn ($record) => "Comment #{$record->id}: ".Str::limit($record->content, 30))
                    ->nullable()
                    ->searchable()
                    ->label('Main Comment (Leave empty if it is a main comment)'),

                Textarea::make('content')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull()
                    ->label('Comment Content'),
            ])->columns(2);
    }
}
