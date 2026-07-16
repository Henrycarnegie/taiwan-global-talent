import {
    ArrowRight,
    BadgeCheck,
    BookOpenText,
    Clock3,
    Sparkles,
} from 'lucide-react';

const courseGroups = [
    {
        title: 'Mandarin Career Courses',
        eyebrow: 'Language track',
        fit: 'Best for study, work, and relocation prep',
        accent: '#f47b20',
        image: '/images/landing/diverse-collaboration.png',
        description:
            'Build practical Mandarin confidence for daily life, TOCFL preparation, and professional conversation in Taiwan.',
        courses: [
            {
                title: 'Mandarin Foundations for Taiwan',
                price: 'NT$ 0',
                duration: 'Flexible starter',
                action: 'View pathway',
            },
            {
                title: 'TOCFL and Workplace Mandarin',
                price: 'NT$ 1,990',
                duration: '6-week guided plan',
                action: 'See details',
            },
        ],
    },
    {
        title: 'Career Readiness Courses',
        eyebrow: 'Portfolio track',
        fit: 'Best for internships, jobs, and career pivots',
        accent: '#28a6a1',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=82',
        description:
            'Turn your experience into a clean public profile, sharpen interview answers, and understand what Taiwan employers expect.',
        courses: [
            {
                title: 'Professional Profile Studio',
                price: 'NT$ 1,490',
                duration: '4 live sessions',
                action: 'View pathway',
            },
            {
                title: 'Taiwan Interview Readiness',
                price: 'NT$ 1,200',
                duration: 'Mock interview lab',
                action: 'See details',
            },
        ],
    },
    {
        title: 'Scholarship & Company Programs',
        eyebrow: 'Opportunity track',
        fit: 'Best for funded study and employer visibility',
        accent: '#6f5bd9',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=82',
        description:
            'Map scholarship options, prepare documents, and activate the employer matching tools that help companies discover you.',
        courses: [
            {
                title: 'Scholarship Planning Sprint',
                price: 'NT$ 990',
                duration: 'Document roadmap',
                action: 'View pathway',
            },
            {
                title: 'Employer Visibility Profile',
                price: 'NT$ 0',
                duration: 'Free profile access',
                action: 'Create account',
            },
        ],
    },
];

export default function Membership() {
    return (
        <section
            id="courses"
            className="relative overflow-hidden bg-[#f7f3ea] px-5 py-24"
        >
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-end">
                    <div>
                        <p className="text-sm font-extrabold tracking-widest text-[#f47b20] uppercase">
                            Learning pathways
                        </p>
                        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#173b8f] md:text-6xl">
                            Designed for learners, graduates, and professionals.
                        </h2>
                    </div>
                    <p className="max-w-2xl text-base leading-8 font-medium text-[#173b8f]/70">
                        Whether you are 17 and planning your first overseas step
                        or 40 and repositioning your career, each pathway keeps
                        the next action clear, practical, and credible.
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    {[
                        'High-school leavers',
                        'University students',
                        'Early career talent',
                        'Working professionals',
                    ].map((audience) => (
                        <span
                            key={audience}
                            className="rounded border border-[#173b8f]/12 bg-white px-4 py-2 text-xs font-bold tracking-wide text-[#173b8f]"
                        >
                            {audience}
                        </span>
                    ))}
                </div>

                <div className="mt-14 grid gap-8">
                    {courseGroups.map((group) => (
                        <article
                            key={group.title}
                            className="overflow-hidden rounded-md border border-[#173b8f]/10 bg-white shadow-sm"
                        >
                            <div className="grid lg:grid-cols-[0.9fr_1.35fr]">
                                <div className="relative min-h-80 overflow-hidden">
                                    <img
                                        src={group.image}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,23,47,0.72)_0%,rgba(9,23,47,0.18)_100%)]" />
                                    <div className="absolute top-6 left-6 rounded-md bg-white/92 px-4 py-3 text-[#173b8f] shadow-sm">
                                        <p className="text-[10px] font-extrabold tracking-widest text-[#173b8f]/48 uppercase">
                                            Recommended fit
                                        </p>
                                        <p className="mt-1 max-w-56 text-xs leading-5 font-extrabold">
                                            {group.fit}
                                        </p>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                                        <span
                                            className="inline-flex rounded px-3 py-1 text-xs font-extrabold tracking-widest text-white uppercase"
                                            style={{
                                                backgroundColor: group.accent,
                                            }}
                                        >
                                            {group.eyebrow}
                                        </span>
                                        <h3 className="mt-4 text-3xl font-extrabold tracking-tight">
                                            {group.title}
                                        </h3>
                                        <p className="mt-3 max-w-md text-sm leading-7 font-medium text-white/78">
                                            {group.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-0 md:grid-cols-2">
                                    {group.courses.map((course) => (
                                        <div
                                            key={course.title}
                                            className="group flex min-h-80 flex-col justify-between border-b border-[#173b8f]/10 p-7 transition hover:bg-[#fffaf0] md:border-r md:border-b-0 last:md:border-r-0"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <div
                                                        className="flex h-12 w-12 items-center justify-center rounded-md text-white"
                                                        style={{
                                                            backgroundColor:
                                                                group.accent,
                                                        }}
                                                    >
                                                        <BookOpenText className="h-6 w-6" />
                                                    </div>
                                                    <BadgeCheck className="h-5 w-5 text-[#173b8f]/35" />
                                                </div>
                                                <p className="mt-6 text-xs font-extrabold tracking-widest text-[#173b8f]/42 uppercase">
                                                    Pathway module
                                                </p>
                                                <h4 className="mt-7 text-2xl leading-tight font-extrabold text-[#173b8f]">
                                                    {course.title}
                                                </h4>
                                                <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-wide text-[#173b8f]/58 uppercase">
                                                    <Clock3 className="h-4 w-4" />
                                                    {course.duration}
                                                </div>
                                            </div>

                                            <div className="mt-10">
                                                <div className="flex items-end justify-between gap-4">
                                                    <div>
                                                        <p className="text-xs font-extrabold tracking-widest text-[#173b8f]/42 uppercase">
                                                            Starts at
                                                        </p>
                                                        <div className="mt-1 text-3xl font-extrabold text-[#173b8f]">
                                                            {course.price}
                                                        </div>
                                                    </div>
                                                    <a
                                                        href="/login"
                                                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#173b8f] text-white transition group-hover:bg-[#f47b20]"
                                                        aria-label={
                                                            course.action
                                                        }
                                                    >
                                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                                                    </a>
                                                </div>
                                                <a
                                                    href="/login"
                                                    className="mt-5 inline-flex items-center text-sm font-extrabold text-[#f47b20]"
                                                >
                                                    {course.action}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 grid gap-5 rounded-md bg-[#173b8f] p-7 text-white shadow-[0_24px_70px_rgba(23,59,143,0.18)] md:grid-cols-[1fr_auto] md:items-center">
                    <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#ffcb05] text-[#173b8f]">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black">
                                Free access is available for every age group.
                            </h3>
                            <p className="mt-2 max-w-3xl text-sm leading-7 font-semibold text-white/72">
                                Start with profile visibility, community
                                discussions, webinar access, and scholarship
                                discovery without a subscription.
                            </p>
                        </div>
                    </div>
                    <a
                        href="/login"
                        className="inline-flex items-center justify-center rounded-md bg-white px-6 py-4 text-sm font-black text-[#173b8f] transition hover:bg-[#ffcb05]"
                    >
                        Create Free Account
                    </a>
                </div>
            </div>
        </section>
    );
}
