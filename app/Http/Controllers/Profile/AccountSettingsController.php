<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountSettingsController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

        // Validasi input data esensial akun
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        // Eksekusi update ke tabel users
        $user->update($validated);

        // Berikan feedback kembali ke halaman Inertia
        return back()->with('success', 'Account settings updated successfully.');
    }
}
