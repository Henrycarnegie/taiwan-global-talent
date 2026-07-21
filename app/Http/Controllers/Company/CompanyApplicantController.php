<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyApplicantController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user()->load('companyProfile');
        $company = $user->companyProfile;

        if ($company) {
            $disk = Storage::disk('s3');
            $company->logo_url = $company->logo_path ? $disk->url($company->logo_path) : null;
            $company->banner_url = $company->banner_path ? $disk->url($company->banner_path) : null;
        }

        // Filter pendaftar berdasarkan lowongan perusahaan pengguna
        $query = JobApplication::whereHas('job', function ($q) use ($company) {
            $q->where('company_profile_id', $company?->id);
        })->with(['job', 'user']);

        if ($request->has('job_id') && $request->job_id) {
            $query->where('company_job_id', $request->job_id);
        }

        $applicants = $query->orderBy('created_at', 'desc')->get()->map(function ($app) {
            return [
                'id' => $app->id,
                'job_id' => $app->company_job_id,
                'job_title' => $app->job?->title ?? 'N/A',
                'candidate_name' => $app->candidate_name,
                'candidate_email' => $app->candidate_email,
                'candidate_phone' => $app->candidate_phone,
                'candidate_avatar' => $app->user?->avatar ?? null,
                'resume_url' => $app->resume_url, // URL langsung dari Cloudflare R2
                'status' => $app->status,
                'applied_at' => $app->created_at->toIso8601String(),
            ];
        });

        return Inertia::render('Company/Applicant/Index', [
            'company' => $company,
            'applicants' => $applicants,
        ]);
    }

    public function updateStatus(Request $request, JobApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,reviewed,interviewed,hired,rejected',
        ]);

        $application->update($validated);

        return back()->with('success', 'Applicant status updated successfully!');
    }
}