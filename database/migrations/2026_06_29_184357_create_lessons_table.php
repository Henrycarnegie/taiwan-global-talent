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
            // $table->id();
            // // Menghubungkan Lesson ke Course
            // $table->foreignId('course_id')->constrained()->cascadeOnDelete(); 
            // $table->string('title');
            // $table->text('content');
            // $table->integer('order')->default(0);
            // $table->timestamps();
            $table->id();
            
            $table->foreignId('course_id')->constrained()->cascadeOnDelete(); 
            
            $table->string('title');
            $table->text('content');
            
            $table->text('sentence_hanzi')->nullable(); 
            $table->string('audio_path')->nullable();   
            $table->string('audio_hash')->nullable();  
            
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }
};
