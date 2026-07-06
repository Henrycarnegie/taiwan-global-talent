<?php

namespace App\Filament\Resources\Companies\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class CompanyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->schema([

            // BARIS 1: LEGAL & VERIFICATION
            Section::make('1. Legal & Verification')
                ->relationship('companyProfile')
                ->schema([
                    TextInput::make('company_legal_name')
                        ->label('Company Name (Legal)')
                        ->required(),

                    TextInput::make('tax_id')
                        ->label('Tax ID / NIB'),

                    Select::make('status')
                        ->label('Verification Status')
                        ->options([
                            'pending' => '⏳ Pending Review',
                            'approved' => '✅ Approved',
                            'rejected' => '❌ Rejected',
                            'suspended' => '🚫 Suspended',
                        ])
                        ->required()
                        ->native(false)
                        ->live(),

                    Textarea::make('rejection_reason')
                        ->label('Rejection Reason')
                        ->visible(fn ($get) => $get('status') === 'rejected')
                        ->required(fn ($get) => $get('status') === 'rejected')
                        ->rows(2),

                    /**
                     * LOGO + PREVIEW
                     */
                    FileUpload::make('logo_path')
                        ->label('Company Logo')
                        ->image()
                        ->directory('company-logos')
                        ->imagePreviewHeight('200'),

                    Placeholder::make('logo_preview')
                        ->label('Company Logo Preview')
                        ->content(function ($get, $record) {

                            $path = $get('logo_path') ?? $record?->logo_path;

                            if (! $path) {
                                return 'No logo uploaded.';
                            }

                            $url = Storage::disk('public')->url($path);

                            return new HtmlString("
                                <img src='{$url}'
                                    style='max-height:200px;border-radius:10px;border:1px solid #ddd;' />
                            ");
                        }),

                    /**
                     * BUSINESS REGISTRATION (PDF / IMAGE)
                     */
                    FileUpload::make('business_registration_path')
                        ->label('Business Registration')
                        ->directory('companies/legals')
                        ->acceptedFileTypes(['application/pdf', 'image/*'])
                        ->live(),

                    Placeholder::make('document_preview')
                        ->label('Business Registration Preview')
                        ->content(function ($get, $record) {

                            $path = $get('business_registration_path') ?? $record?->business_registration_path;

                            if (! $path) {
                                return 'No document uploaded.';
                            }

                            $url = Storage::disk('public')->url($path);
                            $file = strtolower($path);

                            // PDF preview
                            if (Str::endsWith($file, '.pdf')) {
                                return new HtmlString("
                                    <iframe src='{$url}'
                                        style='width:100%;height:600px;border:1px solid #ddd;border-radius:10px;'>
                                    </iframe>
                                ");
                            }

                            // image preview
                            if (preg_match('/\.(jpg|jpeg|png|webp|gif)$/', $file)) {
                                return new HtmlString("
                                    <img src='{$url}'
                                        style='max-width:500px;border-radius:10px;border:1px solid #ddd;' />
                                ");
                            }

                            return new HtmlString("
                                <a href='{$url}' target='_blank'
                                   style='color:#2563eb;text-decoration:underline;'>
                                    Open Document
                                </a>
                            ");
                        }),
                ]),

            Section::make('2. Public Profile (Branding)')
                ->relationship('companyProfile')
                ->schema([

                    Grid::make(2)
                        ->schema([

                            TextInput::make('company_display_name')
                                ->label('Public Brand Name')
                                ->required(),

                            TextInput::make('slug')
                                ->label('URL Slug')
                                ->required(),

                            TextInput::make('industry')
                                ->label('Industry Sector')
                                ->required(),

                            TextInput::make('website_url')
                                ->label('Official Website')
                                ->url(),

                            TextInput::make('company_size')
                                ->label('Company Size'),

                            TextInput::make('founded_year')
                                ->label('Founded Year'),

                            TextInput::make('bio')
                                ->label('Tagline'),

                            TextInput::make('description')
                                ->label('Description'),
                        ]),

                    FileUpload::make('banner_path')
                        ->label('Company Banner')
                        ->image()
                        ->directory('company-banners')
                        ->imagePreviewHeight('200')
                        ->columnSpanFull(), // 🔥 FULL WIDTH

                    Placeholder::make('banner_preview')
                        ->label('Company Banner Preview')
                        ->columnSpanFull() // 🔥 FULL WIDTH
                        ->content(function ($get, $record) {

                            $path = $get('banner_path') ?? $record?->banner_path;

                            if (! $path) {
                                return 'No banner uploaded.';
                            }

                            $url = Storage::disk('public')->url($path);

                            return new HtmlString("
                    <img src='{$url}'
                        style='width:100%;max-height:250px;object-fit:cover;border-radius:10px;border:1px solid #ddd;' />
                ");
                        }),
                ]),

            // BARIS 3: PIC & CONTACT
            Section::make('3. PIC & Contact Details')
                ->relationship('companyProfile')
                ->schema([
                    Grid::make(2)
                        ->schema([
                            TextInput::make('pic_name')->label('PIC Full Name')->required(),
                            TextInput::make('pic_phone')->label('Phone Number')->required(),
                            TextInput::make('pic_position')->label('Position')->required(),
                            TextInput::make('official_email')->label('Corporate Email')->email(),
                            TextInput::make('city')->label('City HQ'),
                            TextInput::make('country')->label('Country')->default('Taiwan'),
                            Textarea::make('hq_address')->label('Full Address')->rows(2),
                        ]),
                ]),
        ])
            ->columns(1);
    }
}
