<?php

namespace App\Services;

use App\Models\Course;
use App\Models\User;
use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Service\Slides;
use Google\Service\Slides\BatchUpdatePresentationRequest;
use Google\Service\Slides\Request;
use Exception;

class PDFGeneratorService
{
    protected Drive $driveService;
    protected Slides $slidesService;

    public function __construct()
    {
        $client = new Client();
        $client->setAuthConfig(storage_path('app/google/taiwan-global-talent-e1d95c4f9649.json'));
        $client->addScope([Drive::DRIVE, Slides::PRESENTATIONS]);

        $this->driveService = new Drive($client);
        $this->slidesService = new Slides($client);
    }

    public function generate(User $user, Course $course, string $certCode): array
    {
        $templateId = $course->google_slides_template_id;

        if (!$templateId) {
            throw new Exception("Template Google Slides belum diatur untuk kursus: {$course->title}");
        }

        // 1. DUPLIKAT TEMPLATE KE SHARED DRIVE
        $copyFile = new DriveFile([
            'name' => "Temp_Cert_{$certCode}",
            // PASTIKAN INI ADALAH ID SHARED DRIVE ORGANISASI, BUKAN FOLDER PRIBADI
            'parents' => ['1_7QDEdzkzjYXpPMHkUTGZDwf9cNY16-Z'] 
        ]);
        
        // Parameter supportsAllDrives wajib bernilai true saat menggunakan Shared Drive
        $copiedSlide = $this->driveService->files->copy($templateId, $copyFile, [
            'supportsAllDrives' => true 
        ]);
        
        $tempSlideId = $copiedSlide->id;

        try {
            // 2. GANTI PLACEHOLDER TEKS
            $requests = [
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{nama}}', 'matchCase' => true], 'replaceText' => $user->name]]),
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{kursus}}', 'matchCase' => true], 'replaceText' => $course->title]]),
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{kode}}', 'matchCase' => true], 'replaceText' => $certCode]]),
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{tanggal}}', 'matchCase' => true], 'replaceText' => now()->translatedFormat('d F Y')]]),
            ];

            $batchUpdateRequest = new BatchUpdatePresentationRequest(['requests' => $requests]);
            $this->slidesService->presentations->batchUpdate($tempSlideId, $batchUpdateRequest);

            // 3. EKSPOR KE PDF (STREAM)
            $response = $this->driveService->files->export($tempSlideId, 'application/pdf', ['alt' => 'media']);
            $pdfContent = $response->getBody()->getContents();

            if (ob_get_length()) {
                ob_end_clean(); // Mencegah file PDF corrupt
            }
            
            return [
                'filename' => "Certificate-{$certCode}.pdf",
                'content' => $pdfContent,
            ];

        } finally {
            // 4. HAPUS FILE TEMPORARY DI GOOGLE DRIVE (Selalu dijalankan)
            try {
                $this->driveService->files->delete($tempSlideId, ['supportsAllDrives' => true]);
            } catch (Exception $e) {
                \Illuminate\Support\Facades\Log::error("Gagal menghapus file temp: " . $e->getMessage());
            }
        }
    }
}