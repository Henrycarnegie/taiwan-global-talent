<?php

namespace App\Jobs;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\User;
use App\Services\PDFGeneratorService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class GenerateCertificateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(
        public User $user,
        public Course $course
    ) {}

    public function handle(PDFGeneratorService $pdfService): void
    {
        // Cek jika sertifikat sudah pernah dibuat
        $existing = Certificate::where('user_id', $this->user->id)
            ->where('course_id', $this->course->id)
            ->first();

        if ($existing) {
            return;
        }

        // Generate Kode Unik Sertifikat
        $certCode = 'CERT-' . strtoupper(Str::random(8));

        // Panggil Service
        $pdfPath = $pdfService->generate($this->user, $this->course, $certCode);

        // Simpan ke Database
        Certificate::create([
            'uuid' => (string) Str::uuid(),
            'certificate_code' => $certCode,
            'user_id' => $this->user->id,
            'course_id' => $this->course->id,
            'pdf_path' => $pdfPath,
            'issued_at' => now(),
        ]);
    }
}