<?php

namespace App\Filament\Widgets;

use App\Models\CompanyJob;
use App\Models\CommunityPost;
use App\Models\CompanyProfile;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Pengguna', User::count())
                ->description('Siswa, Pengajar, & Admin')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Stat::make('Postingan Komunitas', CommunityPost::count())
                ->description('Aktivitas Feed Terkini')
                ->color('info'),

            Stat::make('Perusahaan Pending', CompanyProfile::where('status', 'pending')->count())
                ->description('Butuh Verifikasi Admin')
                ->color('warning'),

            Stat::make('Lowongan Aktif', CompanyJob::where('status', 'published')->count())
                ->description('Peluang Kerja Terbuka')
                ->color('primary'),
        ];
    }
}