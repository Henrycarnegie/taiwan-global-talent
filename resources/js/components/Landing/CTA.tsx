import React from 'react';

const CTA = () => {
    return (
        <section className="relative overflow-hidden bg-white px-6 py-28">
            {/* Kontainer Utama dengan Desain Kartu Melayang yang Masif */}
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 p-12 text-center shadow-2xl ring-1 ring-white/10 md:p-16">
                {/* Aksen Lampu Neon Latar Belakang (Glow Effect) */}

                <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                    {/* BUKTI SOSIAL / LIVE STATS BADGE */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xs">
                        <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                        <p className="text-xs font-semibold tracking-wide text-slate-300">
                            {' '}
                            <span className="font-bold text-amber-400">
                                120+ Mahasiswa
                            </span>{' '}
                            baru bergabung minggu ini
                        </p>
                    </div>

                    {/* JUDUL UTAMA YANG EMOSIONAL & MEMICU AKSI */}
                    <h2 className="text-3xl leading-tight font-black tracking-tight text-white md:text-5xl">
                        Siap Membangun Karier &{' '}
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-red-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
                            Masa Depanmu di Taiwan?
                        </span>
                    </h2>

                    {/* DESKRIPSI VALUE PROPOSITION */}
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
                        Jangan lewatkan kesempatan emas berjejaring langsung
                        dengan HRD korporat top, mengamankan beasiswa fully
                        funded, dan menguasai bahasa Mandarin bisnis dalam satu
                        ekosistem tanpa biaya.
                    </p>

                    {/* DUAL ACTION BUTTONS (Dibuat Kontras & Responsif) */}
                    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
                        {/* Tombol Utama untuk Mahasiswa / Pencari Kerja */}
                        <button className="group relative w-full rounded-xl bg-linear-to-r from-[#E60012] to-red-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-red-600/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-red-600/30 active:scale-98 sm:w-auto">
                            Daftar Sebagai Talenta
                            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        {/* Tombol Sekunder untuk Perusahaan / Pemberi Kerja */}
                        <button className="w-full rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-xs transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-98 sm:w-auto">
                            Kemitraan Perusahaan (HR)
                        </button>
                    </div>

                    {/* MICRO-TRUST FOOTNOTE */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/5 pt-8 text-[11px] text-slate-500">
                        <span>🛡️ 100% Free Membership</span>
                        <span>🔒 Data Terproteksi Aman</span>
                        <span>🤝 Terintegrasi dengan Ekosistem Kampus</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
