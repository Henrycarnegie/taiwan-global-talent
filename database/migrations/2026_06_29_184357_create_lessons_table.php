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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();

            $table->foreignId('module_id')->constrained()->cascadeOnDelete();

            $table->string('title');
            $table->text('content')->nullable();

            $table->text('sentence_hanzi')->nullable();
            $table->string('audio_path')->nullable();
            $table->string('audio_hash')->nullable();

            $table->string('content_type')->default('text'); // text, video, audio, pdf
            $table->string('video_url')->nullable();
            $table->string('video_path')->nullable();
            $table->string('lesson_audio_path')->nullable();
            $table->string('pdf_path')->nullable();

            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }
};
