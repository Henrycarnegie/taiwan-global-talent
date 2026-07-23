import { Link } from '@inertiajs/react';
import { ChevronDown, ExternalLink, LogOut } from 'lucide-react';

interface UserMenuDropdownProps {
    user: any;
    company: any;
    isOpen: boolean;
    onToggle: () => void;
}

export default function UserMenuDropdown({
    user,
    company,
    isOpen,
    onToggle,
}: UserMenuDropdownProps) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
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

            {isOpen && (
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
                                <ExternalLink className="h-3.5 w-3.5" /> View Public Page
                            </a>
                        )}
                        <Link
                            method="post"
                            href="/logout"
                            as="button"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                        >
                            <LogOut className="h-3.5 w-3.5" /> Logout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}