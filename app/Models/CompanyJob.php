<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_profile_id',
        'title',
        'type',
        'location_type',
        'city',
        'salary_range',
        'description',
        'status',
        'views_count',
    ];

    public function companyProfile()
    {
        return $this->belongsTo(CompanyProfile::class);
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}