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
        // 1. Get all categories from the database.
        $categories = CourseCategory::all();
        $navigationItems = [];

        foreach ($categories as $category) {
            // 2. Choose an icon: language for Mandarin, academic cap for others.
            $icon = $category->id === 1 ? 'heroicon-o-language' : 'heroicon-o-academic-cap';

            // 3. Put Mandarin at the top level and other categories in a group.
            $group = $category->id === 1 ? null : 'Others Course';

            // 4. Register the menu item in the Filament sidebar.
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

        // 1. Check whether this is a global route instead of an edit/detail route.
        // If the URL contains a record ID, skip the category filter.
        if (request()->route('record') || request()->segment(3) === 'create') {
            return $query;
        }

        // 2. Get the sidebar parameter (?category=X).
        $categoryId = request()->query('category');

        if ($categoryId) {
            return $query->where('category_id', $categoryId);
        }

        // Default to Mandarin (ID: 1) when the admin first opens the dashboard.
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
            LessonsRelationManager::class,
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
