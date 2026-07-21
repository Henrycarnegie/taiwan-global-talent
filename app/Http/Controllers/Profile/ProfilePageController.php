<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfilePageController extends Controller
{
    public function show()
    {
        return Inertia::render('Profile/ProfilePage');
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $role = $user->roles->first()?->name ?? 'student';

        // Aturan validasi global dasar
        $rules = [
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:2000',
        ];

        // Tambahan validasi sesuai relasi profile target
        if ($role === 'student') {
            $rules['country'] = 'nullable|string|max:100';
            $rules['university'] = 'nullable|string|max:255';
            $rules['major'] = 'nullable|string|max:255';
            $rules['mandarin_level'] = 'nullable|string|max:255';
            $rules['toefl_score'] = 'nullable|string|max:50';
            $rules['tocfl_score'] = 'nullable|string|max:50';
            $rules['skills'] = 'nullable|string|max:255';
            $rules['learning_goal'] = 'nullable|string|max:255';
        } elseif ($role === 'teacher') {
            $rules['full_name'] = 'nullable|string|max:255';
            $rules['phone'] = 'nullable|string|max:50';
            $rules['expertise'] = 'nullable|string|max:255';
            $rules['learning_goal'] = 'nullable|string|max:255';
        } elseif ($role === 'company') {
            $rules['country'] = 'nullable|string|max:100';
            $rules['company_legal_name'] = 'nullable|string|max:255';
            $rules['company_display_name'] = 'nullable|string|max:255';
            $rules['tax_id'] = 'nullable|string|max:100';
            $rules['website_url'] = 'nullable|url|max:255';
            $rules['pic_name'] = 'nullable|string|max:255';
            $rules['pic_position'] = 'nullable|string|max:255';
            $rules['pic_phone'] = 'nullable|string|max:50';
        }

        $validated = $request->validate($rules);

        // 1. Update tabel core users
        $user->update(['name' => $validated['name']]);

        // 2. Simpan ke tabel One-to-One terpisah secara eksplisit
        if ($role === 'student') {
            $user->studentProfile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'country' => $validated['country'] ?? null,
                    'university' => $validated['university'] ?? null,
                    'major' => $validated['major'] ?? null,
                    'mandarin_level' => $validated['mandarin_level'] ?? null,
                    'toefl_score' => $validated['toefl_score'] ?? null,
                    'tocfl_score' => $validated['tocfl_score'] ?? null,
                    'skills' => $validated['skills'] ?? null,
                    'learning_goal' => $validated['learning_goal'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                ]
            );
        } elseif ($role === 'teacher') {
            $user->teacherProfile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'full_name' => $validated['full_name'] ?? null,
                    'phone' => $validated['phone'] ?? null,
                    'expertise' => $validated['expertise'] ?? null,
                    'learning_goal' => $validated['learning_goal'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                ]
            );
        } elseif ($role === 'company') {
            $user->companyProfile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'company_legal_name' => $validated['company_legal_name'] ?? null,
                    'company_display_name' => $validated['company_display_name'] ?? null,
                    'tax_id' => $validated['tax_id'] ?? null,
                    'website_url' => $validated['website_url'] ?? null,
                    'pic_name' => $validated['pic_name'] ?? null,
                    'pic_position' => $validated['pic_position'] ?? null,
                    'pic_phone' => $validated['pic_phone'] ?? null,
                    'country' => $validated['country'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                ]
            );
        }

        return redirect()->back()->with('success', 'Profile updated successfully!');
    }
}