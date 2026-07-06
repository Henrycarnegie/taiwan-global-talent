<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Inertia\Inertia;

class MandarinCourseController extends Controller
{
    public function index()
    {
        // 1. Ambil data course dan hitung jumlah lesson di dalamnya
        $courses = Course::withCount('lessons')->get()->map(function ($course) {
            // Logika dummy progress & status (Silakan sesuaikan dengan tabel progress Anda nanti)
            // Di sini kita set default agar bisa tampil dulu di React Anda
            $progress = $course->id === 1 ? 100 : ($course->id === 2 ? 40 : 0);
            $status = $course->id === 1 ? 'Completed' : ($course->id === 2 ? 'In Progress' : 'Locked');

            return [
                'id' => $course->id,
                'title' => $course->title,
                'chineseTitle' => $course->chinese_title ?? '華語課程',
                'level' => $course->level ?? 'TOCFL A1',
                'modules_count' => $course->lessons_count,
                'progress' => $progress,
                'status' => $status,
            ];
        });

        // 2. Data statistik pelengkap di bagian atas dashboard student
        $stats = [
            'proficiency' => 'TOCFL A2',
            'learning_hours' => 48,
            'vocab_count' => 450,
        ];

        return Inertia::render('Student/MandarinCourse/Index', [
            'courses' => $courses,
            'stats' => $stats,
        ]);
    }

    public function show(Course $course)
    {
        // Tarik data Course beserta Lessons, Sentences di dalam lesson tersebut,
        // dan Vocabularies yang terhubung ke lesson tersebut.
        $courseData = [
            'id' => $course->id,
            'title' => $course->title,
            'chineseTitle' => $course->chinese_title ?? '華語課程',
            'lessons' => $course->lessons()->orderBy('order')->with(['sentences' => function ($q) {
                $q->orderBy('id'); // ganti dengan sort_order jika ada
            }, 'vocabularies'])->get()->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'content' => $lesson->content,
                    'sentences' => $lesson->sentences->map(function ($sentence) {
                        return [
                            'id' => $sentence->id,
                            'hanzi' => $sentence->hanzi,
                            'pinyin' => $sentence->pinyin,
                            'meaning' => $sentence->meaning,
                            'audio_path' => $sentence->audio_path,
                        ];
                    }),
                    'vocabularies' => $lesson->vocabularies->map(function ($vocab) {
                        return [
                            'id' => $vocab->id,
                            'hanzi' => $vocab->hanzi,
                            'pinyin' => $vocab->pinyin,
                            'meaning' => $vocab->meaning,
                            'audio_path' => $vocab->audio_path,
                        ];
                    }),
                ];
            }),
        ];

        return Inertia::render('Student/MandarinCourse/Show', [
            'course' => $courseData,
        ]);
    }
}
