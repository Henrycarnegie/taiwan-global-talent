<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::updateOrCreate(
            ['google_id' => $googleUser->getId()],
            [
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'avatar' => $googleUser->getAvatar(),
                'email_verified_at' => now(),
                'role_id' => 3,
            ]
        );

        $user->profile()->firstOrCreate([]);

        Auth::login($user, true);

        // Regenerate session untuk memastikan Laravel mencatat login dengan aman
        request()->session()->regenerate();

        return redirect(match ((int) $user->role_id) {
            1 => '/admin/dashboard',
            2 => '/teacher/dashboard',
            default => '/student/dashboard',
        });
    }
}
