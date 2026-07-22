import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Briefcase,
    Building2,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface StudentJobIndexProps {
    jobs: {
        data: any[];
        links: any[];
    };
    filters: {
        search?: string;
        type?: string;
        location_type?: string;
    };
}

export default function StudentJobIndex({
    jobs,
    filters,
}: StudentJobIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || 'all');
    const [locationType, setLocationType] = useState(
        filters.location_type || 'all',
    );

    const handleFilter = () => {
        router.get(
            '/student/jobs',
            { search, type, location_type: locationType },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title="Eksplorasi Karir & Lowongan Kerja" />

            <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Eksplorasi Lowongan Pekerjaan
                    </h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Temukan peluang karir terbaik dari perusahaan mitra
                        terpercaya.
                    </p>
                </div>

                {/* Filter Toolbar */}
                <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-5 dark:border-slate-800 dark:bg-slate-900">
                    {/* Input Pencarian */}
                    <div className="relative sm:col-span-2">
                        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleFilter()
                            }
                            placeholder="Cari posisi atau kata kunci..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                    </div>

                    {/* Filter Tipe Pekerjaan */}
                    <select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            router.get(
                                '/student/jobs',
                                {
                                    search,
                                    type: e.target.value,
                                    location_type: locationType,
                                },
                                { preserveState: true, replace: true },
                            );
                        }}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                        <option value="all">Semua Tipe Pekerjaan</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>

                    {/* Filter Sistem Kerja / Location Type */}
                    <select
                        value={locationType}
                        onChange={(e) => {
                            setLocationType(e.target.value);
                            router.get(
                                '/student/jobs',
                                { search, type, location_type: e.target.value },
                                { preserveState: true, replace: true },
                            );
                        }}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                        <option value="all">Semua Sistem Kerja</option>
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    {/* Tombol Cari */}
                    <button
                        onClick={handleFilter}
                        className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
                    >
                        Terapkan
                    </button>
                </div>

                {/* Daftar Pekerjaan */}
                <div className="space-y-4">
                    {jobs.data.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                            <Briefcase className="mx-auto h-8 w-8 text-slate-400" />
                            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                Lowongan tidak ditemukan
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Coba sesuaikan kata kunci atau filter pencarian
                                Anda.
                            </p>
                        </div>
                    ) : (
                        jobs.data.map((job) => (
                            <Link
                                key={job.id}
                                href={`/student/jobs/${job.slug}`}
                                className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                                        <span>
                                            {job.company_profile
                                                ?.company_name ||
                                                'Perusahaan Mitra'}
                                        </span>
                                    </div>

                                    <h2 className="text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                        {job.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium dark:bg-slate-800">
                                            {job.type}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />{' '}
                                            {job.location_type}{' '}
                                            {job.city ? `(${job.city})` : ''}
                                        </span>
                                        {job.salary_range && (
                                            <>
                                                <span>•</span>
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                                    {job.salary_range}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    Lihat Detail{' '}
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
