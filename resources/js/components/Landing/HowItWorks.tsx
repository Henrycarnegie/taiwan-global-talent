import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Create & Auth Profile',
        desc: 'Masuk instan menggunakan Google Auth dan lengkapi data profil publik talenta Anda.',
        icon: '🛡️',
        badge: 'Setup',
    },
    {
        number: '02',
        title: 'Build Skills & Language',
        desc: 'Unggah portofolio digital Anda, ikuti webinar, dan perbarui skor sertifikasi bahasa Mandarin (TOCFL).',
        icon: '📈',
        badge: 'Develop',
    },
    {
        number: '03',
        title: 'Auto-Match Ecosystem',
        desc: 'Sistem algoritma mencocokkan kualifikasi profil Anda secara otomatis dengan ribuan lowongan di Taiwan.',
        icon: '🤝',
        badge: 'Matching',
    },
    {
        number: '04',
        title: 'Apply & Claim Scholarship',
        desc: 'Ajukan lamaran kerja langsung ke perusahaan top atau klaim beasiswa studi yang paling cocok untuk Anda.',
        icon: '🎯',
        badge: 'Success',
    },
];

const HowItWorks = () => {
    return (
        <section
            id="how"
            className="border-y border-slate-200/60 bg-slate-50 px-6 py-24"
        >
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mx-auto mb-20 max-w-2xl text-center">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-[#0A2A66] uppercase">
                        Alur Kerja Sistem
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                        Bagaimana Platform Ini Membantu Anda?
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-slate-500">
                        Proses digitalisasi terstruktur untuk mempersiapkan
                        karir dan pendidikan masa depan Anda di Taiwan tanpa
                        birokrasi yang rumit.
                    </p>
                </div>

                {/* Steps Timeline Grid */}
                <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Garis Penghubung Dekoratif (Hanya muncul di desktop) */}
                    <div className="absolute top-1/2 right-4 left-4 z-0 hidden h-0.5 -translate-y-12 bg-slate-200 lg:block" />

                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="group relative z-10 flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:border-blue-500/30 hover:shadow-md"
                        >
                            <div>
                                {/* Baris Atas Kartu */}
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-lg transition-colors group-hover:bg-blue-50">
                                        {step.icon}
                                    </div>
                                    <span className="text-2xl font-black tracking-tight text-slate-100 transition-colors group-hover:text-blue-100">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Tag Tahapan */}
                                <span className="mb-2 inline-block rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                                    {step.badge}
                                </span>

                                {/* Konten Utama */}
                                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed font-medium text-slate-400">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Indikator Langkah Kecil */}
                            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-3 text-[11px] font-semibold text-slate-400">
                                <span>Step {i + 1}</span>
                                <span className="text-slate-300">Done ●</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
