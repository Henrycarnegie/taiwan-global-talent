import {
    ArrowUpRight,
    BookOpen,
    Briefcase,
    GraduationCap,
    Languages,
} from 'lucide-react';

const programs = [
    {
        icon: Languages,
        eyebrow: 'Language',
        title: 'Mandarin that moves with you',
        desc: 'Flexible learning paths, TOCFL preparation, and practical language skills for daily life and work.',
        color: 'bg-[#f6c453]',
    },
    {
        icon: GraduationCap,
        eyebrow: 'Education',
        title: 'Funding for your next chapter',
        desc: 'Discover scholarships and university opportunities matched to your goals and background.',
        color: 'bg-[#9bc7b8]',
    },
    {
        icon: Briefcase,
        eyebrow: 'Career',
        title: 'A warmer way into the job market',
        desc: 'Build a visible profile and connect with Taiwanese companies looking for international talent.',
        color: 'bg-[#f38b66]',
    },
    {
        icon: BookOpen,
        eyebrow: 'Community',
        title: 'Guidance you can return to',
        desc: 'Learn from peers, mentors, and clear resources whenever you need a little direction.',
        color: 'bg-[#d6c6e7]',
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="bg-[#fffaf0] px-5 py-24 sm:px-8 lg:py-32"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                    <p className="text-xs font-black tracking-[0.2em] text-[#f26a3d] uppercase">
                        Built around your journey
                    </p>
                    <h2 className="font-serif text-5xl leading-[0.96] font-black tracking-[-0.045em] text-[#173b36] sm:text-7xl">
                        Everything you need to make Taiwan feel closer.
                    </h2>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-2">
                    {programs.map((program, index) => (
                        <article
                            key={program.title}
                            className={`${program.color} group rounded-[2rem] border-2 border-[#173b36] p-7 shadow-[6px_7px_0_#173b36] transition hover:-translate-y-1 hover:shadow-[9px_11px_0_#173b36] sm:p-9`}
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#173b36] bg-[#fffaf0]">
                                    <program.icon className="h-6 w-6 text-[#173b36]" />
                                </div>
                                <span className="font-serif text-5xl font-black text-[#173b36]/15">
                                    0{index + 1}
                                </span>
                            </div>
                            <p className="mt-10 text-xs font-black tracking-[0.18em] text-[#173b36]/65 uppercase">
                                {program.eyebrow}
                            </p>
                            <h3 className="mt-3 max-w-md font-serif text-3xl leading-tight font-black tracking-tight text-[#173b36] sm:text-4xl">
                                {program.title}
                            </h3>
                            <div className="mt-7 flex items-end justify-between gap-6">
                                <p className="max-w-lg leading-7 text-[#294f48]/80">
                                    {program.desc}
                                </p>
                                <ArrowUpRight className="h-7 w-7 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
