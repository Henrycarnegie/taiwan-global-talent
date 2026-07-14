<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi secara massal (Mass Assignable).
     */
    protected $fillable = [
        'user_id',
        'course_id',
        'completed_lessons_count',
        'is_completed',
        'completed_at',
        'certificate_path', // Pastikan kolom ini siap untuk skema R2/S3 sertifikatmu!
    ];

    /**
     * Casting tipe data agar lebih konsisten di PHP/JavaScript.
     */
    protected $casts = [
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
        'completed_lessons_count' => 'integer',
    ];

    /**
     * Relasi balik ke User (Siswa).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Course (Kelas yang diikuti).
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}