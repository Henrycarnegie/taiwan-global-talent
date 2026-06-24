import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/Landing';

export default function Hero() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section className="relative overflow-hidden px-6 pt-32 pb-24">
            <div className="absolute inset-0 bg-linear-to-br from-[#E60012]/10 via-white to-[#0A2A66]/10" />

            <div className="relative mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 backdrop-blur"
                >
                    🇹🇼 Taiwan Digital Talent Platform
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-linear-to-r from-[#E60012] to-[#0A2A66] bg-clip-text text-5xl font-semibold text-transparent md:text-6xl"
                >
                    {t.heroTitle}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-lg text-gray-600"
                >
                    {t.heroDesc}
                </motion.p>

                <div className="mt-8 flex justify-center gap-4">
                    <button className="rounded-full bg-[#E60012] px-6 py-3 text-white transition hover:scale-105">
                        {t.cta}
                    </button>

                    <button className="rounded-full border px-6 py-3 transition hover:bg-black/5">
                        {t.company}
                    </button>
                </div>
            </div>
        </section>
    );
}
