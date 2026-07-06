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

            // Replace foreignId() with these two explicit lines.
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

            // 1. Company owner or primary administrator account.
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // 2. Legal and verification information for web administrators.
            $table->string('company_legal_name');
            $table->string('tax_id')->nullable()->unique();
            $table->string('business_registration_path')->nullable();

            // 3. Public branding information displayed on job pages.
            $table->string('company_display_name');
            $table->string('slug')->unique();
            $table->string('logo_path')->nullable();
            $table->string('banner_path')->nullable();
            $table->string('industry');
            $table->string('company_size')->nullable();
            $table->year('founded_year')->nullable();
            $table->string('website_url')->nullable();
            $table->text('bio')->nullable();
            $table->longText('description')->nullable();

            // 4. Company location and official contact information.
            $table->text('hq_address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('Taiwan');
            $table->string('official_email')->nullable();

            // 5. Person in charge (PIC) or initial registrant information.
            $table->string('pic_name');
            $table->string('pic_phone');
            $table->string('pic_position');

            // 6. Status and verification management.
            $table->enum('status', ['pending', 'approved', 'rejected', 'suspended'])->default('pending');

            $table->text('rejection_reason')->nullable();

            $table->timestamp('verified_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        // 3. Teacher Profile
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();

            // Use the same explicit approach.
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('full_name');
            $table->string('phone')->nullable();
            $table->string('cv_path')->nullable();
            $table->string('expertise')->nullable();
            $table->string('certificate_path')->nullable();
            $table->string('learning_goal')->nullable();
            $table->string('bio')->nullable();

            // Approval Status (Approved, Rejected, Pending)
            $table->enum('status', ['pending', 'approved', 'rejected', 'suspended'])->default('pending');

            $table->text('rejection_reason')->nullable();

            $table->timestamp('verified_at')->nullable();

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
