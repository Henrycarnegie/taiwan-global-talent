<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

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
        $user = Auth::user();
        $relation = null;

        if ($user) {
            if ($user->hasRole('teacher')) {
                $relation = 'teacherProfile';
            } elseif ($user->hasRole('student')) {
                $relation = 'studentProfile';
            } elseif ($user->hasRole('company')) {
                $relation = 'companyProfile';
            }

            if ($relation) {
                $user->load($relation);
            }
        }

        $activeProfile = $user && $relation ? $user->{$relation} : null;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'roles' => $user->getRoleNames(),
                    'role' => $user->roles->first()?->name,
                    'profile' => $activeProfile ? match ($user->roles?->first()?->name) {
                        // Admin
                        'admin' => [
                            'id' => $activeProfile->id,
                        ],
                        // Teacher
                        'teacher' => [
                            'id' => $activeProfile->id,
                            'bio' => $activeProfile->bio,
                            'expertise' => $activeProfile->expertise,
                            'certificate_path' => $activeProfile->certificate_path,
                        ],
                        // Student
                        'student' => [
                            'id' => $activeProfile->id,
                            'country' => $activeProfile->country,
                            'university' => $activeProfile->university,
                            'major' => $activeProfile->major,
                        ],
                        // Company
                        'company' => [
                            'id' => $activeProfile->id,
                            'company_name' => $activeProfile->company_display_name,
                            'industry' => $activeProfile->industry,
                            'website' => $activeProfile->website_url,
                            'address' => $activeProfile->hq_address,
                        ],
                        default => null,
                    } : null,
                ] : null,
            ],
        ];
    }
}
