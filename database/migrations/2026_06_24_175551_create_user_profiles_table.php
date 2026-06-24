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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Academic
            $table->string('country')->nullable();
            $table->string('university')->nullable();
            $table->string('mandarin_level')->nullable(); // Beginner - Advanced

            $table->integer('toefl_score')->nullable();
            $table->integer('tocfl_score')->nullable();

            $table->text('skills')->nullable(); // JSON or comma separated
            $table->text('certificates')->nullable();

            // Profile
            $table->string('learning_goal')->nullable(); // study/work/travel
            $table->text('bio')->nullable();

            // Visibility
            $table->boolean('is_public')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
