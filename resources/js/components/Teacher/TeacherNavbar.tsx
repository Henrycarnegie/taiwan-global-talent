import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Languages,
    Layers,
    Users,
    Bell,
    LogOut,
    ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import type { Teacher } from '@/types/teacher/type';

export default function TeacherNavbar({ teacher }: { teacher: Teacher }) {
    const { url } = usePage();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isActive = (path: string) => url.startsWith(path);

    return (
        <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    {/* Left Brand & Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/teacher/dashboard"
                            className="flex items-center gap-2"
                        >
                            <div className="rounded-xl bg-indigo-600 p-2 text-lg font-bold text-white">
                                EDU
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                                Course Studio
                            </span>
                        </Link>

                        <div className="hidden space-x-2 md:flex">
                            <Link
                                href="/teacher/dashboard"
                                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                                    isActive('/teacher/dashboard') &&
                                    !url.includes('category=')
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <BookOpen className="h-4 w-4" /> All Courses
                            </Link>
                            <Link
                                href="/teacher/dashboard?category=mandarin"
                                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                                    url.includes('category=mandarin')
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Languages className="h-4 w-4" /> Mandarin
                                Course
                            </Link>
                            <Link
                                href="/teacher/dashboard?category=others"
                                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                                    url.includes('category=others')
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Layers className="h-4 w-4" /> Others Course
                            </Link>
                            <Link
                                href="/community"
                                className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                            >
                                <Users className="h-4 w-4" /> Community
                            </Link>
                        </div>
                    </div>

                    {/* Right User Controls */}
                    <div className="flex items-center gap-3">
                        <button className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700">
                            <Bell className="h-5 w-5" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                                    {teacher.name.charAt(0)}
                                </div>
                                <div className="hidden text-left sm:block">
                                    <p className="text-xs leading-none font-bold text-gray-800">
                                        {teacher.name}
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-gray-500">
                                        Content Creator
                                    </p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl">
                                    <div className="border-b border-gray-100 px-4 py-2">
                                        <p className="text-xs font-semibold text-gray-800">
                                            {teacher.name}
                                        </p>
                                        <p className="truncate text-[11px] text-gray-500">
                                            {teacher.email}
                                        </p>
                                    </div>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <LogOut className="h-3.5 w-3.5" /> Log
                                        Out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
