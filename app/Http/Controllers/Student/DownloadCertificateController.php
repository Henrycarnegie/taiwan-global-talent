<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\CourseCategory;
use App\Models\Certificate;
use App\Services\PDFGeneratorService;


class DownloadCertificateController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $categorySlug = request('category', 'all');

        $allCategories = CourseCategory::all();

        // 1. Ambil semua data pendaftaran (enrollments) milik user ini, baik yang selesai maupun belum
        // Kita jadikan 'course_id' sebagai KEY array agar pencarian di dalam loop (.map) sangat instan
        $userEnrollments = DB::table('enrollments')
            ->where('user_id', $user->id)
            ->get()
            ->keyBy('course_id');

        $currentCategory = CourseCategory::find($categorySlug);

        // 2. Query mengambil kelas-kelas yang aktif beserta jumlah total lesson yang diterbitkan
        $courses = Course::withCount([
            'lessons' => function ($query) use ($currentCategory) {
                $query->where('is_published', true);
                if ($currentCategory && $currentCategory->id === 1) {
                    $query->where('category_id', 1); // Mempertahankan logika filter kamu
                }
            }
        ])
        ->when($currentCategory, function ($query) use ($currentCategory) {
            if ($currentCategory->id === 1) {
                $query->where('category_id', 1);
            }
        })
        ->with(['category'])
        ->get();

        // 3. Petakan status dan hitung progres belajar yang SEBENARNYA (sinkron dengan LessonProgressController)
        $coursesWithStatus = $courses->map(function($course) use ($userEnrollments) {
            // Ambil data pendaftaran user untuk kelas spesifik ini
            $enrollment = $userEnrollments->get($course->id);

            if ($enrollment) {
                // Status kelulusan dibaca langsung dari flag database
                $course->status = $enrollment->is_completed ? 'Completed' : 'Incomplete';
                
                // RUMUS PROGRES BARU: (lessons yang selesai / total lessons di kelas) * 100
                $course->progress = $course->lessons_count > 0 
                    ? round(($enrollment->completed_lessons_count / $course->lessons_count) * 100, 0) 
                    : 0;
                
                // Pengaman tambahan: pastikan tidak ada persentase melebihi 100%
                if ($course->progress > 100) {
                    $course->progress = 100;
                }
            } else {
                // Jika user ternyata belum mendaftar/enroll di kelas ini
                $course->status = 'Incomplete';
                $course->progress = 0;
            }

            return $course;
        });

        return Inertia::render('Student/Course/Certificate/Index', [
            'courses' => $coursesWithStatus,
            'stats' => $user->studentProfile,
            'currentCategory' => $currentCategory,
            'allCategories' => $allCategories,
        ]);
    }

    public function downloadCertificate(Request $request, Course $course)
{
    $user = Auth::user();

    // 1. Pastikan user memang sudah menyelesaikan kelas ini (cek tabel enrollments)
    $enrollment = DB::table('enrollments')
        ->where('user_id', $user->id)
        ->where('course_id', $course->id)
        ->first();

    if (!$enrollment || !$enrollment->is_completed) {
        abort(403, 'You have not completed this course yet. Please complete all the lessons to download the certificate.');
    }

    // 2. Cek apakah record sertifikat sudah ada di database (Model Certificate)
    $certificate = Certificate::where('user_id', $user->id)
        ->where('course_id', $course->id)
        ->first();

    // 3. JIKA BELUM ADA, GENERATE LANGSUNG SAAT INI JUGA (SINKRON)
    if (!$certificate) {
        // Buat kode unik acak untuk sertifikat
        $temporaryCode = 'CERT-' . strtoupper(\Illuminate\Support\Str::random(12));

        try {
            $pdfService = new PDFGeneratorService();
            $uploadedPath = $pdfService->generate($user, $course, $temporaryCode);

            $certificate = Certificate::create([
                'user_id'          => $user->id,
                'course_id'        => $course->id,
                'certificate_code' => $temporaryCode,
                'pdf_path'         => $uploadedPath, 
                'issued_at'        => now()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to process the certificate in real-time.',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    // 4. IF ALREADY EXISTS / JUST FINISHED CREATING, PROCEED DIRECTLY TO DOWNLOAD
    try {
        if (empty($certificate->pdf_path) || !Storage::disk('s3')->exists($certificate->pdf_path)) {
            return response()->json(['error' => 'The physical PDF file was not found.'], 404);
        }

        // Return download langsung ke device browser user
        return Storage::disk('s3')->download($certificate->pdf_path, "Sertifikat-{$course->title}.pdf");

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to download the file',
            'message' => $e->getMessage()
        ], 500);
    }
}
}