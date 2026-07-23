<?php

namespace App\Filament\Resources\CommunityPostLikes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;

class CommunityPostLikesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('User')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('post.content')
                    ->label('Post Content')
                    ->limit(60)
                    ->searchable(),

                TextColumn::make('created_at')
                    ->label('Liked At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Filter User'),
            ])
            ->recordActions([
                DeleteAction::make()->label('Delete Like'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
