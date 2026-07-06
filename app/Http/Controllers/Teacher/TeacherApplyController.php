<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherApplyController extends Controller
{
    public function create()
    {
        return Inertia::render('Teacher/Apply/Index');
    }

    public function store(Request $request)
    {
        // 1. Validasi input form React
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'bio' => 'required|string',
            'cv' => 'required|file|mimes:pdf|max:2048',
            'certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // 2. Handle upload file CV
        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('teachers/cvs', 'public');
        }

        // 3. Handle the certificate upload.
        $certificatePath = null;
        if ($request->hasFile('certificate')) {
            $certificatePath = $request->file('certificate')->store('teachers/certificates', 'public');
        }

        // 4. Update the teacher_profiles table.
        auth()->user()->teacherProfile()->updateOrCreate(
            ['user_id' => auth()->id()], // Find the currently authenticated user by ID.
            [
                'full_name' => $request->full_name,
                'phone' => $request->phone,
                'bio' => $request->bio,
                'expertise' => $request->expertise,
                'learning_goal' => $request->learning_goal,
                'cv_path' => $cvPath,
                'certificate_path' => $certificatePath,
                'status' => 'pending',
            ]
        );

        // 5. Redirect to waiting page
        return redirect()->route('teacher.waiting')->with('success', 'Application submitted');
    }

    public function waiting()
    {
        return Inertia::render('Teacher/Waiting/Index');
    }
}
