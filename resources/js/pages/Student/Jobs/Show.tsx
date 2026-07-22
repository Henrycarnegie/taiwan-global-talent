import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { ArrowLeft, Building2, MapPin, CheckCircle2 } from 'lucide-react';

export default function StudentJobShow({ job, hasApplied, application }: any) {
    const { auth }: any = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        candidate_name: auth?.user?.name || '',
        candidate_email: auth?.user?.email || '',
        candidate_phone: '',
        resume: null as File | null,
        cover_letter: '',
    });

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/student/jobs/${job.id}/apply`, {
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title={`${job.title} - ${job.company_profile?.company_name}`} />

            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/student/jobs"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 mb-6"
                >
                    <ArrowLeft className="h-4 w-4" /> Kembali ke Semua Lowongan
                </Link>

                <div className="space-y-6">
                    {/* Header Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            <Building2 className="h-4 w-4" />
                            {job.company_profile?.company_name}
                        </div>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {job.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold dark:bg-slate-800">
                                {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" /> {job.location_type} {job.city ? `(${job.city})` : ''}
                            </span>
                            {job.salary_range && (
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    {job.salary_range}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Deskripsi & Persyaratan */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                        {job.description && (
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Deskripsi Pekerjaan</h2>
                                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                    {job.description}
                                </p>
                            </div>
                        )}

                        {job.requirements && (
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Persyaratan</h2>
                                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                    {job.requirements}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Form Melamar / Status */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        {hasApplied ? (
                            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                <div>
                                    <h4 className="text-xs font-bold">Anda Sudah Melamar Posisi Ini</h4>
                                    <p className="text-[11px] opacity-80">
                                        Status Lamaran: <span className="capitalize font-semibold">{application?.status}</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleApply} className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kirim Lamaran Pekerjaan</h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.candidate_name}
                                            onChange={(e) => setData('candidate_name', e.target.value)}
                                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        />
                                        {errors.candidate_name && <span className="text-xs text-rose-500">{errors.candidate_name}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.candidate_email}
                                            onChange={(e) => setData('candidate_email', e.target.value)}
                                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        />
                                        {errors.candidate_email && <span className="text-xs text-rose-500">{errors.candidate_email}</span>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Nomor Telepon / WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        value={data.candidate_phone}
                                        onChange={(e) => setData('candidate_phone', e.target.value)}
                                        placeholder="081234567890"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Unggah Resume / CV (PDF, Maksimal 5MB) *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setData('resume', e.target.files?.[0] || null)}
                                        className="mt-1.5 block w-full text-xs text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    {errors.resume && <span className="text-xs text-rose-500">{errors.resume}</span>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Surat Lamaran / Cover Letter (Opsional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.cover_letter}
                                        onChange={(e) => setData('cover_letter', e.target.value)}
                                        placeholder="Ceritakan singkat mengapa Anda cocok untuk posisi ini..."
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Kirim Lamaran Sekarang
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}