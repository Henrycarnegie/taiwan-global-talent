import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import CompanyNavbar from '../Components/CompanyNavbar';

export default function CreateJob({ company }: { company: any }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: 'Full-time',
        location_type: 'On-site',
        city: '',
        salary_range: '',
        description: '',
        requirements: '',
        status: 'published',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/company/jobs');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title="Buat Lowongan Baru - Company Portal" />
            <CompanyNavbar company={company} />

            <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/company/jobs"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6"
                >
                    <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Lowongan
                </Link>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                    <div className="mb-6 border-b border-slate-100 pb-4 dark:border-slate-800">
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Buat Lowongan Pekerjaan
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Isi informasi posisi pekerjaan yang ingin dibuka.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Posisi */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Judul Posisi / Job Title *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Senior Full Stack Developer"
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            />
                            {errors.title && <span className="mt-1 text-xs text-rose-500">{errors.title}</span>}
                        </div>

                        {/* Tipe Pekerjaan & Sistem Kerja */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Tipe Pekerjaan
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value as any)}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
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
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                >
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        {/* Kota & Kisaran Gaji */}
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
                                        placeholder="Contoh: Jakarta Selatan"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.city && <span className="mt-1 text-xs text-rose-500">{errors.city}</span>}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Kisaran Gaji (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.salary_range}
                                    onChange={(e) => setData('salary_range', e.target.value)}
                                    placeholder="Contoh: Rp 8.000.000 - Rp 12.000.000"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Deskripsi Lowongan */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Deskripsi Pekerjaan
                            </label>
                            <textarea
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan tanggung jawab utama dan gambaran umum tentang peran ini..."
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            ></textarea>
                        </div>

                        {/* Persyaratan */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Persyaratan & Kualifikasi
                            </label>
                            <textarea
                                rows={4}
                                value={data.requirements}
                                onChange={(e) => setData('requirements', e.target.value)}
                                placeholder="Tuliskan kualifikasi, keahlian, atau pengalaman yang dibutuhkan kandidat..."
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            ></textarea>
                        </div>

                        {/* Status Publikasi */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                Status Publikasi
                            </label>
                            <div className="mt-2 flex items-center gap-6">
                                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="published"
                                        checked={data.status === 'published'}
                                        onChange={() => setData('status', 'published')}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    Publikasikan Langsung
                                </label>
                                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="draft"
                                        checked={data.status === 'draft'}
                                        onChange={() => setData('status', 'draft')}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    Simpan Draft
                                </label>
                            </div>
                        </div>

                        {/* Tombol Aksi */}
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
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Simpan Lowongan
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}