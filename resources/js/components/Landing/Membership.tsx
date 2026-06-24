import React from 'react';

export default function Membership() {
    return (
        <section className="px-6 py-24 bg-linear-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-5xl">
                <div className="rounded-3xl bg-slate-950 p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-20" />
                    <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-red-600 rounded-full blur-3xl opacity-20" />

                    <div className="relative z-10 grid md:grid-cols-5 gap-8 items-center">
                        <div className="md:col-span-3 space-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                                Launch Promotion 🚀
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                Mulai Langkahmu dengan Free Digital Talent Membership
                            </h2>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Dapatkan akses instan ke forum diskusi komunitas pihak ketiga, pembuatan portofolio publik yang dapat dilirik HRD Taiwan, serta info dasar beasiswa secara gratis tanpa biaya langganan bulanan.
                            </p>
                            <ul className="text-xs text-slate-300 space-y-2 grid grid-cols-2 pt-2">
                                <li className="flex items-center gap-2">✔ Public Profile Visibility</li>
                                <li className="flex items-center gap-2">✔ Community Discussion Forum</li>
                                <li className="flex items-center gap-2">✔ Free Live Webinar Access</li>
                                <li className="flex items-center gap-2">✔ Basic Scholarship Aggregator</li>
                            </ul>
                        </div>

                        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Biaya Keanggotaan</p>
                            <div className="mt-2 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-extrabold tracking-tight">NT$ 0</span>
                                <span className="text-xs text-slate-400">/ selamanya</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Non-charging membership account</p>
                            <button className="w-full mt-6 bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm px-4 py-2.5 rounded-xl transition shadow-lg">
                                Buat Akun Gratis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}