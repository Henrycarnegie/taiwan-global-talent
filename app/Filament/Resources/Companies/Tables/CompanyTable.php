<?php

namespace App\Filament\Resources\Companies\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;

class CompanyTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('companyProfile.company_legal_name')
                    ->label('Legal Name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('companyProfile.company_display_name')
                    ->label('Display Name')
                    ->searchable(),
                TextColumn::make('companyProfile.industry')
                    ->searchable(),
                TextColumn::make('companyProfile.tax_id')
                    ->label('Tax ID / NIB')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('companyProfile.pic_name')
                    ->label('PIC')
                    ->searchable(),
                
                TextColumn::make('companyProfile.status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        'suspended' => 'gray',
                        default => 'primary',
                    })
                    ->sortable(),
                    
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('companyProfile.status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                        'suspended' => 'Suspended',
                    ]),
                SelectFilter::make('companyProfile.industry')
                    ->label('Industry'),
            ])
            ->actions([
                EditAction::make(),
                ViewAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}