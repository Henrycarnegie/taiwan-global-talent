import React from 'react';
import { BadgeCheck, BookOpen, Lightbulb, MessageCircle } from 'lucide-react';

const features = [
    {
        icon: BookOpen,
        title: 'Smart Talent Matching',
        desc: 'AI-powered matching between students and companies in Taiwan.',
    },
    {
        icon: Lightbulb,
        title: 'Scholarship Discovery',
        desc: 'Find fully funded scholarships from Taiwanese universities.',
    },
    {
        icon: BadgeCheck,
        title: 'Career Opportunities',
        desc: 'Internships and full-time jobs from top tech companies.',
    },
    {
        icon: MessageCircle,
        title: 'Mandarin Learning Path',
        desc: 'Structured learning to prepare for life in Taiwan.',
    },
];

const Features = () => {
    return (
        <section id="features" className="bg-[#102a43] px-5 py-24 text-white">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                    <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black tracking-widest text-[#f47b20] uppercase">
                        Why choose us?
                    </span>
                    <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                        Serious enough for professionals. Clear enough for
                        first-time applicants.
                    </h2>
                    <p className="mt-6 max-w-xl text-base leading-8 font-semibold text-white/70">
                        Taiwan Global Talent is designed for a broad age range:
                        people exploring study, changing careers, preparing for
                        work, or upgrading language skills. The interface stays
                        focused, readable, and action-oriented.
                    </p>
                    <div className="mt-9 overflow-hidden rounded-md">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=82"
                            alt="Students collaborating around a laptop"
                            className="aspect-[16/10] w-full object-cover"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    {features.map((feature, index) => (
                        <article
                            key={feature.title}
                            className="group grid gap-5 rounded-md border border-white/12 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#173b8f] md:grid-cols-[64px_1fr]"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white text-[#173b8f] group-hover:bg-[#f47b20] group-hover:text-white">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <div className="text-xs font-black tracking-widest text-[#f47b20] uppercase group-hover:text-[#f47b20]">
                                    0{index + 1}
                                </div>
                                <h3 className="mt-2 text-2xl font-black">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-7 font-semibold text-white/66 group-hover:text-[#173b8f]/68">
                                    {feature.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
