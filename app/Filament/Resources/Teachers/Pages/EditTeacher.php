<?php

namespace App\Filament\Resources\Teachers\Pages;

use App\Filament\Resources\Teachers\TeacherResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTeacher extends EditRecord
{
    protected static string $resource = TeacherResource::class;

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Teacher updated';
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $profile = $this->record->teacherProfile;

        if ($profile) {
            $data['full_name'] = $profile->full_name;
            $data['phone'] = $profile->phone;
            $data['expertise'] = $profile->expertise;
            $data['learning_goal'] = $profile->learning_goal;
            $data['bio'] = $profile->bio;
            $data['status'] = $profile->status;
        }

        return $data;
    }

    protected function handleRecordUpdate(\Illuminate\Database\Eloquent\Model $record, array $data): \Illuminate\Database\Eloquent\Model
    {
        $record->update([
            'name' => $data['full_name'] ?? $record->name,
            'email' => $data['email'] ?? $record->email,
        ]);

        $record->teacherProfile()->updateOrCreate(
            ['user_id' => $record->id],
            [
                'full_name' => $data['full_name'] ?? null,
                'phone' => $data['phone'] ?? null,
                'expertise' => $data['expertise'] ?? null,
                'learning_goal' => $data['learning_goal'] ?? null,
                'bio' => $data['bio'] ?? null,
                'status' => $data['status'] ?? 'pending',
            ]
        );

        return $record;
    }
}