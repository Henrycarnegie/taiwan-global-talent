<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class JobApplication extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = ['resume_url'];

    public function getResumeUrlAttribute()
    {
        if ($this->resume_path) {
            return Storage::disk('s3')->url($this->resume_path);
        }
        return null;
    }

    public function job()
    {
        return $this->belongsTo(CompanyJob::class, 'company_job_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}