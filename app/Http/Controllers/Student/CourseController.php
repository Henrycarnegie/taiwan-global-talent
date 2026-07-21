<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseCategory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CourseController extends Controller
{
    // Akses: /student/courses
    public function index()
    {
        $categories = CourseCategory::orderBy('order')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'icon' => $category->icon,
                'instructor' => $category->instructor,
                'duration' => $category->duration,
                'price' => $category->price,
                // Ini kuncinya: ubah path menjadi URL lengkap
                'thumbnail_url' => $category->thumbnail_path
                    ? Storage::disk('s3')->url($category->thumbnail_path)
                    : null,
            ];
        });

        return Inertia::render('Student/Course/Index', [
            'categories' => $categories,
        ]);
    }

    // Akses: /student/courses/{categorySlug}
    public function showByCategory($categorySlug)
    {
        $userId = Auth::id();

        $category = CourseCategory::where('slug', $categorySlug)->firstOrFail();

        $courses = Course::where('category_id', $category->id)
            ->withCount('lessons')
            ->with(['users' => fn ($query) => $query->where('user_id', $userId)])
            ->get()
            ->map(function ($course) {
                $enrollment = $course->users->first()?->pivot;
                $total = $course->lessons_count;
                $completed = $enrollment?->completed_lessons_count ?? 0;

                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'level' => $course->level ?? 'General',
                    'progress' => $total > 0 ? (int) (($completed / $total) * 100) : 0,
                    'status' => $enrollment ? ($enrollment->is_completed ? 'Completed' : 'In Progress') : 'Locked',
                ];
            });

        return Inertia::render('Student/Course/CourseDetail/Index', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'instructor' => $category->instructor,
                'duration' => $category->duration,
                'price' => $category->price,
                'updated_at' => $category->updated_at->format('d M Y'),
                'thumbnail_url' => $category->thumbnail_path ? Storage::disk('s3')->url($category->thumbnail_path) : null,
            ],
            'courses' => $courses,
        ]);
    }

    // Akses: /student/courses/{categorySlug}/{course}
    public function show($categorySlug, Course $course)
    {
        $category = CourseCategory::where('slug', $categorySlug)->firstOrFail();

        $enrollment = $course->users()->where('user_id', Auth::id())->first();
        if (! $enrollment) {
            return redirect()->route('student.courses.index', $categorySlug)
                ->with('error', 'You must register for this course first.');
        }

        $course->load([
            'lessons' => function ($query) {
                $query->reorder()
                    ->orderBy('order', 'asc');
            },
            'lessons.audios',
            'lessons.sentences',
            'lessons.vocabularies',
        ]);

        $course->lessons->each(function ($lesson) {
            if ($lesson->content_type === 'audio' && $lesson->audios) {
                $lesson->audios->each(function ($audio) {
                    if ($audio->lesson_audio_path) {
                        $audio->lesson_audio_url = Storage::disk('s3')->url($audio->lesson_audio_path);
                    }
                });
            }
        });

        $courseData = [
            'id' => $course->id,
            'title' => $course->title,
            'lessons' => $course->lessons->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'content' => $lesson->content,
                    'content_type' => $lesson->content_type ?? 'text',
                    'video_url' => $lesson->video_url,
                    'video_path' => $lesson->video_path,
                    'pdf_path' => $lesson->pdf_path,
                    'sentence_hanzi' => $lesson->sentence_hanzi,

                    'audios' => $lesson->audios->map(fn ($a) => [
                        'id' => $a->id,
                        'lesson_audio_description' => $a->lesson_audio_description,
                        'lesson_audio_path' => $a->lesson_audio_path,
                        'lesson_audio_url' => $a->lesson_audio_url,
                    ]),

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
                'is_completed' => $enrollment->pivot->is_completed,
            ],
        ]);
    }
}
