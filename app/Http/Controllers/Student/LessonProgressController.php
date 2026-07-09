<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use App\Services\PDFGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LessonProgressController extends Controller
{
    public function completeLesson(Request $request, Course $course, Lesson $lesson, PDFGeneratorService $pdfService)
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

        // JIKA KELAS SELESAI, LANGSUNG GENERATE & DOWNLOAD PDF
        if (!$enrollment->is_completed && $isCompletedNow) {
            $certCode = 'CERT-' . strtoupper(uniqid()); // Sesuaikan logikamu
            
            // Panggil service secara sinkron (sekali jalan)
            $pdfData = $pdfService->generate($user, $course, $certCode);

            // Return file PDF langsung ke browser
            return response()->streamDownload(function () use ($pdfData) {
                echo $pdfData['content'];
            }, $pdfData['filename'], [
                'Content-Type' => 'application/pdf',
            ]);
        }

        return redirect()->back()->with('success', 'Progress updated.');
    }
}