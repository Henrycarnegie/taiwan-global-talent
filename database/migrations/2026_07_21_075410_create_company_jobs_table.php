<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_profile_id')->constrained('company_profiles')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('type', ['Full-time', 'Part-time', 'Contract', 'Internship'])->default('Full-time');
            $table->enum('location_type', ['On-site', 'Remote', 'Hybrid'])->default('On-site');
            $table->string('city')->nullable();
            $table->string('salary_range')->nullable();
            $table->text('requirements')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['published', 'draft', 'closed'])->default('published');
            $table->unsignedBigInteger('views_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_jobs');
    }
};
