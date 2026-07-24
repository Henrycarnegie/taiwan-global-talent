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
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke Teacher (User)
            $table->foreignId('teacher_id')
                ->constrained('users')
                ->onDelete('cascade');

            // Relasi ke Parent Course (CourseCategory)
            $table->foreignId('category_id')
                ->constrained('course_categories')
                ->onDelete('cascade');

            $table->string('title');
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->string('level')->nullable();
            $table->integer('order')->default(0);

            // Status publikasi modul (draft / published)
            $table->string('status')->default('draft');
            $table->boolean('is_published')->default(false);

            $table->string('google_slides_template_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
