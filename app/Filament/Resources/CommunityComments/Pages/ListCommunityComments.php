<?php

namespace App\Filament\Resources\CommunityComments\Pages;

use App\Filament\Resources\CommunityComments\CommunityCommentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCommunityComments extends ListRecords
{
    protected static string $resource = CommunityCommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
