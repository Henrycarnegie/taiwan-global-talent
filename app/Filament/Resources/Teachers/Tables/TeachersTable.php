<?php

namespace App\Filament\Resources\Teachers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class TeachersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('teacherProfile.full_name')
                    ->label('Full Name')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('email')
                    ->label('Account Email')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('teacherProfile.phone')
                    ->label('No. WhatsApp')
                    ->searchable(),

                TextColumn::make('teacherProfile.expertise')
                    ->label('Expertise')
                    ->searchable(),

                TextColumn::make('teacherProfile.learning_goal')
                    ->label('Teaching Objective')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('teacherProfile.bio')
                    ->label('Bio / Experience')
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->teacherProfile?->bio),
                TextColumn::make('teacherProfile.status')
                    ->label('Status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'approved',
                        'danger' => 'rejected',
                    ]),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status Kelulusan')
                    ->relationship('teacherProfile', 'status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['value'],
                            fn (Builder $q, $value) => $q->whereHas('teacherProfile', fn ($qp) => $qp->where('status', $value))
                        );
                    }),
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
