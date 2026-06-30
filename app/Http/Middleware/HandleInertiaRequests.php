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

        if ($user) {
            $relation = match ((int) $user->role_id) {
                1 => null,
                2 => 'teacherProfile',
                3 => 'studentProfile',
                4 => 'companyProfile',
                default => null,
            };

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
                    'role' => (string) $user->role_id,

                    'profile' => $activeProfile ? match ($user->role_id) {
                        // Admin
                        1 => [
                            'id' => $activeProfile->id,
                        ],
                        // Teacher
                        2 => [
                            'id' => $activeProfile->id,
                            'bio' => $activeProfile->bio,
                            'expertise' => $activeProfile->expertise,
                            'certification_path' => $activeProfile->certification_path,
                        ],
                        // Student
                        3 => [
                            'id' => $activeProfile->id,
                            'country' => $activeProfile->country,
                            'university' => $activeProfile->university,
                            'major' => $activeProfile->major,
                        ],
                        // Company
                        4 => [
                            'id' => $activeProfile->id,
                            'company_name' => $activeProfile->company_name,
                            'industry' => $activeProfile->industry,
                            'website' => $activeProfile->website,
                            'address' => $activeProfile->address,
                        ],
                        default => null,
                    } : null,
                ] : null,
            ],
        ];
    }
}
