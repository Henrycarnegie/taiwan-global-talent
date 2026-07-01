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
            return redirect('/login')->with('error', 'Gagal masuk menggunakan Google.');
        }

        $roleName = session()->pull('register_role', 'student');

        // 1. Cari user berdasarkan google_id atau email
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        try {
            // Gunakan $createdUser secara lokal di dalam transaksi untuk menjamin object tidak null
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

                    // Buat profil kosong/default berdasarkan role
                    match ($roleName) {
                        'student' => $newUser->studentProfile()->create(['country' => 'Taiwan']),
                        'teacher' => $newUser->teacherProfile()->create([
                            'full_name' => $googleUser->getName(),
                            'status' => 'pending',
                        ]),
                        'company' => $newUser->companyProfile()->create(['status' => 'pending']),
                        default => null
                    };

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
            // Log error untuk mempermudah debugging jika ada error lain (seperti nama table salah)
            \Log::error('Google Auth Error: '.$e->getMessage());

            return redirect('/login')->with('error', 'Gagal memproses pembuatan akun: '.$e->getMessage());
        }

        // Login-kan user ke sistem
        Auth::login($user, true);
        request()->session()->regenerate();

        // 2. LOGIKA REDIRECT BERDASARKAN BEHAVIOR ROLE

        if ($user->hasRole('student')) {
            return redirect()->route('student.dashboard');
        }

        if ($user->hasRole('company')) {
            $companyProfile = $user->companyProfile;
            if (! $companyProfile || empty($companyProfile->company_name)) {
                return redirect()->route('company.apply');
            }
            if ($companyProfile->status !== 'approved') { // Sesuai skema status
                return redirect()->route('company.waiting');
            }

            return redirect()->route('company.dashboard');
        }

        if ($user->hasRole('teacher')) {
            $teacherProfile = $user->teacherProfile;

            // Perbaikan 2: Cek kolom yang benar-benar ada di database Anda (misal cv_path atau phone)
            // Jika cv_path masih kosong, artinya dia BELUM melengkapi form pendaftaran guru
            if (! $teacherProfile || empty($teacherProfile->cv_path)) {
                return redirect()->route('teacher.apply');
            }

            // Perbaikan 3: Cek status menggunakan kolom 'status' (pending / rejected)
            if ($teacherProfile->status === 'pending' || $teacherProfile->status === 'rejected') {
                return redirect()->route('teacher.waiting');
            }

            // Jika status sudah 'approved' baru masuk ke dashboard
            return redirect()->route('teacher.dashboard');
        }

        return redirect('/home');
    }
}
