<?php

namespace App\Filament\Resources\CommunityComments\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use App\Models\CommunityComment;

class CommunityCommentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Penulis')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('post.content')
                    ->label('Content')
                    ->limit(35)
                    ->searchable(),

                TextColumn::make('content')
                    ->label('Content')
                    ->limit(50)
                    ->searchable(),

                TextColumn::make('parent_id')
                    ->label('Type')
                    ->state(fn (CommunityComment $record): string => $record->parent_id ? 'Reply' : 'Main Comment')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Reply' => 'info',
                        'Main Comment' => 'success',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Author Filter'),
            ])
            ->recordActions([
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
