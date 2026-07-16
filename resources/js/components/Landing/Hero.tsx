import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative isolate min-h-[740px] overflow-hidden bg-[#102a43] text-white">
            <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85"
                alt="Student learning online with a laptop"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,27,48,0.91)_0%,rgba(10,27,48,0.78)_48%,rgba(10,27,48,0.36)_100%)]" />
            <div className="mx-auto flex min-h-[740px] max-w-7xl flex-col justify-end px-5 pt-32 pb-12">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        className="max-w-4xl text-5xl leading-[1.02] font-extrabold text-white sm:text-6xl lg:text-7xl"
                    >
                        Build the skills, language, and profile for your next
                        move in Taiwan.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-base leading-8 font-medium text-white/78 md:text-lg"
                    >
                        Find Mandarin courses, scholarship guidance, company
                        programs, and career resources in one place. Built for
                        students, graduates, job seekers, and working
                        professionals planning a practical next step in Taiwan.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.3 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <a
                            href="#courses"
                            className="group inline-flex items-center rounded-md bg-[#f47b20] px-7 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-white hover:text-[#173b8f]"
                        >
                            Explore pathways
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="/login"
                            className="inline-flex items-center rounded-md border border-white/30 bg-white/8 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#173b8f]"
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
                                className="rounded-md border border-white/18 bg-white/8 px-4 py-3 text-sm font-bold text-white/88"
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
