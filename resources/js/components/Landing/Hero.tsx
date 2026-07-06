import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/Landing';

const pathways = [
    {
        number: '01',
        title: 'Learn Mandarin',
        color: 'bg-[#f6c453]',
        rotate: '-rotate-3',
    },
    {
        number: '02',
        title: 'Find Scholarships',
        color: 'bg-[#f38b66]',
        rotate: 'rotate-2',
    },
    {
        number: '03',
        title: 'Launch Your Career',
        color: 'bg-[#9bc7b8]',
        rotate: '-rotate-1',
    },
];

export default function Hero() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section
            id="top"
            className="relative overflow-hidden bg-[#fffaf0] px-5 pt-36 pb-20 sm:px-8 lg:pt-44 lg:pb-28"
        >
            <div className="absolute top-32 -left-24 h-72 w-72 rounded-full bg-[#f6c453]/25 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#9bc7b8]/25 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#173b36]/15 bg-white/70 px-4 py-2 text-xs font-black tracking-[0.16em] text-[#1f4d46] uppercase"
                    >
                        <Sparkles className="h-4 w-4 text-[#f26a3d]" /> Your
                        Taiwan journey starts here
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="max-w-4xl font-serif text-[clamp(3.7rem,8vw,7.5rem)] leading-[0.86] font-black tracking-[-0.065em] text-[#173b36]"
                    >
                        Build a future that feels
                        <span className="relative ml-3 inline-block text-[#f26a3d] italic">
                            possible.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 }}
                        className="mt-8 max-w-xl text-lg leading-8 text-[#55716c] sm:text-xl"
                    >
                        {t.heroDesc} Learn the language, meet the right people,
                        and turn your ambition into a life in Taiwan.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.24 }}
                        className="mt-9 flex flex-col gap-3 sm:flex-row"
                    >
                        <a
                            href="/login"
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f26a3d] px-7 py-4 text-sm font-black text-white shadow-[0_10px_0_#173b36] transition hover:-translate-y-1 hover:shadow-[0_14px_0_#173b36]"
                        >
                            Start your journey{' '}
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                            href="#features"
                            className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#173b36] px-7 py-4 text-sm font-black text-[#173b36] transition hover:bg-[#173b36] hover:text-white"
                        >
                            Explore programs{' '}
                            <ArrowDownRight className="h-4 w-4" />
                        </a>
                    </motion.div>
                </div>

                <div className="relative mx-auto min-h-[430px] w-full max-w-lg">
                    <div className="absolute top-0 right-3 rounded-full bg-[#173b36] px-5 py-3 text-xs font-black tracking-widest text-white uppercase">
                        One platform · Every step
                    </div>
                    {pathways.map((pathway, index) => (
                        <motion.div
                            key={pathway.number}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.18 + index * 0.1 }}
                            className={`absolute ${pathway.rotate} ${pathway.color} flex w-[88%] items-center justify-between rounded-[2rem] border-2 border-[#173b36] p-6 shadow-[8px_9px_0_#173b36]`}
                            style={{ top: 72 + index * 112, right: index * 10 }}
                        >
                            <span className="text-xs font-black tracking-[0.2em] text-[#173b36]/60">
                                {pathway.number}
                            </span>
                            <span className="font-serif text-2xl font-black tracking-tight text-[#173b36] sm:text-3xl">
                                {pathway.title}
                            </span>
                            <ArrowDownRight className="h-6 w-6 text-[#173b36]" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
