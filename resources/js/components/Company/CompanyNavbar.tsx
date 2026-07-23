import { Link, usePage } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import CompanyStatusBadge from './CompanyStatusBadge';
import type { NotificationItem } from './NotificationDropdown';
import NotificationDropdown from './NotificationDropdown';
import UserMenuDropdown from './UserMenuDropdown';

interface CompanyNavbarProps {
    company: any;
    notifications?: NotificationItem[];
}

export default function CompanyNavbar({
    company,
    notifications,
}: CompanyNavbarProps) {
    const { url } = usePage() as any;
    const { user } = useAuth();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const getNavClass = (path: string) => {
        const active = url.startsWith(path);

        return `rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${
            active
                ? 'bg-blue-600 hover:bg-blue-600/80 text-white shadow-xs'
                : 'hover:bg-slate-100 hover:text-slate-900'
        }`;
    };

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand & Nav Links */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/company/dashboard"
                        className="flex items-center gap-2.5"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                            Company Portal
                        </span>
                    </Link>

                    {company && (
                        <nav className="hidden items-center gap-1 md:flex">
                            <Link
                                href="/company/dashboard"
                                className={getNavClass('/company/dashboard')}
                            >
                                Overview
                            </Link>
                            <Link
                                href="/company/jobs"
                                className={getNavClass('/company/jobs')}
                            >
                                Job Postings
                            </Link>
                            <Link
                                href="/company/applicants"
                                className={getNavClass('/company/applicants')}
                            >
                                Applicants
                            </Link>
                            <Link
                                href="/company/community"
                                className={getNavClass('/company/community')}
                            >
                                Community
                            </Link>
                        </nav>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {company && <CompanyStatusBadge status={company.status} />}

                    <NotificationDropdown
                        isOpen={notifOpen}
                        initialNotifications={notifications}
                        onToggle={() => {
                            setNotifOpen(!notifOpen);
                            setDropdownOpen(false);
                        }}
                    />

                    <UserMenuDropdown
                        user={user}
                        company={company}
                        isOpen={dropdownOpen}
                        onToggle={() => {
                            setDropdownOpen(!dropdownOpen);
                            setNotifOpen(false);
                        }}
                    />
                </div>
            </div>
        </header>
    );
}
