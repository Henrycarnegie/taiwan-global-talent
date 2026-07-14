<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $allowedRoles = ['student', 'teacher', 'company'];
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
            return redirect('/login')->with('error', 'Failed to sign in with Google.');
        }

        $roleName = session()->pull('register_role', 'student');

        // 1. Cari user berdasarkan google_id atau email
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        try {
            $user = DB::transaction(function () use ($user, $googleUser, $roleName) {
                if (! $user) {
                    // Jika User baru, buat akunnya
                    $newUser = User::create([
                        'email' => $googleUser->getEmail(),
                        'google_id' => $googleUser->getId(),
                        'name' => $googleUser->getName(),
                        'avatar' => $googleUser->getAvatar(),
                        'email_verified_at' => now(),
                    ]);

                    // Assign role ke user yang baru dibuat
                    $newUser->assignRole($roleName);

                    // Create the initial profile data based on role.
                    if ($roleName === 'student') {
                        $newUser->studentProfile()->create(['country' => 'Taiwan']);
                    } elseif ($roleName === 'teacher') {
                        $newUser->teacherProfile()->create([
                            'full_name' => $googleUser->getName(),
                            'status' => 'pending',
                        ]);
                    } elseif ($roleName === 'company') {
                        // Do not create the company profile here because HR should fill out the form.
                        // Leave it empty; it will be created when the registration form is submitted.
                    }

                    return $newUser;
                } else {
                    // Jika User lama, update data google-nya jika ada perubahan
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'name' => $googleUser->getName(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);

                    return $user;
                }
            });
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getTraceAsString());
        }

        Auth::login($user, true);
        request()->session()->regenerate();

        // 2. LOGIKA REDIRECT SETELAH BERHASIL LOGIN
        if ($user->hasRole('student')) {
            return redirect()->route('student.dashboard');
        }

        if ($user->hasRole('company')) {
            $companyProfile = $user->companyProfile;

            // New HR users without a profile go to the registration form.
            if (! $companyProfile) {
                return redirect()->route('company.register');
            }

            // Jika sudah isi form, cek statusnya
            if ($companyProfile->status === 'pending' || $companyProfile->status === 'rejected') {
                return redirect()->route('company.waiting');
            }

            return redirect()->route('company.dashboard');
        }

        if ($user->hasRole('teacher')) {
            $teacherProfile = $user->teacherProfile;

            if (! $teacherProfile || empty($teacherProfile->cv_path)) {
                return redirect()->route('teacher.apply');
            }

            if ($teacherProfile->status === 'pending' || $teacherProfile->status === 'rejected') {
                return redirect()->route('teacher.waiting');
            }

            return redirect()->route('teacher.dashboard');
        }

        return redirect('/');
    }
}
