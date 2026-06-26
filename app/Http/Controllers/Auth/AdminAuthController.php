<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validasi input
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Tambahkan kondisi harus ber-role admin (role_id = 1)
        $credentials['role_id'] = 1;

        // 3. Lakukan Attempt Login (Otomatis mencocokkan password & membuat session)
        if (Auth::attempt($credentials, $request->filled('remember'))) {
            // Regenerate session untuk mencegah serangan Session Fixation
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'user' => Auth::user(),
                'message' => 'Login Admin berhasil menggunakan Session!'
            ], 200);
        }

        // 4. Jika gagal
        return response()->json([
            'message' => 'Email atau password Admin salah.'
        ], 401);
    }
}