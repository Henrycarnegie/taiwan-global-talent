<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\CourseCategory;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],

            'auth' => [
                'user' => fn () => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'avatar' => $request->user()->avatar,
                    
                    // 💡 Gunakan 'role_name' agar aman tidak ditimpa nilai NULL dari kolom 'role_id/role' di DB
                    'role_name' => $request->user()->roles->first()?->name ?? 'student',
                    'roles' => $request->user()->getRoleNames(),
                    
                    'course_categories' => fn () => CourseCategory::orderBy('order')->get(['id', 'name', 'slug']),
                    
                    // Memuat data profile datar (flat) lewat helper method di bawah
                    'profile' => $this->getProfileData($request->user())
                ] : null,
            ],
        ];
    }

    private function getProfileData($user)
    {
        if (!$user) return null;

        // Ambil nama role dari Spatie
        $role = $user->roles->first()?->name ?? 'student';

        // Panggil relasi One-to-One terpisah sesuai file User.php milikmu
        if ($role === 'student') {
            $user->loadMissing('studentProfile');
            $profile = $user->studentProfile;
            return $profile ? [
                'id' => $profile->id,
                'country' => $profile->country ?? null,
                'university' => $profile->university ?? null,
                'major' => $profile->major ?? null,
                'mandarin_level' => $profile->mandarin_level ?? null,
                'toefl_score' => $profile->toefl_score ?? null,
                'tocfl_score' => $profile->tocfl_score ?? null,
                'skills' => $profile->skills ?? null,
                'learning_goal' => $profile->learning_goal ?? null,
                'bio' => $profile->bio ?? null,
            ] : null;
        }

        if ($role === 'teacher') {
            $user->loadMissing('teacherProfile');
            $profile = $user->teacherProfile;
            return $profile ? [
                'id' => $profile->id,
                'full_name' => $profile->full_name ?? null,
                'phone' => $profile->phone ?? null,
                'bio' => $profile->bio ?? null,
                'expertise' => $profile->expertise ?? null,
                'learning_goal' => $profile->learning_goal ?? null,
            ] : null;
        }

        if ($role === 'company') {
            $user->loadMissing('companyProfile');
            $profile = $user->companyProfile;
            return $profile ? [
                'id' => $profile->id,
                'company_legal_name' => $profile->company_legal_name ?? null,
                'company_display_name' => $profile->company_display_name ?? null,
                'tax_id' => $profile->tax_id ?? null,
                'website_url' => $profile->website_url ?? null,
                'bio' => $profile->bio ?? null,
                'pic_name' => $profile->pic_name ?? null,
                'pic_position' => $profile->pic_position ?? null,
                'pic_phone' => $profile->pic_phone ?? null,
                'country' => $profile->country ?? null,
            ] : null;
        }

        return null;
    }
}