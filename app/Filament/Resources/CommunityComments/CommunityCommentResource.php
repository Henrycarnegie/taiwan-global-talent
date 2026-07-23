<?php

namespace App\Filament\Resources\CommunityComments;

use App\Filament\Resources\CommunityComments\Pages\CreateCommunityComment;
use App\Filament\Resources\CommunityComments\Pages\EditCommunityComment;
use App\Filament\Resources\CommunityComments\Pages\ListCommunityComments;
use App\Filament\Resources\CommunityComments\Schemas\CommunityCommentForm;
use App\Filament\Resources\CommunityComments\Tables\CommunityCommentsTable;
use App\Models\CommunityComment;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CommunityCommentResource extends Resource
{
    protected static ?string $model = CommunityComment::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';

    protected static UnitEnum|string|null $navigationGroup = 'Community and Feed';

    protected static ?string $navigationLabel = 'Comments';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return CommunityCommentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CommunityCommentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCommunityComments::route('/'),
            'create' => CreateCommunityComment::route('/create'),
            'edit' => EditCommunityComment::route('/{record}/edit'),
        ];
    }
}
