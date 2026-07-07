<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseCategory;
use Inertia\Inertia;

class MandarinCourseController extends Controller
{
    public function index($categorySlug)
    {
        // 1. Ambil Kategori saat ini berdasarkan Slug URL
        $category = CourseCategory::where('slug', $categorySlug)->firstOrFail();

        // 2. Ambil semua kategori untuk kebutuhan Tab Navigasi / Dropdown di Global Layout
        $allCategories = CourseCategory::orderBy('order')->get(['id', 'name', 'slug']);

        // 3. Ambil data course sesuai kategori saat ini beserta jumlah pelajaran
        $courses = Course::where('category_id', $category->id)
            ->withCount('lessons')
            ->get()
            ->map(function ($course) {
                // Dummy progress logic (Silakan sesuaikan dengan tabel user_progress Anda nanti)
                $progress = $course->id === 1 ? 100 : ($course->id === 2 ? 40 : 0);
                $status = $course->id === 1 ? 'Completed' : ($course->id === 2 ? 'In Progress' : 'Locked');

                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'level' => $course->level ?? 'General',
                    'modules_count' => $course->lessons_count,
                    'progress' => $progress,
                    'status' => $status,
                ];
            });

        // 4. Statistik Cerdas: Sembunyikan data spesifik jika BUKAN kategori Mandarin (ID: 1)
        $stats = [
            'proficiency' => $category->id === 1 ? 'TOCFL A2' : 'N/A',
            'learning_hours' => 48,
            'vocab_count' => $category->id === 1 ? 450 : 0, 
        ];

        return Inertia::render('Student/MandarinCourse/Index', [
            'currentCategory' => $category,
            'allCategories' => $allCategories,
            'courses' => $courses,
            'stats' => $stats,
        ]);
    }

    public function show($categorySlug, Course $course)
    {
        // Pastikan kategori valid sesuai slug URL
        $category = CourseCategory::where('slug', $categorySlug)->firstOrFail();

        // Mengambil struktur data materi lengkap beserta multimedia barunya
        $courseData = [
            'id' => $course->id,
            'title' => $course->title,
            'lessons' => $course->lessons()
                ->orderBy('order')
                ->with(['sentences', 'vocabularies']) // Eager loading relasi pendukung Mandarin
                ->get()
                ->map(function ($lesson) {
                    return [
                        'id' => $lesson->id,
                        'title' => $lesson->title,
                        'content' => $lesson->content,
                        
                        // PEMBARUAN: Daftarkan semua field konten multimedia yang baru saja ditambahkan di SQL database
                        'content_type' => $lesson->content_type ?? 'text',
                        'video_url' => $lesson->video_url,
                        'video_path' => $lesson->video_path,
                        'lesson_audio_path' => $lesson->lesson_audio_path,
                        'pdf_path' => $lesson->pdf_path,

                        // Field Khusus Mandarin
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

        return Inertia::render('Student/MandarinCourse/Show', [
            'currentCategory' => $category,
            'course' => $courseData,
        ]);
    }
}