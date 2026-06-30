import { useState } from 'react';
import ProfileForm from '@/components/Form/ProfileForm';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import TabButton from '@/components/UI/TabButton';
import { useAuth } from '@/hooks/useAuth';
import Community from './Community/Index';
import MandarinCourse from './MandarinCourse/Index';
import DashboardOverview from './Overview/Index';

type DashboardTab = 'overview' | 'profile' | 'mandarin' | 'community';

export default function StudentDashboard({ profile }: any) {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* GLOBAL TOP NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Konten Utama */}
                    <div className="flex flex-col items-center justify-between gap-4 py-4 md:h-20 md:flex-row md:py-0">
                        {/* Bagian Logo dan Identitas */}
                        <div className="flex w-full items-center gap-3 md:w-auto">
                            <div className="shrink-0 rounded-lg bg-blue-600 p-2 text-lg font-bold tracking-wider text-white shadow-sm">
                                TW
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    {user.name}
                                </p>
                                <h1 className="text-base leading-tight font-bold text-gray-900 sm:text-lg">
                                    Talent Platform
                                </h1>
                                <p className="text-[10px] font-medium text-gray-500 sm:text-xs">
                                    臺灣數位人才 Net
                                </p>
                            </div>
                        </div>

                        {/* Reusable Tab Navigation */}
                        {/* Menggunakan overflow-x-auto agar di mobile bisa di-swipe ke samping jika menunya panjang */}
                        <nav className="no-scrollbar flex w-full items-center justify-start space-x-2 pb-2 md:h-full md:w-auto md:justify-center md:pt-2 md:pb-0">
                            <TabButton
                                label="Overview"
                                subLabel="概覽"
                                isActive={activeTab === 'overview'}
                                onClick={() => setActiveTab('overview')}
                            />
                            <TabButton
                                label="Mandarin Courses"
                                subLabel="華語課程"
                                isActive={activeTab === 'mandarin'}
                                onClick={() => setActiveTab('mandarin')}
                            />
                            <TabButton
                                label="Community"
                                subLabel="社群"
                                isActive={activeTab === 'community'}
                                onClick={() => setActiveTab('community')}
                            />
                            <TabButton
                                label="Complete Profile"
                                subLabel="完善檔案"
                                isActive={activeTab === 'profile'}
                                onClick={() => setActiveTab('profile')}
                            />
                        </nav>

                        {/* Info Akun / Avatar */}
                        {/* Di mobile, diletakkan di pojok kanan atas memanfaatkan posisi absolute atau disesuaikan tata letaknya */}
                        <div className="absolute top-4 right-4 shrink-0 md:static">
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>

            {/* VIEWPORT AREA */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {activeTab === 'overview' && (
                    <DashboardOverview
                        onNavigateToCommunity={() => setActiveTab('community')}
                    />
                )}

                {activeTab === 'profile' && (
                    <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                Complete Your Profile
                            </h2>
                            <p className="text-sm text-gray-500">
                                Data ini akan langsung diajukan ke sistem kurasi
                                mitra industri Taiwan.
                            </p>
                        </div>
                        <ProfileForm profile={profile} />
                    </div>
                )}

                {/* Memanggil Komponen Halaman Mandarin */}
                {activeTab === 'mandarin' && <MandarinCourse />}

                {/* Memanggil Komponen Halaman Community */}
                {activeTab === 'community' && <Community />}
            </main>
        </div>
    );
}
