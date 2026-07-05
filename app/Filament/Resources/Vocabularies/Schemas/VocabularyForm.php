<?php

namespace App\Filament\Resources\Vocabularies\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Google\Cloud\TextToSpeech\V1\Client\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\SynthesizeSpeechRequest;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VocabularyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('lesson_id')
                ->label('Lesson')
                ->relationship('lesson', 'title')
                ->required()
                ->searchable(),

            TextInput::make('hanzi')
                ->label('Hanzi')
                ->required()
                ->lazy()
                ->afterStateUpdated(function (Set $set, $state, callable $get) {

                    if (blank($state)) {
                        return;
                    }

                    try {
                        $credentialsPath = storage_path(
                            'app/google/taiwan-global-talent-e1d95c4f9649.json'
                        );

                        $client = new TextToSpeechClient([
                            'credentials' => $credentialsPath,
                        ]);

                        /**
                         * 🔥 IMPORTANT:
                         * gunakan HANZI, bukan pinyin
                         */
                        $text = $state;

                        $input = (new SynthesisInput)
                            ->setText($text);

                        /**
                         * 🎯 Taiwan Mandarin Voice
                         * (fallback ke cmn-TW jika name tidak tersedia)
                         */
                        $voice = (new VoiceSelectionParams)
                            ->setLanguageCode('cmn-TW');

                        /**
                         * 🎧 kualitas audio
                         */
                        $audioConfig = (new AudioConfig)
                            ->setAudioEncoding(AudioEncoding::MP3)
                            ->setSpeakingRate(0.90)
                            ->setPitch(0.0);

                        /**
                         * Request (v2 style)
                         */
                        $request = (new SynthesizeSpeechRequest)
                            ->setInput($input)
                            ->setVoice($voice)
                            ->setAudioConfig($audioConfig);

                        $response = $client->synthesizeSpeech($request);

                        $audioContent = $response->getAudioContent();

                        $filename = 'tts/'.Str::uuid().'.mp3';

                        Storage::disk('public')->put($filename, $audioContent);

                        $set('audio_path', $filename);

                        $client->close();

                    } catch (\Exception $e) {
                        \Log::error('Google TTS Error: '.$e->getMessage());
                    }
                }),

            TextInput::make('pinyin')
                ->label('Pinyin (display only)')
                ->required(),

            TextInput::make('meaning')
                ->label('Meaning')
                ->required(),

            FileUpload::make('audio_path')
                ->label('Audio')
                ->disk('public')
                ->directory('tts')
                ->required()
                ->disabled()
                ->dehydrated()
                ->helperText('Auto-generated from Hanzi'),

            TextInput::make('sort_order')
                ->numeric()
                ->default(1)
                ->required(),

            Toggle::make('is_active')
                ->label('Active')
                ->default(true)
                ->required(),
        ]);
    }
}
