<?php

namespace App\Providers\Filament;

use App\Models\CourseRoute;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationItem;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    private function getCourseDynamicMenu(): array
    {
        if (! Schema::hasTable('course_routes')) {
            return [];
        }

        // 1. HANYA simpan data Array mentah dari database ke dalam Cache
        $dynamicRoutesData = Cache::remember('dynamic_course_sidebar_data', now()->addDays(7), function () {
            return CourseRoute::where('is_active', true)
                ->orderBy('order')
                ->get(['title', 'slug', 'icon']) // Ambil kolom yang dibutuhkan saja
                ->toArray(); // 👈 Ubah menjadi array murni agar aman di-serialize
        });

        $menuItems = [];

        // 2. Gambar objek NavigationItem di luar Cache (Setiap request, tapi tanpa query DB)
        foreach ($dynamicRoutesData as $route) {
            $menuItems[] = NavigationItem::make($route['title'])
                ->icon($route['icon'] ?? 'heroicon-o-chevron-right')
                ->group('Course Navigator')
                ->url("/courses/c/{$route['slug']}");
        }

        return $menuItems;
    }

    public function panel(Panel $panel): Panel
    {
        return $panel

            ->default()
            ->id('admin')
            ->path('admin')
            // ->login()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\Filament\Clusters')
            ->navigationGroups([
                'Course Resource',
                'System',
            ])
            ->navigationItems($this->getCourseDynamicMenu())
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
