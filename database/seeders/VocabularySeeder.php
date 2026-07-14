<?php

namespace Database\Seeders;

use App\Models\Vocabulary;
use Illuminate\Database\Seeder;

class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vocabularies = [
            [
                'hanzi' => '我',
                'pinyin' => 'wǒ',
                'meaning' => 'I / Me',
                'audio_path' => 'tts/seeders/wo.mp3',
                'audio_hash' => md5('我'),
                'is_active' => true,
            ],
            [
                'hanzi' => '你',
                'pinyin' => 'nǐ',
                'meaning' => 'You',
                'audio_path' => 'tts/seeders/ni.mp3',
                'audio_hash' => md5('你'),
                'is_active' => true,
            ],
            [
                'hanzi' => '好',
                'pinyin' => 'hǎo',
                'meaning' => 'Good / Fine',
                'audio_path' => 'tts/seeders/hao.mp3',
                'audio_hash' => md5('好'),
                'is_active' => true,
            ],
            [
                'hanzi' => '你好',
                'pinyin' => 'nǐ hǎo',
                'meaning' => 'Hello / How are you',
                'audio_path' => 'tts/seeders/ni_hao.mp3',
                'audio_hash' => md5('你好'),
                'is_active' => true,
            ],
            [
                'hanzi' => '老师',
                'pinyin' => 'lǎoshī',
                'meaning' => 'Teacher',
                'audio_path' => 'tts/seeders/laoshi.mp3',
                'audio_hash' => md5('老师'),
                'is_active' => true,
            ],
            [
                'hanzi' => '学生',
                'pinyin' => 'xuéshēng',
                'meaning' => 'Student / Pupil',
                'audio_path' => 'tts/seeders/xuesheng.mp3',
                'audio_hash' => md5('学生'),
                'is_active' => true,
            ],
            [
                'hanzi' => '谢谢',
                'pinyin' => 'xièxie',
                'meaning' => 'Thank you',
                'audio_path' => 'tts/seeders/xiexie.mp3',
                'audio_hash' => md5('谢谢'),
                'is_active' => true,
            ],
            [
                'hanzi' => '不客气',
                'pinyin' => 'bú kèqi',
                'meaning' => 'You are welcome',
                'audio_path' => 'tts/seeders/bu_keqi.mp3',
                'audio_hash' => md5('不客气'),
                'is_active' => true,
            ],
            [
                'hanzi' => '再见',
                'pinyin' => 'zàijiàn',
                'meaning' => 'Goodbye / See you',
                'audio_path' => 'tts/seeders/zaijian.mp3',
                'audio_hash' => md5('再见'),
                'is_active' => true,
            ],
            [
                'hanzi' => '名字',
                'pinyin' => 'míngzi',
                'meaning' => 'Name',
                'audio_path' => 'tts/seeders/mingzi.mp3',
                'audio_hash' => md5('名字'),
                'is_active' => true,
            ],
        ];

        foreach ($vocabularies as $vocab) {
            Vocabulary::updateOrCreate(
                ['hanzi' => $vocab['hanzi']], // Unique by Hanzi to avoid duplicates when rerunning.
                $vocab
            );
        }
    }
}
