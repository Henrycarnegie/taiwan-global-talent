<?php

namespace App\Filament\Resources\Vocabularies\Schemas;

use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
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

            TextInput::make('sort_order')
                ->numeric()
                ->default(1)
                ->required(),

            Hidden::make('audio_hash'),

            TextInput::make('hanzi')
                ->label('Hanzi')
                ->required()
                ->suffixAction(
                    Action::make('generateAudio')
                        ->label('Generate')
                        ->icon('heroicon-o-speaker-wave')
                        ->button() // tampil sebagai tombol, bukan icon saja
                        ->color('primary')
                        ->action(function (callable $get, callable $set) {

                            $text = trim($get('hanzi'));

                            if (blank($text)) {
                                Notification::make()
                                    ->title('Hanzi cannot be empty')
                                    ->danger()
                                    ->send();

                                return;
                            }

                            $hash = md5($text);

                            // Audio sudah sesuai
                            if (
                                $get('audio_hash') === $hash &&
                                filled($get('audio_path')) &&
                                Storage::disk('public')->exists($get('audio_path'))
                            ) {
                                Notification::make()
                                    ->title('Audio is already up to date')
                                    ->info()
                                    ->send();

                                return;
                            }

                            try {

                                // Hapus audio lama jika ada
                                if (
                                    filled($get('audio_path')) &&
                                    Storage::disk('public')->exists($get('audio_path'))
                                ) {
                                    Storage::disk('public')->delete($get('audio_path'));
                                }

                                $credentialsPath = storage_path(env('GOOGLE_APPLICATION_CREDENTIALS'));

                                $client = new TextToSpeechClient([
                                    'credentials' => $credentialsPath,
                                ]);

                                $input = (new SynthesisInput)
                                    ->setText($text);

                                $voice = (new VoiceSelectionParams)
                                    ->setLanguageCode('cmn-TW');

                                $audioConfig = (new AudioConfig)
                                    ->setAudioEncoding(AudioEncoding::MP3)
                                    ->setSpeakingRate(0.75)
                                    ->setPitch(0);

                                $request = (new SynthesizeSpeechRequest)
                                    ->setInput($input)
                                    ->setVoice($voice)
                                    ->setAudioConfig($audioConfig);

                                $response = $client->synthesizeSpeech($request);

                                $filename = 'tts/'.Str::uuid().'.mp3';

                                Storage::disk('public')->put(
                                    $filename,
                                    $response->getAudioContent()
                                );

                                $set('audio_path', $filename);
                                $set('audio_hash', $hash);

                                $client->close();

                                Notification::make()
                                    ->title('Audio generated successfully')
                                    ->success()
                                    ->send();

                            } catch (\Exception $e) {

                                \Log::error($e);

                                Notification::make()
                                    ->title('Failed to generate audio')
                                    ->body($e->getMessage())
                                    ->danger()
                                    ->send();
                            }
                        })
                ),

            FileUpload::make('audio_path')
                ->label('Audio')
                ->disk('public')
                ->directory('tts')
                ->required()
                ->disabled()
                ->dehydrated()
                ->helperText('Auto-generated from Hanzi'),

            TextInput::make('pinyin')
                ->label('Pinyin (display only)')
                ->required(),

            TextInput::make('meaning')
                ->label('Meaning')
                ->required(),

            Toggle::make('is_active')
                ->label('Active')
                ->default(true)
                ->required(),
        ]);
    }
}
