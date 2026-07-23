<?php

namespace App\Filament\Resources\CommunityPostLikes;

use App\Filament\Resources\CommunityPostLikes\Pages\CreateCommunityPostLike;
use App\Filament\Resources\CommunityPostLikes\Pages\EditCommunityPostLike;
use App\Filament\Resources\CommunityPostLikes\Pages\ListCommunityPostLikes;
use App\Filament\Resources\CommunityPostLikes\Schemas\CommunityPostLikeForm;
use App\Filament\Resources\CommunityPostLikes\Tables\CommunityPostLikesTable;
use App\Models\CommunityPostLike;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CommunityPostLikeResource extends Resource
{
    protected static ?string $model = CommunityPostLike::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-hand-thumb-up';

    protected static UnitEnum|string|null $navigationGroup = 'Community and Feed';

    protected static ?string $navigationLabel = 'Likes';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return CommunityPostLikeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CommunityPostLikesTable::configure($table);
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
            'index' => ListCommunityPostLikes::route('/'),
            'create' => CreateCommunityPostLike::route('/create'),
            'edit' => EditCommunityPostLike::route('/{record}/edit'),
        ];
    }
}
