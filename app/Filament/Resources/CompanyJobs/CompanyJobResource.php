<?php

namespace App\Filament\Resources\CompanyJobs;

use App\Filament\Resources\CompanyJobs\Pages\CreateCompanyJob;
use App\Filament\Resources\CompanyJobs\Pages\EditCompanyJob;
use App\Filament\Resources\CompanyJobs\Pages\ListCompanyJobs;
use App\Filament\Resources\CompanyJobs\Schemas\CompanyJobForm;
use App\Filament\Resources\CompanyJobs\Tables\CompanyJobsTable;
use App\Models\CompanyJob;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class CompanyJobResource extends Resource
{
    protected static ?string $model = CompanyJob::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-briefcase';

    protected static UnitEnum|string|null $navigationGroup = 'Company & Community';

    protected static ?string $navigationLabel = 'Company Jobs';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return CompanyJobForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CompanyJobsTable::configure($table);
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
            'index' => ListCompanyJobs::route('/'),
            'create' => CreateCompanyJob::route('/create'),
            'edit' => EditCompanyJob::route('/{record}/edit'),
        ];
    }
}
