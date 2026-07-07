<?php

namespace App\Filament\Resources\Courses;

use App\Filament\Resources\Courses\Pages\CreateCourse;
use App\Filament\Resources\Courses\Pages\EditCourse;
use App\Filament\Resources\Courses\Pages\ListCourses;
use App\Filament\Resources\Courses\RelationManagers\LessonsRelationManager;
use App\Filament\Resources\Courses\Schemas\CourseForm;
use App\Filament\Resources\Courses\Tables\CoursesTable;
use App\Models\Course;
use App\Models\CourseCategory;
use BackedEnum;
use Filament\Navigation\NavigationItem;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function getNavigationItems(): array
    {
        // 1. Ambil semua kategori dari database
        $categories = CourseCategory::all();
        $navigationItems = [];

        foreach ($categories as $category) {
            // 2. Tentukan icon (Mandarin pakai icon bahasa, sisanya pakai icon sekolah/umum)
            $icon = $category->id === 1 ? 'heroicon-o-language' : 'heroicon-o-academic-cap';

            // 3. Tentukan Group (Mandarin ditaruh di luar/utama, sisanya masuk grup 'Kursus Lainnya')
            $group = $category->id === 1 ? null : 'Others Course';

            // 4. Daftarkan menu ke sidebar Filament
            $navigationItems[] = NavigationItem::make($category->name)
                ->group($group)
                ->icon($icon)
                ->isActiveWhen(fn () => request()->query('category') == $category->id)
                ->url(static::getUrl('index', ['category' => $category->id]));
        }

        return $navigationItems;
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        // 1. Cek apakah ini rute global/bukan rute spesifik halaman edit/detail
        // Jika URL mengandung segmen angka (ID Record seperti /courses/2/edit), lewati filter kategori
        if (request()->route('record') || request()->segment(3) === 'create') {
            return $query;
        }

        // 2. Ambil parameter dari sidebar (?category=X)
        $categoryId = request()->query('category');

        if ($categoryId) {
            return $query->where('category_id', $categoryId);
        }

        // Default jika admin akses dashboard pertama kali, arahkan ke Mandarin (ID: 1)
        return $query->where('category_id', 1);
    }

    public static function form(Schema $schema): Schema
    {
        return CourseForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CoursesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            LessonsRelationManager::class, // <-- Tambahkan ini
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCourses::route('/'),
            'create' => CreateCourse::route('/create'),
            'edit' => EditCourse::route('/{record}/edit'),
        ];
    }
}
