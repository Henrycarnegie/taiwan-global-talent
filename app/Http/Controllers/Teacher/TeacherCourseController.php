<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeacherCourseController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = Module::withCount('lessons')->where('teacher_id', $user->id);

        if ($request->has('category') && in_array($request->category, ['mandarin', 'others'])) {
            $query->where('category', $request->category);
        }

        $modules = $query->latest()->get();

        $stats = [
            'total_courses' => Module::where('teacher_id', $user->id)->count(),
            'published_courses' => Module::where('teacher_id', $user->id)->where('status', 'published')->count(),
            'mandarin_courses' => Module::where('teacher_id', $user->id)->where('category', 'mandarin')->count(),
            'total_lessons' => Module::where('teacher_id', $user->id)->withCount('lessons')->get()->sum('lessons_count'),
        ];

        return Inertia::render('Teacher/Index', [
            'teacher' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'stats' => $stats,
            'modules' => CourseResource::collection($modules)->resolve(),
            'filters' => $request->only(['category']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Teacher/Course/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:mandarin,others',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('courses/thumbnails', 'r2');
        }

        Module::create([
            'teacher_id' => $request->user()->id,
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . time(),
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'thumbnail_path' => $thumbnailPath,
            'status' => 'draft',
        ]);

        return redirect()->route('teacher.dashboard')->with('success', 'Course created successfully!');
    }

    public function edit(Module $module): Response
    {
        $this->authorizeTeacher($module);

        $module->load('lessons');

        return Inertia::render('Teacher/Course/Edit', [
            'module' => (new CourseResource($module))->resolve(),
        ]);
    }

    private function authorizeTeacher(Module $module)
    {
        if ($module->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this course.');
        }
    }
}