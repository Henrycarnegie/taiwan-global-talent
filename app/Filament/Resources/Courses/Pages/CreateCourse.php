<?php

namespace App\Filament\Resources\Courses\Pages;

use App\Filament\Resources\Courses\CourseResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCourse extends CreateRecord
{
protected static string $resource = CourseResource::class;

    // TAMBAHKAN FUNGSI INI:
    protected function getRedirectUrl(): string
    {
        // Setelah berhasil buat data baru, lempar ke halaman EDIT dengan membawa parameter kategori aslinya
        return $this->getResource()::getUrl('edit', [
            'record' => $this->record,
            'category' => $this->record->category_id
        ]);
    }}
