<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! $user->hasRole('admin')) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan Admin.',
            ], 403);
        }

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            // Regenerate session untuk keamanan
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'user' => Auth::user(),
                'message' => 'Login Admin berhasil menggunakan Session!',
            ], 200);
        }

        return response()->json([
            'message' => 'Email atau password Admin salah.',
        ], 401);
    }
}
