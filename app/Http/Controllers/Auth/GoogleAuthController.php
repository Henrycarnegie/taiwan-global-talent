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

        // 1. Find the user by Google ID or email.
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        try {
            $user = DB::transaction(function () use ($user, $googleUser, $roleName) {
                if (! $user) {
                    // Create an account for a new user.
                    $newUser = User::create([
                        'email' => $googleUser->getEmail(),
                        'google_id' => $googleUser->getId(),
                        'name' => $googleUser->getName(),
                        'avatar' => $googleUser->getAvatar(),
                        'email_verified_at' => now(),
                    ]);

                    // Assign a role to the newly created user.
                    $newUser->assignRole($roleName);

                    // Create initial profile data based on the role.
                    if ($roleName === 'student') {
                        $newUser->studentProfile()->create(['country' => 'Taiwan']);
                    } elseif ($roleName === 'teacher') {
                        $newUser->teacherProfile()->create([
                            'full_name' => $googleUser->getName(),
                            'status' => 'pending',
                        ]);
                    } elseif ($roleName === 'company') {
                        // Do not create the profile here if HR should complete the form themselves.
                        // Leave it empty; it will be created when the registration form is submitted.
                    }

                    return $newUser;
                } else {
                    // Update Google data for an existing user when it changes.
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'name' => $googleUser->getName(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);

                    return $user;
                }
            });
        } catch (\Exception $e) {
            // Show error details so the problematic field can be identified.
            dd($e->getMessage(), $e->getTraceAsString());
        }

        Auth::login($user, true);
        request()->session()->regenerate();

        // 2. Redirect after a successful login.
        if ($user->hasRole('student')) {
            return redirect()->route('student.dashboard');
        }

        if ($user->hasRole('company')) {
            $companyProfile = $user->companyProfile;

            // New HR user without a profile: send them to the registration form.
            if (! $companyProfile) {
                return redirect()->route('company.register');
            }

            // If the form is complete, check its status.
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
