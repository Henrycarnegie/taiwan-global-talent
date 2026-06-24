<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'country' => 'nullable|string',
            'university' => 'nullable|string',
            'mandarin_level' => 'nullable|string',
            'toefl_score' => 'nullable|integer',
            'tocfl_score' => 'nullable|integer',
            'skills' => 'nullable|string',
            'certificates' => 'nullable|string',
            'learning_goal' => 'nullable|string',
            'bio' => 'nullable|string',
            'is_public' => 'boolean',
        ]);

        $profile = auth()->user()->profile;

        $profile->update($request->all());

        return back();
    }

    public function edit()
    {
        $user = auth()->user()->load('profile');

        return Inertia::render('Profile/ProfilePage', [
            'profile' => $user->profile,
            'user' => $user,
        ]);
    }
}
