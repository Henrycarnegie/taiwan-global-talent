<?php

namespace App\Filament\Resources\Lessons\Schemas;

use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
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
                    ->preload(),

                ...self::getRepeaterComponents(),
            ]);
    }

    public static function getRepeaterComponents(): array
    {
        return [
            TextInput::make('title')
                ->label('Title')
                ->required(),

            Textarea::make('content')
                ->label('Content')
                ->required(),

            TextInput::make('order')
                ->label('Order')
                ->numeric()
                ->required(),

            Repeater::make('sentences')
                ->relationship('sentences')
                ->label('List of sentences in this lesson')
                ->columnSpanFull()
                ->reorderable('sort_order')
                ->collapsible()
                ->addActionLabel('Add new sentences')
                ->schema([
                    TextInput::make('pinyin')
                        ->label('Pinyin')
                        ->required(),

                    TextInput::make('meaning')
                        ->label('Meaning in English')
                        ->required(),

                    Hidden::make('audio_hash'),

                    TextInput::make('hanzi')
                        ->label('Chinese Sentence')
                        ->placeholder('Example: 我要點這個。')
                        ->required()
                        ->suffixAction(
                            Action::make('generateSentenceAudio')
                                ->label('Generate Audio')
                                ->icon('heroicon-o-speaker-wave')
                                ->button()
                                ->color('success')
                                ->action(function (callable $get, callable $set) {
                                    // Mengambil teks Hanzi spesifik dari baris repeater ini
                                    $text = trim($get('hanzi'));

                                    if (blank($text)) {
                                        Notification::make()->title('Sentence cannot be empty')->danger()->send();

                                        return;
                                    }

                                    $hash = md5($text);

                                    if (
                                        $get('audio_hash') === $hash &&
                                        filled($get('audio_path')) &&
                                        Storage::disk('public')->exists($get('audio_path'))
                                    ) {
                                        Notification::make()->title('Audio is already up to date').info()->send();

                                        return;
                                    }

                                    try {
                                        if (
                                            filled($get('audio_path')) &&
                                            Storage::disk('public')->exists($get('audio_path'))
                                        ) {
                                            Storage::disk('public')->delete($get('audio_path'));
                                        }

                                        $credentialsPath = storage_path(env('GOOGLE_TTS_APPLICATION_CREDENTIALS'));
                                        $client = new TextToSpeechClient(['credentials' => $credentialsPath]);

                                        $input = (new SynthesisInput)->setText($text);
                                        $voice = (new VoiceSelectionParams)->setLanguageCode('cmn-TW');
                                        $audioConfig = (new AudioConfig)
                                            ->setAudioEncoding(AudioEncoding::MP3)
                                            ->setSpeakingRate(0.70)
                                            ->setPitch(0);

                                        $request = (new SynthesizeSpeechRequest)
                                            ->setInput($input)
                                            ->setVoice($voice)
                                            ->setAudioConfig($audioConfig);

                                        $response = $client->synthesizeSpeech($request);
                                        $filename = 'tts/sentences/'.Str::uuid().'.mp3';

                                        Storage::disk('public')->put($filename, $response->getAudioContent());

                                        $set('audio_path', $filename);
                                        $set('audio_hash', $hash);
                                        $client->close();

                                        Notification::make()->title('Sentence audio generated successfully')->success()->send();

                                    } catch (\Exception $e) {
                                        \Log::error($e);
                                        Notification::make()
                                            ->title('Failed to generate audio')
                                            ->body($e->getMessage())
                                            ->danger()->send();
                                    }
                                })
                        ),

                    FileUpload::make('audio_path')
                        ->label('Sentence Audio')
                        ->disk('public')
                        ->directory('tts/sentences')
                        ->disabled()
                        ->dehydrated()
                        ->helperText('Auto generated from button above'),
                ]),

            Select::make('vocabularies')
                ->relationship('vocabularies', 'hanzi')
                ->multiple()
                ->searchable(['hanzi', 'pinyin', 'meaning'])
                ->preload()
                ->label('Reference Vocabulary')
                ->columnSpanFull(),
        ];
    }
}
