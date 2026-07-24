<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function enroll(Request $request, Module $module)
    {
        if (!$module->exists) {
            return redirect()->back()->with('error', 'Modul tidak ditemukan.');
        }

        $user = Auth::user();

        // 1. Cek apakah siswa sudah terdaftar sebelumnya via Eloquent
        $isEnrolled = Enrollment::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->exists();

        if ($isEnrolled) {
            return redirect()->back()->with('message', 'Anda sudah terdaftar di modul ini.');
        }

        // 2. Buat pendaftaran baru menggunakan Model Enrollment
        Enrollment::create([
            'user_id' => $user->id,
            'module_id' => $module->id,
            'completed_lessons_count' => 0,
            'is_completed' => false,
        ]);

        // 3. Kembalikan ke halaman sebelumnya dengan pesan sukses
        return redirect()->back()->with('success', 'Berhasil mendaftar! Selamat belajar.');
    }
}