<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\CompanyJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyJobController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('companyProfile');
        $company = $user->companyProfile;

        if ($company) {
            $disk = Storage::disk('s3');
            $company->logo_url = $company->logo_path ? $disk->url($company->logo_path) : null;
            $company->banner_url = $company->banner_path ? $disk->url($company->banner_path) : null;
        }

        // Ambil lowongan milik perusahaan pengguna login
        $jobs = CompanyJob::where('company_profile_id', $company?->id)
            ->withCount('applications as applicants_count')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Company/Job/Index', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }

    public function store(Request $request)
    {
        $company = auth()->user()->companyProfile;

        if (!$company || $company->status !== 'approved') {
            return back()->withErrors(['message' => 'Your company must be verified to post jobs.']);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:Full-time,Part-time,Contract,Internship',
            'location_type' => 'required|in:On-site,Remote,Hybrid',
            'city' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:published,draft,closed',
        ]);

        $validated['company_profile_id'] = $company->id;

        CompanyJob::create($validated);

        return redirect()->route('company.jobs.index')->with('success', 'Job posting created successfully!');
    }
}