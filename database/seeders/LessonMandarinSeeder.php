<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Vocabulary;
use App\Models\Sentence;
use Illuminate\Database\Seeder;

class LessonMandarinSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'Mandarin Dasar untuk Pemula',
                'description' => 'Kursus ini dirancang untuk memperkenalkan dasar-dasar bahasa Mandarin.',
                'level' => 'HSK 1',
                'category_id' => 1, 
                'is_published' => true,
            ]
        );
        $lesson1 = Lesson::updateOrCreate(
            ['id' => 1],
            [
                'course_id' => $course->id,
                'title' => 'Pelajaran 1: Menyapa dan Halo',
                'content' => 'Di pelajaran pertama ini, kita akan belajar bagaimana cara menyapa orang lain.',
                'sentence_hanzi' => '你好！',
                'audio_path' => 'audio/lessons/lesson_1.mp3',
                'order' => 1,
            ]
        );

        $vocab1 = Vocabulary::updateOrCreate(['id' => 1], [
            'hanzi' => '你', 'pinyin' => 'nǐ', 'meaning' => 'Kamu', 'audio_path' => 'audio/vocab/ni.mp3'
        ]);
        $vocab2 = Vocabulary::updateOrCreate(['id' => 2], [
            'hanzi' => '好', 'pinyin' => 'hǎo', 'meaning' => 'Baik', 'audio_path' => 'audio/vocab/hao.mp3'
        ]);

        $lesson1->vocabularies()->syncWithoutDetaching([
            $vocab1->id => ['sort_order' => 1],
            $vocab2->id => ['sort_order' => 2],
        ]);

        Sentence::updateOrCreate(['id' => 1], [
            'lesson_id' => $lesson1->id,
            'hanzi' => '你好吗？', 'pinyin' => 'Nǐ hǎo ma?', 'meaning' => 'Apa kabar?', 'sort_order' => 1
        ]);

        $lesson2 = Lesson::updateOrCreate(
            ['id' => 2],
            [
                'course_id' => $course->id,
                'title' => 'Pelajaran 2: Berterima Kasih',
                'content' => 'Materi kedua ini membahas tentang tata krama berterima kasih.',
                'sentence_hanzi' => '谢谢！',
                'audio_path' => 'audio/lessons/lesson_2.mp3',
                'order' => 2,
            ]
        );

        $vocab3 = Vocabulary::updateOrCreate(['id' => 3], [
            'hanzi' => '谢谢', 'pinyin' => 'xièxie', 'meaning' => 'Terima kasih', 'audio_path' => 'audio/vocab/xiexie.mp3'
        ]);
        $vocab4 = Vocabulary::updateOrCreate(['id' => 4], [
            'hanzi' => '不客气', 'pinyin' => 'bú kèqi', 'meaning' => 'Sama-sama', 'audio_path' => 'audio/vocab/bukeqi.mp3'
        ]);

        $lesson2->vocabularies()->syncWithoutDetaching([
            $vocab3->id => ['sort_order' => 1],
            $vocab4->id => ['sort_order' => 2],
        ]);

        Sentence::updateOrCreate(['id' => 2], [
            'lesson_id' => $lesson2->id,
            'hanzi' => '不用谢。', 'pinyin' => 'Búyòng xiè.', 'meaning' => 'Tidak usah berterima kasih.', 'sort_order' => 1
        ]);
    }
}