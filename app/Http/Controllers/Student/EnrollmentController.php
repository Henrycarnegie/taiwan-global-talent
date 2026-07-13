<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EnrollmentController extends Controller
{
    public function enroll(Request $request, Course $course)
    {
        $user = Auth::user();

        // 1. Cek apakah siswa sudah terdaftar sebelumnya
        $isEnrolled = DB::table('enrollments')
            ->where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->exists();

        if ($isEnrolled) {
            return redirect()->back()->with('message', 'Anda sudah terdaftar di kursus ini.');
        }

        // 2. Masukkan data pendaftaran baru ke tabel enrollments
        DB::table('enrollments')->insert([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'completed_lessons_count' => 0,
            'is_completed' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Kembalikan ke halaman sebelumnya dengan pesan sukses
        return redirect()->back()->with('success', 'Berhasil mendaftar! Selamat belajar.');
    }
}