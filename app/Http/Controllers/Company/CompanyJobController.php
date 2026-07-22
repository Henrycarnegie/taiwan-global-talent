<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\CompanyJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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

        // Ambil lowongan milik perusahaan penggunanya
        $jobs = CompanyJob::where('company_profile_id', $company?->id)
            ->withCount('applications as applicants_count')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Company/Job/Index', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }

    public function create()
    {
        $user = auth()->user()->load('companyProfile');
        $company = $user->companyProfile;

        if (!$company || $company->status !== 'approved') {
            return redirect()->route('company.jobs.index')
                ->withErrors(['message' => 'Your company profile must be verified to create job postings.']);
        }

        return Inertia::render('Company/Job/Create', [
            'company' => $company,
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
            'city' => 'nullable|required_if:location_type,On-site,Hybrid|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'requirements' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|in:published,draft,closed',
        ]);

        // Auto-generate Slug yang unik
        $baseSlug = Str::slug($validated['title']);
        $slug = $baseSlug . '-' . Str::random(5);

        CompanyJob::create([
            'company_profile_id' => $company->id,
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => $validated['type'],
            'location_type' => $validated['location_type'],
            'city' => $validated['city'] ?? null,
            'salary_range' => $validated['salary_range'] ?? null,
            'requirements' => $validated['requirements'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
        ]);

        return redirect()->route('company.jobs.index')->with('success', 'Job posting created successfully!');
    }

    public function edit(CompanyJob $job)
    {
        $this->authorizeCompany($job);

        $company = auth()->user()->companyProfile;

        return Inertia::render('Company/Job/Edit', [
            'company' => $company,
            'job' => $job,
        ]);
    }

    public function update(Request $request, CompanyJob $job)
    {
        $this->authorizeCompany($job);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:Full-time,Part-time,Contract,Internship',
            'location_type' => 'required|in:On-site,Remote,Hybrid',
            'city' => 'nullable|required_if:location_type,On-site,Hybrid|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'requirements' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|in:published,draft,closed',
        ]);

        $job->update($validated);

        return redirect()->route('company.jobs.index')->with('success', 'Job posting updated successfully!');
    }

    private function authorizeCompany(CompanyJob $job)
    {
        $company = auth()->user()->companyProfile;
        if (!$company || $job->company_profile_id !== $company->id) {
            abort(403, 'Unauthorized action.');
        }
    }
}