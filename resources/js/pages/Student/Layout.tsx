import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    ChevronDown,
    Home,
    Menu,
    MessageCircle,
    ShieldCheck,
    UserRoundCheck,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import { useAuth } from '@/hooks/useAuth';
import HeaderLogo from './Components/HeaderLogo';
import Navbar from './Components/Navbar';

interface Props {
    children: React.ReactNode;
}

interface CourseCategory {
    id: number;
    name: string;
    slug: string;
}

const navigationItems = [
    {
        label: 'Overview',
        href: '/student/dashboard',
        match: '/student/dashboard',
        icon: Home,
        helper: 'Progress and next actions',
    },
    {
        label: 'Community',
        href: '/student/community',
        match: '/student/community',
        icon: MessageCircle,
        helper: 'Questions and peer support',
    },
];

export default function Layout({ children }: Props) {
    const { user } = useAuth();
    const { url, props } = usePage() as any;

    const categories: CourseCategory[] =
        props.auth?.user?.course_categories ?? [];

    const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const courseMenuRef = useRef<HTMLDivElement>(null);
    const isInsideCourse = url.startsWith('/student/courses');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                courseMenuRef.current &&
                !courseMenuRef.current.contains(event.target as Node)
            ) {
                setIsCourseMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsCourseMenuOpen(false);
    }, [url]);

    const navClass = (path: string) => {
        const active = url.startsWith(path);

        return `flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none ${
            active
                ? 'bg-[#173b8f] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#173b8f]'
        }`;
    };

    return (
        <div className="min-h-screen bg-[#f7f3ea] font-sans text-slate-900 antialiased">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#173b8f] focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
            >
                Skip to main content
            </a>

            <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex min-h-20 items-center justify-between gap-3">
                        <Link
                            href="/student/dashboard"
                            className="flex min-w-0 items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#173b8f] text-sm font-black text-white">
                                TGT
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-black text-[#173b8f] sm:text-base">
                                    Taiwan Global Talent
                                </p>
                                <p className="truncate text-xs font-semibold text-slate-500">
                                    Hi {user?.name}, continue your pathway
                                </p>
                            </div>
                        </Link>

                        <nav
                            aria-label="Primary navigation"
                            className="hidden items-center gap-2 lg:flex"
                        >
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={navClass(item.match)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}

                            <div className="relative" ref={courseMenuRef}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsCourseMenuOpen((prev) => !prev)
                                    }
                                    aria-expanded={isCourseMenuOpen}
                                    className={`flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none ${
                                        isInsideCourse
                                            ? 'bg-[#173b8f] text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-[#173b8f]'
                                    }`}
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Courses
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                            isCourseMenuOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {isCourseMenuOpen && (
                                    <div className="absolute top-full left-0 z-50 mt-3 w-72 rounded-md border border-slate-200 bg-white p-2 shadow-2xl">
                                        {categories.length > 0 ? (
                                            categories.map((category) => {
                                                const href = `/student/courses/${category.slug}`;
                                                const active =
                                                    url.startsWith(href);

                                                return (
                                                    <Link
                                                        key={category.id}
                                                        href={href}
                                                        className={`block rounded-md px-4 py-3 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none ${
                                                            active
                                                                ? 'bg-[#173b8f] text-white'
                                                                : 'text-slate-700 hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        {category.name}
                                                        <span
                                                            className={`mt-1 block text-xs font-semibold ${
                                                                active
                                                                    ? 'text-white/70'
                                                                    : 'text-slate-500'
                                                            }`}
                                                        >
                                                            Goal-based learning
                                                            pathway
                                                        </span>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-slate-500">
                                                No course categories available
                                                yet.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </nav>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Notifications"
                                className="hidden h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-[#173b8f]/30 hover:text-[#173b8f] focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none sm:flex"
                            >
                                <Bell className="h-5 w-5" />
                            </button>
                            <ProfileDropdown />
                            <button
                                type="button"
                                onClick={() =>
                                    setIsMobileMenuOpen((prev) => !prev)
                                }
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Open navigation menu"
                                className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none lg:hidden"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                    </div>

                    {isMobileMenuOpen && (
                        <div className="border-t border-slate-200 py-4 lg:hidden">
                            <nav
                                aria-label="Mobile navigation"
                                className="grid gap-2"
                            >
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={navClass(item.match)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>
                                            {item.label}
                                            <span className="block text-xs font-semibold opacity-70">
                                                {item.helper}
                                            </span>
                                        </span>
                                    </Link>
                                ))}

                                <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
                                    <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black tracking-widest text-slate-500 uppercase">
                                        <BookOpen className="h-4 w-4" />
                                        Course pathways
                                    </div>
                                    <div className="grid gap-1">
                                        {categories.length > 0 ? (
                                            categories.map((category) => {
                                                const href = `/student/courses/${category.slug}`;
                                                const active =
                                                    url.startsWith(href);

                                                return (
                                                    <Link
                                                        key={category.id}
                                                        href={href}
                                                        className={`rounded-md px-3 py-3 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none ${
                                                            active
                                                                ? 'bg-[#173b8f] text-white'
                                                                : 'text-slate-700 hover:bg-white'
                                                        }`}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <p className="px-3 py-2 text-sm text-slate-500">
                                                No categories available yet.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <main
                id="main-content"
                className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
            >
                <section className="mb-6 grid gap-3 rounded-md border border-[#173b8f]/10 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
                    <div className="flex gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f47b20]/12 text-[#f47b20]">
                            <UserRoundCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-base font-black text-[#173b8f]">
                                Your personalized talent workspace
                            </h1>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Recommendations are organized around your goals,
                                pathway progress, and role instead of age.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                        <ShieldCheck className="h-4 w-4 text-[#28a6a1]" />
                        Profile data is used for matching and account services.
                    </div>
                </section>

                {children}
            </main>
        </div>
    );
}