<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('module_id')->constrained()->cascadeOnDelete();
            
            // Menyimpan total materi yang sudah diselesaikan siswa dalam kursus ini
            $table->integer('completed_lessons_count')->default(0);
            
            // Status apakah kursus sudah diselesaikan 100%
            $table->boolean('is_completed')->default(false);
            $table->timestamp('completed_at')->nullable();

            $table->string('certificate_path')->nullable();
            
            $table->timestamps();

            // Mencegah user mendaftar course yang sama dua kali
            $table->unique(['user_id', 'module_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};