<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    protected $fillable = [
        'user_id',
        'company_legal_name',
        'company_display_name',
        
        'tax_id',
        'business_registration_path',
        'slug',
        'logo_path',
        'banner_path',
        'industry',
        'company_size',
        'founded_year',
        'website_url',
        'bio',
        'description',

        'hq_address',
        'city',
        'country',
        'official_email',

        'pic_name', 
        'pic_phone',
        'pic_position', 

        'status', 
        'rejection_reason', 
        'verified_at', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
