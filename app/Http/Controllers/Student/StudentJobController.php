<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\CompanyJob;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentJobController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanyJob::with('companyProfile')
            ->where('status', 'published');

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->type && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->location_type && $request->location_type !== 'all') {
            $query->where('location_type', $request->location_type);
        }

        $jobs = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Student/Jobs/Index', [
            'jobs' => $jobs,
            'filters' => $request->only(['search', 'type', 'location_type']),
        ]);
    }

    public function show(CompanyJob $job)
    {
        if ($job->status !== 'published') {
            abort(404);
        }

        $job->increment('views_count');
        $job->load('companyProfile');

        $user = auth()->user();
        $userApplication = null;

        if ($user) {
            $userApplication = JobApplication::where('company_job_id', $job->id)
                ->where('user_id', $user->id)
                ->first();
        }

        return Inertia::render('Student/Jobs/Show', [
            'job' => $job,
            'hasApplied' => !is_null($userApplication),
            'application' => $userApplication,
        ]);
    }

    public function apply(Request $request, CompanyJob $job)
    {
        if ($job->status !== 'published') {
            return back()->withErrors(['message' => 'This job is no longer accepting applications.']);
        }

        $user = auth()->user();

        // Cek apakah sudah pernah melamar
        $existing = JobApplication::where('company_job_id', $job->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            return back()->withErrors(['message' => 'You have already applied for this job.']);
        }

        $validated = $request->validate([
            'candidate_name' => 'required|string|max:255',
            'candidate_email' => 'required|email|max:255',
            'candidate_phone' => 'nullable|string|max:50',
            'resume' => 'required|file|mimes:pdf|max:5120', // Maksimal 5MB PDF
            'cover_letter' => 'nullable|string|max:2000',
        ]);

        // Upload Resume ke Cloudflare R2 / S3
        $resumePath = $request->file('resume')->store('resumes', 's3');

        JobApplication::create([
            'company_job_id' => $job->id,
            'user_id' => $user->id,
            'candidate_name' => $validated['candidate_name'],
            'candidate_email' => $validated['candidate_email'],
            'candidate_phone' => $validated['candidate_phone'] ?? null,
            'resume_path' => $resumePath,
            'cover_letter' => $validated['cover_letter'] ?? null,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Your application has been submitted successfully!');
    }
}