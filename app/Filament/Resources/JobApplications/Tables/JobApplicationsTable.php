<?php

namespace App\Filament\Resources\JobApplications\Tables;

use App\Models\JobApplication;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class JobApplicationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('candidate_name')
                    ->label('Candidate Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('companyJob.title')
                    ->label('Job Title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('companyJob.companyProfile.company_display_name')
                    ->label('Company')
                    ->searchable(),

                TextColumn::make('candidate_email')
                    ->searchable(),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'hired' => 'success',
                        'interviewed' => 'info',
                        'reviewed' => 'warning',
                        'rejected' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Date Applied'),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'reviewed' => 'Reviewed',
                        'interviewed' => 'Interviewed',
                        'hired' => 'Hired',
                        'rejected' => 'Rejected',
                    ]),
            ])
            ->recordActions([
                Action::make('downloadResume')
                    ->label('View Resume')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('primary')
                    ->url(fn (JobApplication $record) => Storage::disk('s3')->url($record->resume_path))
                    ->openUrlInNewTab(),

                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
