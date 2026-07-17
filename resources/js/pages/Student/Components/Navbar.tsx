import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CourseCategory {
    id: number;
    name: string;
    slug: string;
}

interface NavbarProps {
    currentUrl: string;
    categories: CourseCategory[];
}

export default function Navbar({ currentUrl, categories }: NavbarProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isInsideCourse = currentUrl.startsWith('/student/courses');

    // Menangani klik di luar dropdown untuk menutup menu kategori kursus
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helper penentu styling menu aktif/tidak aktif
    const getNavClass = (path: string) => {
        const active = currentUrl.startsWith(path);
        
        return `rounded-xl px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
            active
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`;
    };

    return (
        <div className="flex w-full justify-start md:w-auto md:justify-center">
            <nav className="flex items-center gap-2">
                {/* Link Dashboard / Overview */}
                <Link
                    href="/student/dashboard"
                    className={getNavClass('/student/dashboard')}
                >
                    Overview{' '}
                    <span className="ml-1 text-[10px] font-normal opacity-80">
                        概覽
                    </span>
                </Link>

                {/* Dropdown Menu Kategori Kursus */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none ${
                            isInsideCourse
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        Courses{' '}
                        <span className="text-[10px] opacity-80">課程</span>
                        <ChevronDown
                            size={15}
                            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                            {categories.length > 0 ? (
                                categories.map((category) => {
                                    const href = `/student/courses/${category.slug}`;
                                    const active = currentUrl.startsWith(href);

                                    return (
                                        <Link
                                            key={category.id}
                                            href={href}
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                            className={`block rounded-xl px-4 py-3 text-sm transition ${
                                                active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="font-medium">
                                                {category.name}
                                            </div>
                                            {category.id === 1 && (
                                                <div
                                                    className={`text-xs ${active ? 'text-blue-100' : 'text-gray-400'}`}
                                                >
                                                    華語課程
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="px-4 py-3 text-center text-sm text-gray-400">
                                    No categories available
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Link Halaman Komunitas (LinkedIn Feed) */}
                <Link
                    href="/student/community"
                    className={getNavClass('/student/community')}
                >
                    Community{' '}
                    <span className="ml-1 text-[10px] font-normal opacity-80">
                        社群
                    </span>
                </Link>
            </nav>
        </div>
    );
}
