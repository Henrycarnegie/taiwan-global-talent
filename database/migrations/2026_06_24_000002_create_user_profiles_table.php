<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Student Profile
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();

            // Ganti foreignId() dengan dua baris eksplisit ini:
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('country')->default('Taiwan');
            $table->string('university')->nullable();
            $table->string('major')->nullable();
            $table->string('mandarin_level')->nullable();
            $table->string('toefl_score')->nullable();
            $table->string('tocfl_score')->nullable();
            $table->string('skills')->nullable();
            $table->string('certificates')->nullable();
            $table->string('learning_goal')->nullable();
            $table->string('bio')->nullable();
            $table->boolean('is_public')->default(true);
            $table->timestamps();
        });

        // 2. Company Profile
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();

            // Gunakan cara eksplisit yang sama
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('company_name');
            $table->string('industry')->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('tax_id')->nullable();
            $table->timestamps();
        });

        // 3. Teacher Profile
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();

            // Gunakan cara eksplisit yang sama
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('bio')->nullable();
            $table->string('expertise')->nullable();
            $table->string('certification_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
        Schema::dropIfExists('company_profiles');
        Schema::dropIfExists('teacher_profiles');
    }
};
