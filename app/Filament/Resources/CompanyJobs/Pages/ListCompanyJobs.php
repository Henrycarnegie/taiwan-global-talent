<?php

namespace App\Filament\Resources\CompanyJobs\Pages;

use App\Filament\Resources\CompanyJobs\CompanyJobResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCompanyJobs extends ListRecords
{
    protected static string $resource = CompanyJobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
