<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index($categorySlug)
    {
        $category = CourseCategory::where('slug', $categorySlug)->firstOrFail();

        $allCategories = CourseCategory::orderBy('order')->get(['id', 'name', 'slug']);

        $userId = Auth::id();

        $courses = Course::where('category_id', $category->id)
            ->withCount('lessons')
            ->with(['users' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])
            ->get()
            ->map(function ($course) {
                $enrollment = $course->users->first()?->pivot;

                $totalLessons = $course->lessons_count;
                $completedCount = $enrollment?->completed_lessons_count ?? 0;

                $progress = $totalLessons > 0 ? (int) (($completedCount / $totalLessons) * 100) : 0;

                if ($enrollment) {
                    $status = $enrollment->is_completed ? 'Completed' : 'In Progress';
                } else {
                    $status = 'Locked'; 
                }

                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'level' => $course->level ?? 'General',
                    'modules_count' => $totalLessons,
                    'progress' => $progress, 
                    'status' => $status,    
                ];
            });

        // 4. Statistik Cerdas
        $stats = [
            'proficiency' => $category->id === 1 ? 'TOCFL A2' : 'N/A',
            'learning_hours' => 48,
            'vocab_count' => $category->id === 1 ? 450 : 0, 
        ];

        return Inertia::render('Student/Course/Index', [
            'currentCategory' => $category,
            'allCategories' => $allCategories,
            'courses' => $courses,
            'stats' => $stats,
        ]);
    }

    public function show($categorySlug, Course $course)
    {
        $category = CourseCategory::where('slug', $categorySlug)->firstOrFail();

        $enrollment = $course->users()->where('user_id', Auth::id())->first();
        if (!$enrollment) {
            return redirect()->route('student.courses.index', $categorySlug)
                ->with('error', 'Anda harus mendaftar di kursus ini terlebih dahulu.');
        }

        $courseData = [
            'id' => $course->id,
            'title' => $course->title,
            'lessons' => $course->lessons()
                ->orderBy('order')
                ->with(['sentences', 'vocabularies'])
                ->get()
                ->map(function ($lesson) {
                    return [
                        'id' => $lesson->id,
                        'title' => $lesson->title,
                        'content' => $lesson->content,
                        'content_type' => $lesson->content_type ?? 'text',
                        'video_url' => $lesson->video_url,
                        'video_path' => $lesson->video_path,
                        'lesson_audio_path' => $lesson->lesson_audio_path,
                        'pdf_path' => $lesson->pdf_path,
                        'sentence_hanzi' => $lesson->sentence_hanzi, 
                        'sentences' => $lesson->sentences->map(fn ($s) => [
                            'id' => $s->id, 
                            'hanzi' => $s->hanzi, 
                            'pinyin' => $s->pinyin, 
                            'meaning' => $s->meaning, 
                            'audio_path' => $s->audio_path,
                        ]),
                        'vocabularies' => $lesson->vocabularies->map(fn ($v) => [
                            'id' => $v->id, 
                            'hanzi' => $v->hanzi, 
                            'pinyin' => $v->pinyin, 
                            'meaning' => $v->meaning, 
                            'audio_path' => $v->audio_path,
                        ]),
                    ];
                }),
        ];

        return Inertia::render('Student/Course/Show', [
            'currentCategory' => $category,
            'course' => $courseData,
            'enrollment' => [
                'completed_lessons_count' => $enrollment->pivot->completed_lessons_count,
                'is_completed' => $enrollment->pivot->is_completed
            ]
        ]);
    }
}