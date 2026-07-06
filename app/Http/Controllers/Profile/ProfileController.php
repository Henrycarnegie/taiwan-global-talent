<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'country' => ['nullable', 'string', 'max:255'],
            'university' => ['nullable', 'string', 'max:255'],
            'major' => ['nullable', 'string', 'max:255'],
            'mandarin_level' => ['nullable', 'string', 'max:255'],
            'toefl_score' => ['nullable', 'integer', 'min:0'],
            'tocfl_score' => ['nullable', 'integer', 'min:0'],
            'skills' => ['nullable', 'string'],
            'certificates' => ['nullable', 'string'],
            'learning_goal' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],
            'is_public' => ['boolean'],
        ]);

        $request->user()->studentProfile()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated,
        );

        return back();
    }

    public function edit(Request $request): Response
    {
        $user = $request->user()->load('studentProfile');

        return Inertia::render('Profile/ProfilePage', [
            'profile' => $user->studentProfile,
            'user' => $user,
        ]);
    }
}
