<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompanyApplyController extends Controller
{
    /**
     * Display the company registration form.
     */
    public function create()
    {
        return Inertia::render('Company/Apply/Index');
    }

    /**
     * Process a new company registration or a resubmission after rejection.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // 1. Legal & Verification
            'company_legal_name' => 'required|string|max:255',
            'tax_id' => 'nullable|string|max:100',
            'business_registration_path' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',

            // 2. Public Profile (Branding)
            'company_display_name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'industry' => 'required|string',
            'website_url' => 'nullable|url',
            'company_size' => 'required|integer',
            'founded_year' => 'required|integer',
            'logo_path' => 'nullable|image|max:2048',
            'banner_path' => 'nullable|image|max:2048',
            'bio' => 'nullable|string|max:255',
            'description' => 'nullable|string',

            // 3. PIC & Contact Details
            'pic_name' => 'required|string|max:255',
            'pic_phone' => 'required|string|max:50',
            'pic_position' => 'required|string|max:255',
            'official_email' => 'nullable|email|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'required|string|max:255',
            'hq_address' => 'nullable|string',
        ]);

        if ($request->hasFile('business_registration_path')) {
            $validated['business_registration_path'] = $request->file('business_registration_path')
                ->store('companies/legals', 'public');
        }

        if ($request->hasFile('logo_path')) {
            $validated['logo_path'] = $request->file('logo_path')
                ->store('company-logos', 'public');
        }

        if ($request->hasFile('banner_path')) {
            $validated['banner_path'] = $request->file('banner_path')
                ->store('company-banners', 'public');
        }

        $validated['slug'] = Str::slug($request->slug).'-'.time();

        $validated['status'] = 'pending';
        $validated['user_id'] = auth()->id();

        // Save to the database.
        CompanyProfile::create($validated);

        return redirect()->route('company.waiting')->with('success', 'Application submitted successfully!');
    }

    public function waiting()
    {
        if (auth()->user()->companyProfile?->status === 'approved') {
            return redirect()->route('company.dashboard');
        }

        return Inertia::render('Company/Waiting/Index', [
            'profile' => auth()->user()->companyProfile,
        ]);
    }
}
