import { Link, router } from '@inertiajs/react';
import {
    Award,
    ExternalLink,
    LogOut,
    User as UserIcon,
    ChevronDown,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { route } from 'ziggy-js';

interface UnifiedUserDropdownProps {
    user: any;
    company?: any;
    isCompanySide?: boolean;
}

export default function ProfileDropdown({
    user,
    company,
    isCompanySide = false,
}: UnifiedUserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const roleMapping: Record<number, string> = {
        1: 'Admin',
        2: 'Teacher',
        3: 'Student',
    };

    const role =
        user?.role_name ||
        roleMapping[user?.role as unknown as number] ||
        'Student';

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* TRIGGER BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl p-1 text-left transition duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-100 text-xs font-bold text-blue-600 dark:bg-slate-700 dark:text-blue-300">
                    {company?.logo_url ? (
                        <img
                            src={company.logo_url}
                            alt="Logo"
                            className="h-full w-full object-cover"
                        />
                    ) : user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        user?.name?.charAt(0)?.toUpperCase() || 'U'
                    )}
                </div>

                <div className="hidden max-w-32 text-left md:block">
                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {company?.company_display_name || user?.name}
                    </p>
                    <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
                        {role}
                    </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* POPUP DROPDOWN */}
            {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-200 dark:border-slate-800 dark:bg-slate-900">
                    {/* User Header Info */}
                    <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
                        <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                            {company?.company_display_name || user?.name}
                        </p>
                        <p className="truncate text-[11px] text-slate-400">
                            {user?.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="mt-1 space-y-0.5">
                        <Link
                            href="/student/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                            <span>My Profile</span>
                        </Link>

                        {!isCompanySide && (
                            <Link
                                href={route(
                                    'student.courses.certificate.index',
                                )}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <Award className="h-3.5 w-3.5 text-slate-400" />
                                <span>Certificates</span>
                            </Link>
                        )}

                        {company?.slug && (
                            <a
                                href={`/company/${company.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                                <span>Public Page</span>
                            </a>
                        )}
                    </div>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                    {/* Logout Button */}
                    <button
                        onClick={() => router.post('/logout')}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Log Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
