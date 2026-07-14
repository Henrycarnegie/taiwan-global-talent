import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import { useAuth } from '@/hooks/useAuth';

interface Props {
    children: React.ReactNode;
}

interface CourseCategory {
    id: number;
    name: string;
    slug: string;
}

export default function Layout({ children }: Props) {
    const { user } = useAuth();

    const { url, props } = usePage() as any;

    const categories: CourseCategory[] =
        props.auth?.user?.course_categories ?? [];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const isInsideCourse = url.startsWith('/student/courses');

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

    const navClass = (path: string) => {
        const active = url.startsWith(path);

        return `rounded-xl px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
            active
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800">
            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-xs">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 py-4 md:h-20 md:flex-row md:py-0">
                        {/* Logo */}
                        <div className="flex w-full items-center gap-3 md:w-auto">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                                TW
                            </div>

                            <div>
                                <h1 className="text-base font-bold">
                                    {user?.name}
                                </h1>

                                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                                    Talent Net Platform
                                </p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex w-full justify-start md:w-auto md:justify-center">
                            <nav className="flex items-center gap-2">
                                {/* Overview */}
                                <Link
                                    href="/student/dashboard"
                                    className={navClass('/student/dashboard')}
                                >
                                    Overview
                                    <span className="ml-1 text-[10px] font-normal opacity-80">
                                        概覽
                                    </span>
                                </Link>

                                {/* Courses */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsDropdownOpen((prev) => !prev)
                                        }
                                        className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                            isInsideCourse
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        Courses
                                        <span className="text-[10px] opacity-80">
                                            課程
                                        </span>
                                        <ChevronDown
                                            size={15}
                                            className={`transition-transform ${
                                                isDropdownOpen
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 z-9999 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                                            {categories.length > 0 ? (
                                                categories.map((category) => {
                                                    const href = `/student/courses/${category.slug}`;

                                                    const active =
                                                        url.startsWith(href);

                                                    return (
                                                        <Link
                                                            key={category.id}
                                                            href={href}
                                                            onClick={() =>
                                                                setIsDropdownOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className={`block rounded-xl px-4 py-3 text-sm transition ${
                                                                active
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            <div>
                                                                {category.name}
                                                            </div>

                                                            {category.id ===
                                                                1 && (
                                                                <div
                                                                    className={`text-xs ${
                                                                        active
                                                                            ? 'text-blue-100'
                                                                            : 'text-gray-400'
                                                                    }`}
                                                                >
                                                                    華語課程
                                                                </div>
                                                            )}
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <div className="px-4 py-3 text-sm text-gray-400">
                                                    No categories available
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Community */}
                                <Link
                                    href="/student/community"
                                    className={navClass('/student/community')}
                                >
                                    Community
                                    <span className="ml-1 text-[10px] font-normal opacity-80">
                                        社群
                                    </span>
                                </Link>
                            </nav>
                        </div>

                        {/* Profile */}
                        <div className="absolute top-4 right-4 md:static">
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
