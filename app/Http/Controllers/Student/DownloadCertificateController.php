<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Module;
use App\Models\CourseCategory;
use App\Models\Enrollment;
use App\Services\PDFGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DownloadCertificateController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $categorySlug = request('category', 'all');
        $allCategories = CourseCategory::all();

        $currentCategory = null;
        if ($categorySlug !== 'all') {
            $currentCategory = CourseCategory::where('slug', $categorySlug)->first();
        }

        $enrollmentsQuery = Enrollment::where('user_id', $user->id)
            ->with([
                'module' => function ($query) {
                    $query->with('category')->withCount([
                        'lessons' => function ($lessonQuery) {
                            $lessonQuery->where('is_published', true);
                        },
                    ]);
                },
            ]);

        if ($currentCategory) {
            $enrollmentsQuery->whereHas('module', function ($query) use ($currentCategory) {
                $query->where('category_id', $currentCategory->id);
            });
        }

        $enrollments = $enrollmentsQuery->get();

        $modulesWithStatus = $enrollments->map(function ($enrollment) {
            $module = $enrollment->module;

            if ($module) {

                $module->status = $enrollment->is_completed ? 'Completed' : 'Incomplete';

                $module->progress = $module->lessons_count > 0
                    ? round(($enrollment->completed_lessons_count / $module->lessons_count) * 100, 0)
                    : 0;

                if ($module->progress > 100) {
                    $module->progress = 100;
                }

                $module->certificate_path = $enrollment->certificate_path;
            }

            return $module;
        })->filter();

        return Inertia::render('Student/Course/Certificate/Index', [
            'modules' => $modulesWithStatus->values(),
            'stats' => $user->studentProfile,
            'currentCategory' => $currentCategory,
            'allCategories' => $allCategories,
        ]);
    }

    public function downloadCertificate(Request $request, Module $module)
    {
        $user = Auth::user();

        // 1. Pastikan user memang sudah menyelesaikan kelas ini (cek tabel enrollments)
        $enrollment = DB::table('enrollments')
            ->where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->first();

        if (! $enrollment || ! $enrollment->is_completed) {
            abort(403, 'You have not completed this course yet. Please complete all the lessons to download the certificate.');
        }

        // 2. Cek apakah record sertifikat sudah ada di database (Model Certificate)
        $certificate = Certificate::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->first();

        // 3. JIKA BELUM ADA, GENERATE LANGSUNG SAAT INI JUGA (SINKRON)
        if (! $certificate) {
            // Buat kode unik acak untuk sertifikat
            $temporaryCode = 'CERT-'.strtoupper(Str::random(12));

            try {
                $pdfService = new PDFGeneratorService;
                $uploadedPath = $pdfService->generate($user, $module, $temporaryCode);

                $certificate = Certificate::create([
                    'user_id' => $user->id,
                    'module_id' => $module->id,
                    'certificate_code' => $temporaryCode,
                    'pdf_path' => $uploadedPath,
                    'issued_at' => now(),
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to process the certificate in real-time.',
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ], 500);
            }
        }

        // 4. IF ALREADY EXISTS / JUST FINISHED CREATING, PROCEED DIRECTLY TO DOWNLOAD
        try {
            if (empty($certificate->pdf_path) || ! Storage::disk('s3')->exists($certificate->pdf_path)) {
                return response()->json(['error' => 'The physical PDF file was not found.'], 404);
            }

            // Return download langsung ke device browser user
            return Storage::disk('s3')->download($certificate->pdf_path, "Sertifikat-{$module->title}.pdf");

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to download the file',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
