<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

     public function canAccessPanel(Panel $panel): bool
    {
        // Session user yang login harus memiliki role_id = 1 (Admin)
        return $this->role_id === 1;
    }

    protected $fillable = [
        'name', 'email', 'password', 'google_id', 'avatar', 'role_id',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relasi Utama
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    // Pendekatan One-to-One Terpisah
    public function studentProfile(): HasOne
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function teacherProfile(): HasOne
    {
        return $this->hasOne(TeacherProfile::class);
    }

    public function companyProfile(): HasOne
    {
        return $this->hasOne(CompanyProfile::class);
    }

    // Helpers untuk role checking
    public function isAdmin(): bool
    {
        return $this->role?->slug === 'admin';
    }

    public function isTeacher(): bool
    {
        return $this->role?->slug === 'teacher';
    }

    public function isCompany(): bool
    {
        return $this->role?->slug === 'company';
    }

    public function isStudent(): bool
    {
        return $this->role?->slug === 'student';
    }
    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
    public function getDashboardUrl(): string
    {
        return match ($this->role?->slug) {
            'admin' => '/admin/dashboard',
            'teacher' => '/teacher/dashboard',
            'company' => '/company/dashboard',
            default => '/student/dashboard',
        };
    }
}
