import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ProfileForm from '@/components/Form/ProfileForm';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import TabButton from '@/components/UI/TabButton';
import Community from './Community/Index';
import MandarinCourse from './MandarinCourse/Index';
import DashboardOverview from './Overview/Index';

type DashboardTab = 'overview' | 'profile' | 'mandarin' | 'community';
interface AuthUser {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

export default function StudentDashboard({ profile }: any) {
    const { auth } = usePage().props as unknown as {
        auth: {
            user: AuthUser;
        };
    };

    console.log(auth.user.name);
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* GLOBAL TOP NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-600 p-2 text-lg font-bold tracking-wider text-white shadow-sm">
                                TW
                            </div>
                            <div>
                                {/* Use optional chaining here */}
                                <p>{auth?.user?.name || 'Guest'}</p>
                                <h1 className="text-lg leading-tight font-bold text-gray-900">
                                    Talent Platform
                                </h1>
                                <p className="text-xs font-medium text-gray-500">
                                    臺灣數位人才 Net
                                </p>
                            </div>
                        </div>

                        {/* Reusable Tab Navigation */}
                        <nav className="flex h-full space-x-1 pt-2 sm:space-x-4">
                            <TabButton
                                label="Overview"
                                subLabel="概覽"
                                isActive={activeTab === 'overview'}
                                onClick={() => setActiveTab('overview')}
                            />
                            <TabButton
                                label="Complete Profile"
                                subLabel="完善檔案"
                                isActive={activeTab === 'profile'}
                                onClick={() => setActiveTab('profile')}
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
                        </nav>

                        {/* Info Akun / Avatar */}
                        <ProfileDropdown
                            profile={profile}
                            onLogout={() => {
                                router.post('/logout');
                            }}
                            onProfileUpdate={(updatedData) => {
                                router.put('/student/profile', updatedData, {
                                    onSuccess: () => {
                                        // Hanya pindah ke overview jika validasi backend sukses & data tersimpan
                                        setActiveTab('overview');
                                    },
                                    onError: (errors) => {
                                        console.error(
                                            'Gagal menyimpan profil:',
                                            errors,
                                        );
                                    },
                                });
                            }}
                        />
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
