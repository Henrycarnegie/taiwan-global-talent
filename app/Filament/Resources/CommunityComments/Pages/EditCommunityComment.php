<?php

namespace App\Filament\Resources\CommunityComments\Pages;

use App\Filament\Resources\CommunityComments\CommunityCommentResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCommunityComment extends EditRecord
{
    protected static string $resource = CommunityCommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
