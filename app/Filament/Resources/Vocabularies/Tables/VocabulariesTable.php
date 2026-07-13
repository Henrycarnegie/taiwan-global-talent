<?php

namespace App\Filament\Resources\Vocabularies\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VocabulariesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('hanzi')
                    ->label('Hanzi')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('pinyin')
                    ->label('Pinyin')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('meaning')
                    ->label('Meaning')
                    ->searchable(),

                TextColumn::make('audio_path')
                    ->label('Audio')
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('is_active')
                    ->label('Status')
                    ->badge()
                    ->colors([
                        'warning' => 'inactive',
                        'success' => 'active',
                    ]),
            ])
            ->filters([
                // 
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
