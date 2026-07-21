<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompanyApplyController extends Controller
{
    /**
     * Display the company registration form.
     */
    public function create()
    {
        $existingProfile = auth()->user()->companyProfile;
        
        if ($existingProfile && $existingProfile->status === 'approved') {
            return redirect()->route('company.dashboard');
        }

        return Inertia::render('Company/Apply/Index', [
            'existingProfile' => $existingProfile,
        ]);
    }

    /**
     * Process a new company registration or resubmission after rejection.
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'company_legal_name' => 'required|string|max:255',
            'tax_id'             => 'nullable|string|max:100',
            'business_registration_path' => [
                $user->companyProfile?->business_registration_path ? 'nullable' : 'required',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:10240' 
            ],

            'company_display_name' => 'required|string|max:255',
            'slug'                 => 'required|string|max:255',
            'industry'             => 'required|string|max:255',
            'website_url'          => 'nullable|url|max:255',
            'company_size'         => 'required|integer|min:1',
            'founded_year'         => 'required|integer|min:1800|max:' . date('Y'),
            'logo_path'            => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'banner_path'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'bio'                  => 'nullable|string|max:255',
            'description'          => 'nullable|string',

            'pic_name'       => 'required|string|max:255',
            'pic_phone'      => 'required|string|max:50',
            'pic_position'   => 'required|string|max:255',
            'official_email' => 'nullable|email|max:255',
            'city'           => 'nullable|string|max:255',
            'country'        => 'required|string|max:255',
            'hq_address'     => 'nullable|string',
        ]);

        $profile = $user->companyProfile;

        $disk = 's3';

        if ($request->hasFile('business_registration_path')) {
            if ($profile?->business_registration_path && Storage::disk($disk)->exists($profile->business_registration_path)) {
                Storage::disk($disk)->delete($profile->business_registration_path);
            }
            $validated['business_registration_path'] = $request->file('business_registration_path')
                ->store('companies/legals', $disk);
        } else {
            unset($validated['business_registration_path']);
        }

        if ($request->hasFile('logo_path')) {
            if ($profile?->logo_path && Storage::disk($disk)->exists($profile->logo_path)) {
                Storage::disk($disk)->delete($profile->logo_path);
            }
            $validated['logo_path'] = $request->file('logo_path')
                ->store('company-logos', $disk);
        } else {
            unset($validated['logo_path']);
        }

        if ($request->hasFile('banner_path')) {
            if ($profile?->banner_path && Storage::disk($disk)->exists($profile->banner_path)) {
                Storage::disk($disk)->delete($profile->banner_path);
            }
            $validated['banner_path'] = $request->file('banner_path')
                ->store('company-banners', $disk);
        } else {
            unset($validated['banner_path']);
        }

        $validated['slug'] = Str::slug($request->slug ?: $request->company_display_name) . '-' . time();
        $validated['status'] = 'pending';

        CompanyProfile::updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return redirect()->route('company.waiting')->with('success', 'Application submitted successfully!');
    }

    public function waiting()
    {
        $profile = auth()->user()->companyProfile;

        if ($profile?->status === 'approved') {
            return redirect()->route('company.dashboard');
        }

        if ($profile) {
            $disk = Storage::disk('s3');
            
            $profileData = $profile->toArray();
            $profileData['business_registration_url'] = $profile->business_registration_path ? $disk->url($profile->business_registration_path) : null;
            $profileData['logo_url'] = $profile->logo_path ? $disk->url($profile->logo_path) : null;
            $profileData['banner_url'] = $profile->banner_path ? $disk->url($profile->banner_path) : null;
        } else {
            $profileData = null;
        }

        return Inertia::render('Company/Waiting/Index', [
            'profile' => $profileData,
        ]);
    }
}