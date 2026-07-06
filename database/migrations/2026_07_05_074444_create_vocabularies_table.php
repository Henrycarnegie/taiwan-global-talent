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
        Schema::create('vocabularies', function (Blueprint $table) {
            $table->id();
            //  lesson_id DAN index-nya SUDAH DIHAPUS dari sini, karena pindah ke lesson_vocabulary

            $table->string('hanzi')->nullable();
            $table->string('pinyin');
            $table->string('meaning'); // Kita tetap pakai 'meaning' sesuai struktur asli Anda
            $table->string('audio_path');
            $table->string('audio_hash')->nullable(); // Tambahkan ini agar fitur auto-update TTS Anda bekerja
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vocabularies');
    }
};
