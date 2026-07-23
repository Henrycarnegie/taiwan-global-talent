import { usePage } from '@inertiajs/react';
import React from 'react';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import { useAuth } from '@/hooks/useAuth';
import HeaderLogo from '../../components/Student/HeaderLogo';
import Navbar from '../../components/Student/Navbar';

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const { user } = useAuth();
    const { url, props } = usePage() as any;

    // Ambil data shared course_categories dari prop autentikasi backend secara aman
    const categories = props.auth?.user?.course_categories ?? [];

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800 antialiased">
            {/* HEADER ATAS */}
            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-xs">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex flex-col items-center justify-between gap-4 py-4 md:h-20 md:flex-row md:py-0">
                        {/* 1. Sub-Komponen Logo & Nama User */}
                        <HeaderLogo userName={user?.name} />

                        {/* 2. Sub-Komponen Navigasi Utama */}
                        <Navbar currentUrl={url} categories={categories} />

                        {/* 3. Dropdown Edit Profil & Log Out */}
                        <div className="absolute top-4 right-4 md:static">
                            <ProfileDropdown user={user} />
                        </div>
                    </div>
                </div>
            </header>

            {/* AREA UTAMA INJEKSI KONTEN HALAMAN */}
            <main className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
