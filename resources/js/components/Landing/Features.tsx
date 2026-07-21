import { BadgeCheck, BookOpen, Lightbulb, MessageCircle } from 'lucide-react';

const features = [
    {
        icon: BookOpen,
        title: 'Talent Matching',
        desc: 'Structured matching between students, graduates, and companies in Taiwan.',
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
                    <span className="inline-flex rounded bg-white/10 px-4 py-2 text-xs font-extrabold tracking-widest text-[#f47b20] uppercase">
                        Why choose us?
                    </span>
                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                        Everything you need to learn, grow, and connect with
                        opportunities in one trusted platform.
                    </h2>
                    <div className="mt-9 overflow-hidden rounded-md">
                        <img
                            src="/images/landing/diverse-collaboration.png"
                            alt="Diverse group collaborating around a laptop"
                            className="aspect-[16/10] w-full object-cover"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    {features.map((feature, index) => (
                        <article
                            key={feature.title}
                            className="group grid gap-5 rounded-md border border-white/12 bg-white/[0.055] p-6 transition hover:border-white/28 md:grid-cols-[64px_1fr]"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white text-[#173b8f]">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <div className="text-xs font-extrabold tracking-widest text-[#f47b20] uppercase">
                                    0{index + 1}
                                </div>
                                <h3 className="mt-2 text-2xl font-extrabold">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-7 font-medium text-white/66">
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
