import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    Bell,
    LogOut,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronDown,
    ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface CompanyNavbarProps {
    company: any;
}

export default function CompanyNavbar({ company }: CompanyNavbarProps) {
    const { url } = usePage() as any;
    const { user } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getNavClass = (path: string) => {
        const active = url.startsWith(path);

        return `rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${
            active
                ? 'bg-blue-600 hover:bg-blue-600/80 text-white shadow-xs'
                : 'hover:bg-slate-100 hover:text-slate-900'
        }`;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-600/20 ring-inset">
                        <XCircle className="h-3.5 w-3.5" /> Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-600/20 ring-inset">
                        <Clock className="h-3.5 w-3.5" /> Pending Review
                    </span>
                );
        }
    };

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand & Left Navigation */}
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

                {/* Right Quick Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {company && getStatusBadge(company.status)}

                    {/* Notification Button */}
                    <button
                        type="button"
                        className="relative rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
                    </button>

                    {/* User Menu Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 p-1.5 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                        >
                            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                                {company?.logo_url ? (
                                    <img
                                        src={company.logo_url}
                                        alt="Logo"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user?.name?.charAt(0) || 'C'
                                )}
                            </div>
                            <span className="hidden text-xs font-semibold text-slate-700 sm:inline-block dark:text-slate-200">
                                {company?.company_display_name || user?.name}
                            </span>
                            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                                        {user?.name}
                                    </p>
                                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="p-1">
                                    {company?.slug && (
                                        <a
                                            href={`/company/${company.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />{' '}
                                            View Public Page
                                        </a>
                                    )}
                                    <Link
                                        method="post"
                                        href="/logout"
                                        as="button"
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />{' '}
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
