<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyProfileResource;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('companyProfile');
        $company = $user->companyProfile;

        if ($company) {
            $disk = Storage::disk('s3');

            $company->logo_url = $company->logo_path ? $disk->url($company->logo_path) : null;
            $company->banner_url = $company->banner_path ? $disk->url($company->banner_path) : null;
            $company->business_registration_url = $company->business_registration_path ? $disk->url($company->business_registration_path) : null;
        }

        return Inertia::render('Company/Index', [
            'company' => $company ? (new CompanyProfileResource($company))->resolve() : null,
        ]);
    }
}
