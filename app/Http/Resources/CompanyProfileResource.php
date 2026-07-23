<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                        => $this->id,
            
            // 1. Legal & Identity Info 
            'company_legal_name'        => $this->company_legal_name,
            'company_display_name'      => $this->company_display_name,
            'tax_id'                    => $this->tax_id,
            'slug'                      => $this->slug,
            'industry'                  => $this->industry,
            'company_size'              => $this->company_size,
            'founded_year'              => $this->founded_year,
            'website_url'               => $this->website_url,
            'bio'                       => $this->bio,
            'description'               => $this->description,
            'hq_address'                => $this->hq_address,
            'city'                      => $this->city,
            'country'                   => $this->country,

            // 2. PIC & Contact Info
            'official_email'            => $this->official_email,
            'pic_name'                  => $this->pic_name,
            'pic_phone'                 => $this->pic_phone,
            'pic_position'              => $this->pic_position,

            // 3. Status Verification
            'status'                    => $this->status,
            'rejection_reason'          => $this->rejection_reason,

            // 4. Cloudflare R2 Public URLs
            'logo_url'                  => $this->logo_url,
            'banner_url'                => $this->banner_url,
            'business_registration_url' => $this->business_registration_url,
        ];
    }
}
