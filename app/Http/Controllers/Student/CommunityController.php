<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index()
    {
        return Inertia::render('Student/Community/Index');
    }

    public function create()
    {
        return Inertia::render('Student/Community/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:general,recommendation',
        ]);

        $community = Community::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content,
            'type' => $request->type,
        ]);

        return redirect()->route('community.show', $community->id)
            ->with('success', 'Post created successfully!');
    }

    public function show($id)
    {
        $community = Community::with(['user', 'comments.user'])->findOrFail($id);
        return Inertia::render('Student/Community/Show', [
            'community' => $community,
        ]);
    }
}
