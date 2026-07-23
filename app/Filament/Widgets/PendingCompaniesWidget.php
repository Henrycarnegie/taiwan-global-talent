<?php

namespace App\Filament\Widgets;

use App\Models\CompanyProfile;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\Action;

class PendingCompaniesWidget extends TableWidget
{
    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Company Waiting For Verification';

    public function table(Table $table): Table
    {
        return $table
            ->query(CompanyProfile::query()->where('status', 'pending'))
            ->columns([
                TextColumn::make('company_display_name')
                    ->label('Nama Perusahaan')
                    ->searchable()
                    ->weight('bold'),

                TextColumn::make('pic_name')
                    ->label('PIC / Penanggung Jawab'),

                TextColumn::make('pic_phone')
                    ->label('No. Telp / WA'),

                TextColumn::make('tax_id')
                    ->label('NPWP / Tax ID'),

                TextColumn::make('created_at')
                    ->label('Tanggal Daftar')
                    ->dateTime('d M Y, H:i')
                    ->sortable(), ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->recordActions([
                Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-m-check')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(fn (CompanyProfile $record) => $record->update(['status' => 'approved'])),

                Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-m-x-mark')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->action(fn (CompanyProfile $record) => $record->update(['status' => 'rejected'])),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    //
                ]),
            ])
            ->emptyStateHeading('No Pending Companies')
            ->emptyStateDescription('All company registrations have been processed.')
            ->emptyStateIcon('heroicon-o-check-badge');
    }
}
