import { Head } from '@inertiajs/react';
import {
    Users,
    Search,
    Filter,
    Briefcase,
    Mail,
    Phone,
    FileText,
    ExternalLink,
    CheckCircle2,
    XCircle,
    Clock,
    UserCheck,
    Calendar,
} from 'lucide-react';
import { useState } from 'react';
import CompanyNavbar from '../../../components/Company/CompanyNavbar';

interface Applicant {
    id: number;
    job_title: string;
    job_id: number;
    candidate_name: string;
    candidate_email: string;
    candidate_phone?: string;
    candidate_avatar?: string;
    resume_url: string; // Directly Cloudflare R2 Full URL
    applied_at: string;
    status: 'pending' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
}

interface ApplicantIndexProps {
    company: any;
    applicants?: Applicant[];
}

export default function ApplicantIndex({
    company,
    applicants = [],
}: ApplicantIndexProps) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredApplicants = applicants.filter((app) => {
        const matchesSearch =
            app.candidate_name.toLowerCase().includes(search.toLowerCase()) ||
            app.job_title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || app.status === statusFilter;

        return {
            matchesSearch,
            matchesStatus,
        };
    });

    const getStatusBadge = (status: Applicant['status']) => {
        switch (status) {
            case 'hired':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        <UserCheck className="h-3 w-3" /> Hired
                    </span>
                );
            case 'interviewed':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-600/20">
                        <Calendar className="h-3 w-3" /> Interviewed
                    </span>
                );
            case 'reviewed':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-600/20">
                        <CheckCircle2 className="h-3 w-3" /> Reviewed
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20">
                        <XCircle className="h-3 w-3" /> Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
                        <Clock className="h-3 w-3" /> Pending
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title="Applicants - Company Portal" />
            <CompanyNavbar company={company} />

            <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Applicants & Candidates
                    </h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Review resumes, track candidate status, and hire top
                        talents.
                    </p>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row dark:border-slate-800 dark:bg-slate-900">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search candidate name or position..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
                        <Filter className="hidden h-4 w-4 text-slate-400 sm:block" />
                        {(
                            [
                                'all',
                                'pending',
                                'reviewed',
                                'interviewed',
                                'hired',
                                'rejected',
                            ] as const
                        ).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                                    statusFilter === status
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Applicant List */}
                {filteredApplicants.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50">
                            <Users className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                            No applicants found
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            There are currently no job applications matching
                            your filter criteria.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredApplicants.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-slate-50/50 lg:flex-row lg:items-center dark:hover:bg-slate-800/30"
                                >
                                    {/* Candidate Profile */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-indigo-100 font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                                            {app.candidate_avatar ? (
                                                <img
                                                    src={app.candidate_avatar}
                                                    alt={app.candidate_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                app.candidate_name.charAt(0)
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                                    {app.candidate_name}
                                                </h3>
                                                {getStatusBadge(app.status)}
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                                <Briefcase className="h-3.5 w-3.5" />
                                                <span>
                                                    Applied for: {app.job_title}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500 dark:text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="h-3.5 w-3.5" />{' '}
                                                    {app.candidate_email}
                                                </span>
                                                {app.candidate_phone && (
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="h-3.5 w-3.5" />{' '}
                                                        {app.candidate_phone}
                                                    </span>
                                                )}
                                                <span>
                                                    Applied{' '}
                                                    {new Date(
                                                        app.applied_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0 dark:border-slate-800">
                                        <a
                                            href={app.resume_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <FileText className="h-4 w-4 text-indigo-500" />
                                            <span>View Resume</span>
                                            <ExternalLink className="h-3 w-3 text-slate-400" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
