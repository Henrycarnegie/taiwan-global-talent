<?php

namespace App\Filament\Resources\Lessons\Schemas;

use App\Models\Course;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Google\Cloud\TextToSpeech\V1\Client\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\SynthesizeSpeechRequest;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LessonsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('course_id')
                    ->relationship('course', 'title')
                    ->label('Course')
                    ->required()
                    ->preload()
                    ->reactive(),

                ...self::getRepeaterComponents(),
            ]);
    }

    public static function getRepeaterComponents(): array
    {
        $isMandarin = function (callable $get) {
            $courseId = $get('course_id');
            if (! $courseId) {
                return false;
            }
            $course = Course::find($courseId);

            return $course && $course->category_id === 1;
        };

        return [
            TextInput::make('title')
                ->label('Lesson Title')
                ->required(),

            TextInput::make('order')
                ->label('Order / Urutan Materi')
                ->numeric()
                ->default(0)
                ->required(),

            Select::make('content_type')
                ->label('Tipe Konten Pembelajaran')
                ->options([
                    'text' => '📝 Teks Paragraf / Artikel',
                    'video' => '🎥 Video Materi',
                    'audio' => '🎵 Audio Podcast / Listening',
                    'pdf' => '📄 Dokumen PDF / E-Book',
                ])
                ->default('text')
                ->required()
                ->reactive(),

            RichEditor::make('content')
                ->label('Isi Artikel Materi')
                ->columnSpanFull()
                ->visible(fn (callable $get) => $get('content_type') === 'text')
                ->required(fn (callable $get) => $get('content_type') === 'text'),

            TextInput::make('video_url')
                ->label('Link URL Video (YouTube / Vimeo)')
                ->placeholder('https://www.youtube.com/watch?v=...')
                ->columnSpanFull()
                ->visible(fn (callable $get) => $get('content_type') === 'video'),

            FileUpload::make('video_path')
                ->label('Atau Upload File Video')
                ->disk('s3')
                ->directory('courses/videos')
                ->visible(fn (callable $get) => $get('content_type') === 'video')
                ->acceptedFileTypes(['video/mp4', 'video/mkv']),

            Repeater::make('audios')
                ->relationship('audios')
                ->label('Audio Lessons')
                ->columnSpanFull()
                ->reorderable('sort_order')
                ->collapsible()
                ->addActionLabel('Add new audio')
                ->schema([
                    TextInput::make('lesson_audio_description')->label('Lesson Audio Description')->required(),
                    FileUpload::make('lesson_audio_path')
                        ->label('Upload Learning Audio File')
                        ->disk('s3')
                        ->directory('courses/audios')
                        ->acceptedFileTypes(['audio/mpeg', 'audio/mp3', 'audio/wav'])
                        ->required(),
                ])
                ->visible(fn (callable $get) => $get('content_type') === 'audio')
                ->required(fn (callable $get) => $get('content_type') === 'audio'),

            // Muncul jika tipe konten adalah "pdf"
            FileUpload::make('pdf_path')
                ->label('Upload Dokumen PDF')
                ->disk('s3')
                ->directory('courses/documents')
                ->acceptedFileTypes(['application/pdf'])
                ->visible(fn (callable $get) => $get('content_type') === 'pdf')
                ->required(fn (callable $get) => $get('content_type') === 'pdf'),

            Repeater::make('sentences')
                ->relationship('sentences')
                ->label('List of Sentences')
                ->columnSpanFull()
                ->reorderable('sort_order')
                ->collapsible()
                ->hidden(fn (callable $get) => ! $isMandarin($get))
                ->addActionLabel('Add new sentences')
                ->schema([
                    TextInput::make('pinyin')->label('Pinyin')->required(),
                    TextInput::make('meaning')->label('Meaning')->required(),
                    Hidden::make('audio_hash'),
                    TextInput::make('hanzi')
                        ->label('Chinese Sentence (Hanzi)')
                        ->required()
                        ->suffixAction(
                            Action::make('generateSentenceAudio')
                                ->label('Generate Audio')
                                ->icon('heroicon-o-speaker-wave')
                                ->button()
                                ->color('success')
                                ->action(function (callable $get, callable $set) {
                                    $text = trim($get('hanzi'));
                                    if (blank($text)) {
                                        Notification::make()->title('Sentence cannot be empty')->danger()->send();

                                        return;
                                    }

                                    $hash = md5($text);

                                    if ($get('audio_hash') === $hash && filled($get('audio_path')) && Storage::disk('s3')->exists($get('audio_path'))) {
                                        Notification::make()->title('Audio is already up to date')->info()->send();

                                        return;
                                    }

                                    try {
                                        if (filled($get('audio_path')) && Storage::disk('s3')->exists($get('audio_path'))) {
                                            Storage::disk('s3')->delete($get('audio_path'));
                                        }

                                        $credentialsPath = storage_path(env('GOOGLE_TTS_APPLICATION_CREDENTIALS'));
                                        $client = new TextToSpeechClient(['credentials' => $credentialsPath]);
                                        $input = (new SynthesisInput)->setText($text);
                                        $voice = (new VoiceSelectionParams)->setLanguageCode('cmn-TW');
                                        $audioConfig = (new AudioConfig)->setAudioEncoding(AudioEncoding::MP3)->setSpeakingRate(0.70)->setPitch(0);

                                        $request = (new SynthesizeSpeechRequest)->setInput($input)->setVoice($voice)->setAudioConfig($audioConfig);
                                        $response = $client->synthesizeSpeech($request);
                                        $filename = 'tts/sentences/'.Str::uuid().'.mp3';

                                        Storage::disk('s3')->put($filename, $response->getAudioContent());

                                        $set('audio_path', $filename);
                                        $set('audio_hash', $hash);
                                        $client->close();
                                        Notification::make()->title('Sentence audio generated successfully')->success()->send();
                                    } catch (\Exception $e) {
                                        \Log::error($e);
                                        Notification::make()->title('Failed to generate audio')->body($e->getMessage())->danger()->send();
                                    }
                                })
                        ),

                    FileUpload::make('audio_path')
                        ->label('Sentence Audio File')
                        ->disk('s3')
                        ->directory('tts/sentences')
                        ->disabled()
                        ->dehydrated(),
                ]),

            Select::make('vocabularies')
                ->relationship('vocabularies', 'hanzi')
                ->multiple()
                ->searchable(['hanzi', 'pinyin', 'meaning'])
                ->preload()
                ->label('Reference Vocabulary')
                ->columnSpanFull()
                ->hidden(fn (callable $get) => ! $isMandarin($get)),
        ];
    }
}
