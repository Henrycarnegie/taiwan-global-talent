<?php

namespace App\Jobs;

use App\Models\Course;
use App\Models\User;
use App\Services\PDFGeneratorService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GenerateCertificateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $course;

    // Timeout job agak diperlama karena proses Google API bisa butuh waktu
    public $timeout = 120; 

    public function __construct(User $user, Course $course)
    {
        $this->user = $user;
        $this->course = $course;
    }

    public function handle(PDFGeneratorService $pdfService): void
    {
        try {
            $certCode = 'CERT-' . strtoupper(uniqid()); 
            
            // Generate PDF via Service
            $filePath = $pdfService->generate($this->user, $this->course, $certCode);

            // Simpan path file tersebut ke tabel enrollments
            DB::table('enrollments')
                ->where('user_id', $this->user->id)
                ->where('course_id', $this->course->id)
                ->update(['certificate_path' => $filePath]);

        } catch (\Exception $e) {
            Log::error("Gagal generate sertifikat untuk User ID {$this->user->id}: " . $e->getMessage());
        }
    }
}