<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Jobs\GenerateCertificateJob;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class LessonProgressController extends Controller
{
    public function completeLesson(Request $request, Course $course, Lesson $lesson)
    {
        $user = Auth::user();

        $enrollment = DB::table('enrollments')
            ->where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            return redirect()->back()->withErrors(['message' => 'Anda belum terdaftar di kelas ini']);
        }

        $totalLessons = $course->lessons()->count();
        $newCount = min($enrollment->completed_lessons_count + 1, $totalLessons);
        $isCompletedNow = ($newCount >= $totalLessons);

        DB::transaction(function () use ($enrollment, $newCount, $isCompletedNow) {
            $updateData = [
                'completed_lessons_count' => $newCount,
                'updated_at' => now(),
            ];

            if (!$enrollment->is_completed && $isCompletedNow) {
                $updateData['is_completed'] = true;
                $updateData['completed_at'] = now();
            }

            DB::table('enrollments')->where('id', $enrollment->id)->update($updateData);
        });

        // 💡 PERUBAHAN PRODUCTION: Dispatch Background Job
        if (!$enrollment->is_completed && $isCompletedNow) {
            
            GenerateCertificateJob::dispatch($user, $course);

            // Karena proses butuh waktu, frontend tidak akan langsung mendownload
            return redirect()->back()->with([
                'success' => 'Selamat! Anda telah lulus. Sertifikat Anda sedang dibuat, silakan cek dashboard/profil dalam beberapa menit.',
            ]);
        }

        return redirect()->back()->with('success', 'Progress updated.');
    }
}