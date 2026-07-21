import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import CompanyNavbar from '../Components/CompanyNavbar';

export default function EditJob({ company, job }: { company: any; job: any }) {
    const { data, setData, put, processing, errors } = useForm({
        title: job.title || '',
        type: job.type || 'Full-time',
        location_type: job.location_type || 'On-site',
        city: job.city || '',
        salary_range: job.salary_range || '',
        description: job.description || '',
        requirements: job.requirements || '',
        status: job.status || 'published',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/company/jobs/${job.id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title={`Edit - ${job.title}`} />
            <CompanyNavbar company={company} />

            <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/company/jobs"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 mb-6"
                >
                    <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Lowongan
                </Link>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                    <div className="mb-6 border-b border-slate-100 pb-4 dark:border-slate-800">
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Edit Lowongan Pekerjaan
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Judul Posisi *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            />
                            {errors.title && <span className="text-xs text-rose-500">{errors.title}</span>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Tipe Pekerjaan
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value as any)}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Sistem Kerja
                                </label>
                                <select
                                    value={data.location_type}
                                    onChange={(e) => setData('location_type', e.target.value as any)}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                >
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {data.location_type !== 'Remote' && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                        Kota Penempatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Kisaran Gaji
                                </label>
                                <input
                                    type="text"
                                    value={data.salary_range}
                                    onChange={(e) => setData('salary_range', e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Deskripsi Pekerjaan
                            </label>
                            <textarea
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Persyaratan
                            </label>
                            <textarea
                                rows={4}
                                value={data.requirements}
                                onChange={(e) => setData('requirements', e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Status Lowongan
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as any)}
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                            <Link
                                href="/company/jobs"
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Perbarui Lowongan
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}