<?php

namespace App\Filament\Resources\Vocabularies\Pages;

use App\Filament\Resources\Vocabularies\VocabularyResource;
use Filament\Resources\Pages\CreateRecord;

class CreateVocabulary extends CreateRecord
{
    protected static string $resource = VocabularyResource::class;

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Vocabulary registered';
    }
}
