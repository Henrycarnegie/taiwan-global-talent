import React from 'react';

const pillars = [
    {
        icon: "🧧",
        badge: "Courses & Webinars",
        title: "Mandarin & Self Development",
        desc: "Kelas bahasa Mandarin bisnis terstruktur persiapan TOCFL dan live webinar bulanan bersama mentor profesional dari industri teknologi Taiwan.",
        linkText: "Lihat Jadwal Kelas"
    },
    {
        icon: "🎓",
        badge: "Fully Funded",
        title: "Scholarship Discovery Hub",
        desc: "Database agregator beasiswa terlengkap dari MOE, ICDF, hingga skema pendanaan jalur riset langsung dari lab profesor universitas top Taiwan.",
        linkText: "Cari Beasiswa"
    },
    {
        icon: "💼",
        badge: "Verified Companies",
        title: "Smart Job Finding Program",
        desc: "Sistem pencocokan CV otomatis. Lengkapi profil talenta digital Anda dan biarkan HRD dari TSMC, Foxconn, atau MediaTek menghubungi Anda langsung.",
        linkText: "Eksplorasi Lowongan"
    },
    {
        icon: "📜",
        badge: "Automated PDF",
        title: "Verified Certificate Programs",
        desc: "Selesaikan tantangan coding, bootcamp, atau kelas bahasa, dan dapatkan sertifikat digital instan yang terintegrasi untuk portofolio profesional Anda.",
        linkText: "Pelajari Mekanisme"
    }
];

export default function CorePillars() {
    return (
        <section className="px-6 py-24 bg-white border-y border-slate-100">
            <div className="mx-auto max-w-6xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
                        Platform Ekosistem Terpadu
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
                        Satu Platform, Segudang Peluang Karier di Taiwan
                    </h2>
                    <p className="mt-4 text-slate-500 text-base leading-relaxed">
                        Kami mengintegrasikan persiapan bahasa, info pendanaan studi, hingga penyaluran kerja ke perusahaan internasional dalam satu dasbor terintegrasi.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {pillars.map((pillar, i) => (
                        <div key={i} className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 p-8 bg-white shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300">
                            <div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl group-hover:bg-blue-50 transition-colors">
                                    {pillar.icon}
                                </div>
                                <span className="inline-block mt-4 text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    {pillar.badge}
                                </span>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">{pillar.title}</h3>
                                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700">
                                <span>{pillar.linkText}</span>
                                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform ml-1">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}