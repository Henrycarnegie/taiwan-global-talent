import { Link, usePage } from '@inertiajs/react';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import { useAuth } from '@/hooks/useAuth';

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const { user } = useAuth();
    const { url } = usePage(); // Mendeteksi halaman aktif untuk styling tombol

    const navClass = (path: string) => {
        const isActive = url.startsWith(path);
        
        return `px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
            isActive 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans antialiased text-gray-800">
            {/* STICKY NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-xs">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 py-4 md:h-20 md:flex-row md:py-0">
                        
                        {/* Identity */}
                        <div className="flex w-full items-center gap-3 md:w-auto">
                            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                                TW
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-gray-900 tracking-tight">{user?.name}</h1>
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Talent Net Platform</p>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="no-scrollbar flex w-full items-center justify-start gap-1 overflow-x-auto pb-2 md:h-full md:w-auto md:justify-center md:pb-0">
                            <Link href="/student/dashboard" className={navClass('/student/dashboard')}>
                                Overview <span className="text-[10px] block md:inline md:ml-1 font-normal opacity-80">概覽</span>
                            </Link>
                            <Link href="/mandarin-courses" className={navClass('/mandarin-courses')}>
                                Mandarin Courses <span className="text-[10px] block md:inline md:ml-1 font-normal opacity-80">華語課程</span>
                            </Link>
                            <Link href="/student/community" className={navClass('/student/community')}>
                                Community <span className="text-[10px] block md:inline md:ml-1 font-normal opacity-80">社群</span>
                            </Link>
                        </nav>

                        {/* Profile Dropdown */}
                        <div className="absolute top-4 right-4 shrink-0 md:static">
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT SPACE */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
                {children}
            </main>
        </div>
    );
}