<?php

namespace App\Filament\Resources\CommunityPosts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Actions\Action;
use App\Models\CommunityPost;

class CommunityPostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
           ->columns([
                TextColumn::make('user.name')
                    ->label('Penulis')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('tag')
                    ->badge()
                    ->color('info'),

                TextColumn::make('content')
                    ->limit(50)
                    ->searchable(),

                IconColumn::make('is_pinned')
                    ->boolean()
                    ->label('Pinned'),

                TextColumn::make('likes_count')
                    ->numeric()
                    ->sortable()
                    ->label('Likes'),

                TextColumn::make('comments_count')
                    ->numeric()
                    ->sortable()
                    ->label('Komentar'),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_pinned')->label('Dipin'),
                SelectFilter::make('tag')->options([
                    'General' => 'General',
                    'Scholarships & Paperwork' => 'Scholarships & Paperwork',
                    'Internship Info' => 'Internship Info',
                    'Life in Taiwan' => 'Life in Taiwan',
                ]),
            ])
            ->actions([
                Action::make('togglePin')
                    ->label(fn (CommunityPost $record) => $record->is_pinned ? 'Unpin' : 'Pin')
                    ->icon('heroicon-o-bookmark')
                    ->action(fn (CommunityPost $record) => $record->update(['is_pinned' => !$record->is_pinned]))
                    ->color('warning'),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
