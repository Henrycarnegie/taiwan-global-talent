<?php

namespace App\Filament\Resources\Lessons\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LessonsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('course.title')
                    ->label('Course Name')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('title')
                    ->label('Lesson Title')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('content')
                    ->label('Content Snippet')
                    ->limit(50)
                    ->sortable()
                    ->searchable(),

                TextColumn::make('order')
                    ->label('Order Index')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('course_id')
                    ->relationship('course', 'title')
                    ->label('Filter by Course')
                    ->multiple()
                    ->preload(),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}