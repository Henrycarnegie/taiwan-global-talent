import { motion } from 'framer-motion';
import { Building2, CreditCard, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/Landing';

export default function Hero() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section className="relative overflow-hidden bg-white pt-36 pb-24">
            {/* Latar Belakang Gradasi Halus Berestetika Tinggi */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply">
                <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-linear-to-br from-[#E60012]/20 to-transparent blur-3xl" />
                <div className="absolute right-[-10%] bottom-[10%] h-[60%] w-[60%] rounded-full bg-linear-to-tl from-[#0A2A66]/20 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-6 text-center">
                {/* Lencana Atas dengan Animasi */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur"
                >
                    🇹🇼 Taiwan Digital Talent Hub v2.0
                </motion.div>

                {/* Judul Utama yang Kuat */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl md:leading-[1.15]"
                >
                    {t.heroTitle.split('&').map((text, index) => (
                        <span
                            key={index}
                            className={
                                index === 1
                                    ? 'block bg-linear-to-r from-[#E60012] to-[#0A2A66] bg-clip-text text-transparent'
                                    : ''
                            }
                        >
                            {index === 1 ? ` & ${text}` : text}
                        </span>
                    ))}
                </motion.h1>

                {/* Deskripsi Sub-judul */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
                >
                    {t.heroDesc}
                </motion.p>

                {/* Tombol Aksi Interaktif */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 pt-2"
                >
                    <button className="group relative rounded-full bg-[#E60012] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-200 hover:bg-[#c80010] hover:shadow-xl hover:shadow-red-500/30 active:scale-98">
                        {t.cta}
                        <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </button>

                    <button className="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-98">
                        {t.company}
                    </button>
                </motion.div>

                {/* Info Fitur Mini di Bawah CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-xs font-medium text-slate-400"
                >
                    <span className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-yellow-400" />
                        No Credit Card Required
                    </span>

                    <span className="text-slate-200">•</span>

                    <span className="flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4 text-blue-400" />
                        Verified University Partner
                    </span>

                    <span className="text-slate-200">•</span>

                    <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-emerald-400" />
                        Direct HR Integration
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
