<?php

namespace App\Services;

use App\Models\Course;
use App\Models\User;
use Exception;
use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Service\Slides;
use Google\Service\Slides\BatchUpdatePresentationRequest;
use Google\Service\Slides\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PDFGeneratorService
{
    protected Drive $driveService;

    protected Slides $slidesService;

    public function __construct()
    {
        $client = new Client;

        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->refreshToken(env('GOOGLE_REFRESH_TOKEN'));

        $client->addScope([Drive::DRIVE, Slides::PRESENTATIONS]);
        $client->setAccessType('offline');

        $this->driveService = new Drive($client);
        $this->slidesService = new Slides($client);
    }

    public function generate(User $user, Course $course, string $certCode): string
    {
        $templateId = $course->google_slides_template_id;

        if (!$templateId) {
            throw new Exception("Google Slides Template is not set for course: {$course->title}");
        }

        // Proses Google Drive & Slides API ...
        $copyFile = $this->driveService->files->copy($templateId, new DriveFile([
            'name' => "Temp_Cert_{$certCode}_{$user->name}",
        ]));
        
        $documentId = $copyFile->getId(); 

        try {
            // Replace placeholder ...
            $requests = [
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{name}}', 'matchCase' => true], 'replaceText' => $user->name]]),
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{course}}', 'matchCase' => true], 'replaceText' => $course->title]]),
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{code}}', 'matchCase' => true], 'replaceText' => $certCode]]),
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{date}}', 'matchCase' => true], 'replaceText' => now()->translatedFormat('d F Y')]]),
            ];

            $batchUpdateRequest = new BatchUpdatePresentationRequest(['requests' => $requests]);
            $this->slidesService->presentations->batchUpdate($documentId, $batchUpdateRequest);

            // Export to PDF format
            $response = $this->driveService->files->export($documentId, 'application/pdf', ['alt' => 'media']);
            $pdfContent = $response->getBody()->getContents();

            $filename = "certificates/Certificate-{$certCode}.pdf";
            
            // Upload langsung ke Cloudflare R2 / S3
            Storage::disk('s3')->put($filename, $pdfContent);
            ob_end_clean();
            return $filename; 

        } finally {
            // Delete temporary file in Drive to prevent storage accumulation
            try {
                $this->driveService->files->delete($documentId);
            } catch (Exception $e) {
                Log::error("Failed to delete Google Slides temp file: " . $e->getMessage());
            }
        }
    }
}
