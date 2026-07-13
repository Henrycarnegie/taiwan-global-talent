<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\CourseCategory;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            
            // 💡 BLOK FLASH: Evaluasi malas (Lazy) agar session hanya dibaca saat ada isinya
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'trigger_download' => fn () => $request->session()->get('trigger_download'),
                'download_url' => fn () => $request->session()->get('download_url'),
            ],

            'auth' => [
                // 💡 BLOK USER: Seluruh array user dibungkus fungsi fn() 
                // Ini memastikan semua query di dalamnya TIDAK jalan jika user belum login
                'user' => fn () => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'avatar' => $request->user()->avatar,
                    'roles' => $request->user()->getRoleNames(),
                    'role' => $request->user()->roles->first()?->name,
                    
                    // Kategori kursus juga dibungkus fungsi agar query tidak dieksekusi sia-sia
                    'course_categories' => fn () => CourseCategory::orderBy('order')->get(['id', 'name', 'slug']),
                    
                    // Panggil fungsi pembantu untuk menangani relasi dengan aman
                    'profile' => $this->getProfileData($request->user())
                ] : null,
            ],
        ];
    }

    /**
     * Helper method untuk mengambil data profil berdasarkan role user secara efisien.
     */
    private function getProfileData($user)
    {
        // Cegah eksekusi jika user kosong
        if (!$user) return null;

        $role = $user->roles?->first()?->name;

        // Gunakan loadMissing agar tidak terjadi N+1 problem,
        // dan hanya meload relasi jika belum ter-load sebelumnya.
        if ($role === 'teacher') {
            $user->loadMissing('teacherProfile');
            $profile = $user->teacherProfile;
            
            return $profile ? [
                'id' => $profile->id,
                'bio' => $profile->bio,
                'expertise' => $profile->expertise,
                'certification_path' => $profile->certification_path,
            ] : null;
        }

        if ($role === 'student') {
            $user->loadMissing('studentProfile');
            $profile = $user->studentProfile;
            
            return $profile ? [
                'id' => $profile->id,
                'country' => $profile->country,
                'university' => $profile->university,
                'major' => $profile->major,
            ] : null;
        }

        if ($role === 'company') {
            $user->loadMissing('companyProfile');
            $profile = $user->companyProfile;
            
            return $profile ? [
                'id' => $profile->id,
                'company_name' => $profile->company_name,
                'industry' => $profile->industry,
                'website' => $profile->website,
                'address' => $profile->address,
            ] : null;
        }

        if ($role === 'admin') {
            return [
                'id' => $user->id,
            ];
        }

        return null;
    }
}