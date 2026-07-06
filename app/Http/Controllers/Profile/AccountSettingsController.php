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

        // Validate essential account data.
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        // Update the users table.
        $user->update($validated);

        // Return feedback to the Inertia page.
        return back()->with('success', 'Account settings updated successfully.');
    }
}
