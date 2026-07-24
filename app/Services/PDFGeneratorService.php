<?php

namespace App\Services;

use App\Models\Module;
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

        $clientId = config('services.google.client_id') ?? env('GOOGLE_CLIENT_ID');
        $clientSecret = config('services.google.client_secret') ?? env('GOOGLE_CLIENT_SECRET');
        $refreshToken = config('services.google.refresh_token') ?? env('GOOGLE_REFRESH_TOKEN');

        if (! $refreshToken) {
            throw new Exception('GOOGLE_REFRESH_TOKEN belum diatur di file .env atau config/services.php');
        }

        $client->setClientId($clientId);
        $client->setClientSecret($clientSecret);
        $client->addScope([Drive::DRIVE, Slides::PRESENTATIONS]);
        $client->setAccessType('offline');

        $token = $client->fetchAccessTokenWithRefreshToken($refreshToken);
        if (isset($token['error'])) {
            throw new Exception('Google OAuth Error: '.($token['error_description'] ?? $token['error']));
        }

        $client->setAccessToken($token);

        $this->driveService = new Drive($client);
        $this->slidesService = new Slides($client);
    }

    public function generate(User $user, Module $module, string $certCode): string
    {
        $templateId = $module->google_slides_template_id;

        if (! $templateId) {
            throw new Exception("Google Slides Template is not set for course: {$module->title}");
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
                new Request(['replaceAllText' => ['containsText' => ['text' => '{{module}}', 'matchCase' => true], 'replaceText' => $module->title]]),
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
                Log::error('Failed to delete Google Slides temp file: '.$e->getMessage());
            }
        }
    }
}
