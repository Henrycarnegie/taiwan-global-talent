import { motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpenCheck,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    GraduationCap,
    Languages,
    Search,
    TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/Landing';

const quickStats = [
    {
        label: 'Learning pathways',
        value: '12+',
    },
    {
        label: 'Partner network',
        value: '180',
    },
    {
        label: 'Live cohorts',
        value: '8',
    },
];

const readinessSteps = [
    'Language baseline',
    'Profile review',
    'Opportunity shortlist',
];

export default function Hero() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section className="relative isolate min-h-[820px] overflow-hidden bg-[#102a43] text-white">
            <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85"
                alt="Student learning online with a laptop"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,23,47,0.92)_0%,rgba(9,23,47,0.76)_42%,rgba(9,23,47,0.28)_100%)]" />
            <div className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:44px_44px] opacity-25" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,#fff_0%,rgba(255,255,255,0)_100%)]" />

            <div className="mx-auto flex min-h-[820px] max-w-7xl flex-col justify-end px-5 pt-32 pb-10">
                <div className="grid items-end gap-10 lg:grid-cols-[1fr_420px]">
                    <div className="max-w-4xl pb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs font-black tracking-wide text-white uppercase backdrop-blur"
                        >
                            <BookOpenCheck className="h-4 w-4" />
                            Taiwan career readiness platform
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="mt-7 max-w-4xl text-5xl leading-[0.98] font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
                        >
                            Build the skills, language, and profile for your
                            next move in Taiwan.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.2 }}
                            className="mt-6 max-w-2xl text-base leading-8 font-semibold text-white/78 md:text-lg"
                        >
                            {t.heroDesc} Curated Mandarin, scholarship, and
                            career programs for students, graduates, and working
                            professionals preparing for Taiwan.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.3 }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <a
                                href="#courses"
                                className="group inline-flex items-center rounded-md bg-[#f47b20] px-7 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(244,123,32,0.28)] transition hover:bg-white hover:text-[#173b8f]"
                            >
                                Explore pathways
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="/login"
                                className="inline-flex items-center rounded-md border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#173b8f]"
                            >
                                Create free account
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.4 }}
                            className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"
                        >
                            {[
                                '17+ students',
                                'University talent',
                                'Working adults',
                            ].map((audience) => (
                                <div
                                    key={audience}
                                    className="rounded-md border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white/88 backdrop-blur"
                                >
                                    {audience}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="rounded-md border border-white/20 bg-white/12 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-white/16 pb-4">
                            <div>
                                <p className="text-xs font-black tracking-widest text-[#ffcb05] uppercase">
                                    Start here
                                </p>
                                <h2 className="mt-1 text-xl font-black">
                                    Find the right pathway
                                </h2>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f47b20] text-white">
                                <Search className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="mt-5 rounded-md bg-white p-4 text-[#173b8f]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black tracking-widest text-[#173b8f]/45 uppercase">
                                        Readiness score
                                    </p>
                                    <div className="mt-1 text-4xl font-black">
                                        82%
                                    </div>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#28a6a1] text-white">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#173b8f]/10">
                                <div className="h-full w-[82%] rounded-full bg-[#28a6a1]" />
                            </div>
                            <div className="mt-4 grid gap-2">
                                {readinessSteps.map((step) => (
                                    <div
                                        key={step}
                                        className="flex items-center gap-2 text-xs font-black text-[#173b8f]/70"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-[#28a6a1]" />
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3">
                            <a
                                href="#courses"
                                className="group flex items-center gap-4 rounded-md bg-white p-4 text-[#173b8f] transition hover:-translate-y-0.5 hover:bg-[#fff7d7]"
                            >
                                <Languages className="h-5 w-5 text-[#f47b20]" />
                                <span className="flex-1 text-sm font-black">
                                    Mandarin for work
                                </span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#courses"
                                className="group flex items-center gap-4 rounded-md bg-white p-4 text-[#173b8f] transition hover:-translate-y-0.5 hover:bg-[#fff7d7]"
                            >
                                <GraduationCap className="h-5 w-5 text-[#f47b20]" />
                                <span className="flex-1 text-sm font-black">
                                    Scholarship planning
                                </span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#courses"
                                className="group flex items-center gap-4 rounded-md bg-white p-4 text-[#173b8f] transition hover:-translate-y-0.5 hover:bg-[#fff7d7]"
                            >
                                <BriefcaseBusiness className="h-5 w-5 text-[#f47b20]" />
                                <span className="flex-1 text-sm font-black">
                                    Career readiness
                                </span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-md bg-[#173b8f] p-4">
                            <CalendarDays className="h-5 w-5 text-[#f47b20]" />
                            <div>
                                <p className="text-xs font-black text-white/55 uppercase">
                                    Next cohort
                                </p>
                                <p className="text-sm font-black text-white">
                                    New pathway cohorts open monthly
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.45 }}
                    className="mt-10 grid overflow-hidden rounded-md bg-white text-[#173b8f] shadow-[0_18px_60px_rgba(23,59,143,0.16)] sm:grid-cols-3"
                >
                    {quickStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="border-b border-[#173b8f]/10 p-6 sm:border-r sm:border-b-0 last:sm:border-r-0"
                        >
                            <div className="text-3xl font-black">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-xs font-black tracking-wider text-[#173b8f]/58 uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
