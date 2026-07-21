<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_job_id',
        'user_id',
        'candidate_name',
        'candidate_email',
        'candidate_phone',
        'resume_path',
        'status',
    ];

    public function job()
    {
        return $this->belongsTo(CompanyJob::class, 'company_job_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Accessor URL R2 Langsung
    public function getResumeUrlAttribute(): ?string
    {
        return $this->resume_path ? Storage::disk('s3')->url($this->resume_path) : null;
    }
}