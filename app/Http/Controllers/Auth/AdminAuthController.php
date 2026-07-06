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
                'message' => 'Access denied. You are not an administrator.',
            ], 403);
        }

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            // Regenerate the session for security.
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'user' => Auth::user(),
                'message' => 'Admin signed in successfully.',
            ], 200);
        }

        return response()->json([
            'message' => 'The admin email or password is incorrect.',
        ], 401);
    }
}
