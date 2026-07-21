<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_job_id')->constrained('company_jobs')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            
            // Candidate Metadata
            $table->string('candidate_name');
            $table->string('candidate_email');
            $table->string('candidate_phone')->nullable();
            $table->string('resume_path'); // Path berkas CV di Cloudflare R2
            
            $table->enum('status', ['pending', 'reviewed', 'interviewed', 'hired', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};