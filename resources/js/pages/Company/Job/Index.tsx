import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    Plus,
    Search,
    MapPin,
    Clock,
    Users,
    Eye,
    CheckCircle2,
    XCircle,
    FileEdit,
    Filter,
} from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import { useAuth } from '@/hooks/useAuth';

interface CompanyJob {
    id: number;
    title: string;
    slug: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    location_type: 'On-site' | 'Remote' | 'Hybrid';
    city?: string;
    salary_range?: string;
    status: 'published' | 'draft' | 'closed';
    applicants_count: number;
    views_count: number;
    created_at: string;
}

interface JobIndexProps {
    jobs?: CompanyJob[];
}

export default function JobIndex({ jobs = [] }: JobIndexProps) {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'published' | 'draft' | 'closed'
    >('all');

    // Filter Logic yang sudah diperbaiki
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || job.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: CompanyJob['status']) => {
        switch (status) {
            case 'published':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        <CheckCircle2 className="h-3 w-3" /> Published
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-500/20">
                        <Clock className="h-3 w-3" /> Draft
                    </span>
                );
            case 'closed':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20">
                        <XCircle className="h-3 w-3" /> Closed
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title="Job Postings - Company Portal" />

            <ProfileDropdown user={user} />

            <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Job Postings
                        </h1>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Kelola lowongan pekerjaan dan publikasikan ke
                            talenta terbaik.
                        </p>
                    </div>

                    <Link
                        href="/company/jobs/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-colors hover:bg-indigo-700"
                    >
                        <Plus className="h-4 w-4" /> Create New Job
                    </Link>
                </div>

                {/* Toolbar Search & Filter */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row dark:border-slate-800 dark:bg-slate-900">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari posisi pekerjaan..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
                        <Filter className="hidden h-4 w-4 text-slate-400 sm:block" />
                        {(['all', 'published', 'draft', 'closed'] as const).map(
                            (status) => (
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
                            ),
                        )}
                    </div>
                </div>

                {/* Container List Job */}
                {filteredJobs.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50">
                            <Briefcase className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                            Tidak ada lowongan ditemukan
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Mulai buat lowongan pekerjaan baru untuk menerima
                            lamaran kandidat.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                            {job.title}
                                        </h3>
                                        {getStatusBadge(job.status)}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {job.type}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {job.location_type}{' '}
                                            {job.city ? `(${job.city})` : ''}
                                        </span>
                                        {job.salary_range && (
                                            <>
                                                <span>•</span>
                                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                                    {job.salary_range}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-6 border-t border-slate-100 pt-3 sm:justify-end sm:border-t-0 sm:pt-0 dark:border-slate-800">
                                    <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                                        <div
                                            className="flex items-center gap-1.5"
                                            title="Total Pelamar"
                                        >
                                            <Users className="h-4 w-4 text-indigo-500" />
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                {job.applicants_count}
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center gap-1.5"
                                            title="Total Dilihat"
                                        >
                                            <Eye className="h-4 w-4 text-slate-400" />
                                            <span>{job.views_count}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/company/jobs/${job.id}/edit`}
                                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                                            title="Edit Lowongan"
                                        >
                                            <FileEdit className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
