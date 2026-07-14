import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative isolate min-h-[760px] overflow-hidden bg-[#102a43] text-white">
            <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85"
                alt="Student learning online with a laptop"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,23,47,0.92)_0%,rgba(9,23,47,0.76)_42%,rgba(9,23,47,0.28)_100%)]" />
            <div className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:44px_44px] opacity-25" />
            <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col justify-end px-5 pt-32 pb-10">
                <div className="max-w-4xl pb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        className="max-w-4xl text-5xl leading-[0.98] font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
                    >
                        Build the skills, language, and profile for your next
                        move in Taiwan.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-base leading-8 font-semibold text-white/78 md:text-lg"
                    >
                        Explore jobs, scholarships, internships, mentorship
                        programs, and career opportunities designed to support
                        your journey. Access curated Mandarin learning programs,
                        educational opportunities, and professional resources
                        for students, graduates, job seekers, and working
                        professionals looking to study, work, and build their
                        future in Taiwan.
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
            </div>
        </section>
    );
}
