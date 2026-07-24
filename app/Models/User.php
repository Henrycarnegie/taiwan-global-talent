<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, HasRoles, Notifiable;

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasRole('admin');
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
    public function module()
    {
        return $this->belongsToMany(Module::class, 'enrollments')
            ->withPivot('completed_lessons_count', 'is_completed', 'completed_at')
            ->withTimestamps();
    }

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
        return $this->hasOne(CompanyProfile::class, 'user_id');
    }

    public function adminProfile(): HasOne
    {
        return $this->hasOne(AdminProfile::class);
    }

    // Helper untuk mendapatkan profil sesuai role tanpa N+1
    public function getProfile()
    {
        $roleSlug = $this->roles->first()?->name ?? 'student';

        return match ($roleSlug) {
            'teacher' => $this->teacherProfile,
            'student' => $this->studentProfile,
            'company' => $this->companyProfile,
            'admin' => $this->adminProfile,
            default => null,
        };
    }

    public function getDisplayNameAttribute(): string
    {
        if ($this->relationLoaded('companyProfile') && $this->companyProfile) {
            return $this->companyProfile->company_display_name;
        }

        return $this->name;
    }

    // 2. Subtitle Otomatis (Industri Perusahaan / Universitas)
    public function getDisplaySubtitleAttribute(): string
    {
        if ($this->relationLoaded('companyProfile') && $this->companyProfile) {
            return $this->companyProfile->industry ?? 'Official Company Account';
        }

        return $this->university ?? 'Taiwan Alumni';
    }

    // 3. Avatar URL Otomatis (Logo Cloudflare R2 / Avatar User)
    public function getDisplayAvatarAttribute(): ?string
    {
        if ($this->relationLoaded('companyProfile') && $this->companyProfile?->logo_path) {
            return Storage::disk('s3')->url($this->companyProfile->logo_path);
        }

        return $this->avatar_url;
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
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
