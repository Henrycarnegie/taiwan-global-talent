<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Module;
use App\Models\Sentence;
use App\Models\User;
use App\Models\Vocabulary;
use Illuminate\Database\Seeder;

class LessonMandarinSeeder extends Seeder
{
    public function run(): void
    {
        // Cari user dengan role teacher, atau ambil user pertama sebagai fallback
        $teacher = User::whereHas('roles', function ($q) {
            $q->where('name', 'teacher');
        })->first() ?? User::first();

        // Jika belum ada user sama sekali, buat 1 user teacher dummy
        if (!$teacher) {
            $teacher = User::factory()->create([
                'name' => 'Wang Laoshi',
                'email' => 'teacher@example.com',
            ]);
        }

        $module = Module::updateOrCreate(
            ['id' => 1],
            [
                'teacher_id' => $teacher->id, // <--- TAMBAHKAN TEACHER_ID DI SINI
                'title' => 'Basic Mandarin for Beginners',
                'description' => 'This course introduces the fundamentals of Mandarin Chinese.',
                'level' => 'HSK 1',
                'category_id' => 1,
                'is_published' => true,
                'status' => 'published',
            ]
        );

        $lesson1 = Lesson::updateOrCreate(
            ['id' => 1],
            [
                'module_id' => $module->id,
                'title' => 'Lesson 1: Greetings and Hello',
                'content' => 'In this first lesson, we will learn how to greet other people.',
                'sentence_hanzi' => '你好！',
                'audio_path' => 'audio/lessons/lesson_1.mp3',
                'order' => 1,
            ]
        );

        $vocab1 = Vocabulary::updateOrCreate(['id' => 1], [
            'hanzi' => '你', 'pinyin' => 'nǐ', 'meaning' => 'You', 'audio_path' => 'audio/vocab/ni.mp3',
        ]);
        $vocab2 = Vocabulary::updateOrCreate(['id' => 2], [
            'hanzi' => '好', 'pinyin' => 'hǎo', 'meaning' => 'Good', 'audio_path' => 'audio/vocab/hao.mp3',
        ]);

        $lesson1->vocabularies()->syncWithoutDetaching([
            $vocab1->id => ['sort_order' => 1],
            $vocab2->id => ['sort_order' => 2],
        ]);

        Sentence::updateOrCreate(['id' => 1], [
            'lesson_id' => $lesson1->id,
            'hanzi' => '你好吗？', 'pinyin' => 'Nǐ hǎo ma?', 'meaning' => 'How are you?', 'sort_order' => 1,
        ]);

        $lesson2 = Lesson::updateOrCreate(
            ['id' => 2],
            [
                'module_id' => $module->id,
                'title' => 'Lesson 2: Saying Thank You',
                'content' => 'This second lesson covers polite ways to say thank you.',
                'sentence_hanzi' => '谢谢！',
                'audio_path' => 'audio/lessons/lesson_2.mp3',
                'order' => 2,
            ]
        );

        $vocab3 = Vocabulary::updateOrCreate(['id' => 3], [
            'hanzi' => '谢谢', 'pinyin' => 'xièxie', 'meaning' => 'Thank you', 'audio_path' => 'audio/vocab/xiexie.mp3',
        ]);
        $vocab4 = Vocabulary::updateOrCreate(['id' => 4], [
            'hanzi' => '不客气', 'pinyin' => 'bú kèqi', 'meaning' => 'You are welcome', 'audio_path' => 'audio/vocab/bukeqi.mp3',
        ]);

        $lesson2->vocabularies()->syncWithoutDetaching([
            $vocab3->id => ['sort_order' => 1],
            $vocab4->id => ['sort_order' => 2],
        ]);

        Sentence::updateOrCreate(['id' => 2], [
            'lesson_id' => $lesson2->id,
            'hanzi' => '不用谢。', 'pinyin' => 'Búyòng xiè.', 'meaning' => 'No need to thank me.', 'sort_order' => 1,
        ]);
    }
}