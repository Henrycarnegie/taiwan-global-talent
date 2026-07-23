<?php

namespace App\Filament\Resources\CommunityComments\Pages;

use App\Filament\Resources\CommunityComments\CommunityCommentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCommunityComment extends CreateRecord
{
    protected static string $resource = CommunityCommentResource::class;
}
