<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // Tambahkan import DB
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/LoginPage');
    }

    public function redirect(Request $request)
    {
        $allowedRoles = ['student', 'teacher', 'company', 'admin'];
        $selectedRole = $request->query('role', 'student');

        if (! in_array($selectedRole, $allowedRoles)) {
            $selectedRole = 'student';
        }

        session(['register_role' => $selectedRole]);

        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Gagal masuk menggunakan Google.');
        }

        $roleName = session()->pull('register_role', 'student');
        $role = Role::where('slug', $roleName)->first();
        $defaultRoleId = $role ? $role->id : 3;

        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        try {
            DB::transaction(function () use (&$user, $googleUser, $roleName, $defaultRoleId) {
                if (! $user) {
                    $user = User::create([
                        'google_id' => $googleUser->getId(),
                        'name' => $googleUser->getName(),
                        'email' => $googleUser->getEmail(),
                        'avatar' => $googleUser->getAvatar(),
                        'email_verified_at' => now(),
                        'role_id' => $defaultRoleId,
                    ]);

                    match ($roleName) {
                        'student' => $user->studentProfile()->create(['country' => 'Taiwan']),
                        'teacher' => $user->teacherProfile()->create([]),
                        'company' => $user->companyProfile()->create([
                            'company_name' => $googleUser->getName().' Corp',
                        ]),
                        default => null
                    };
                } else {
                    $user->update([
                        'google_id' => $user->google_id ?? $googleUser->getId(), 
                        'name' => $googleUser->getName(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                }
            });
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Gagal memproses pembuatan akun.');
        }

        Auth::login($user, true);
        request()->session()->regenerate();

        return redirect($user->getDashboardUrl());
    }
}
