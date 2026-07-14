import {
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    GraduationCap,
    Languages,
} from 'lucide-react';

const pillars = [
    {
        icon: Languages,
        badge: 'Courses & Webinars',
        title: 'Mandarin for real academic and work settings',
        desc: 'Business Mandarin, TOCFL prep, and mentor-led practice sessions for classrooms, offices, interviews, and everyday life in Taiwan.',
        linkText: 'View Class Schedule',
        color: '#f47b20',
    },
    {
        icon: GraduationCap,
        badge: 'Fully Funded',
        title: 'Scholarship planning with adult-level clarity',
        desc: 'A focused view of MOE, ICDF, university, and research funding paths with reminders for deadlines, documents, and eligibility.',
        linkText: 'Find Scholarships',
        color: '#6f5bd9',
    },
    {
        icon: BriefcaseBusiness,
        badge: 'Verified Companies',
        title: 'A professional profile employers can scan',
        desc: 'Package skills, work history, projects, certificates, and Mandarin progress into a profile Taiwan HR teams can understand quickly.',
        linkText: 'Explore Jobs',
        color: '#28a6a1',
    },
    {
        icon: BadgeCheck,
        badge: 'Certificates',
        title: 'Proof of progress that travels with you',
        desc: 'Complete courses and challenges, then add digital certificates directly to the same profile used for applications and matching.',
        linkText: 'Learn How It Works',
        color: '#173b8f',
    },
];

export default function CorePillars() {
    return (
        <section
            id="programs"
            className="relative overflow-hidden bg-white px-5 py-24"
        >
            <div className="absolute inset-x-0 top-0 h-40 bg-[#f7f3ea]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(23,59,143,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(23,59,143,0.05)_1px,transparent_1px)] [background-size:52px_52px] opacity-45" />
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                    <div className="rounded-md bg-[#173b8f] p-8 text-white shadow-[0_22px_70px_rgba(23,59,143,0.22)] lg:sticky lg:top-28">
                        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black tracking-widest text-[#f47b20] uppercase">
                            Integrated platform
                        </span>
                        <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                            Practical pathways for every stage of the journey.
                        </h2>
                        <p className="mt-5 text-base leading-8 font-semibold text-white/70">
                            The platform connects learning, funding, and career
                            preparation for high-school leavers, university
                            students, graduates, and working adults.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {pillars.map((pillar) => (
                            <article
                                key={pillar.title}
                                className="group min-h-80 rounded-md border border-t-4 border-[#173b8f]/10 bg-white p-7 shadow-[0_16px_50px_rgba(23,59,143,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(23,59,143,0.13)]"
                                style={{
                                    borderTopColor: pillar.color,
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-md text-white"
                                    style={{
                                        backgroundColor: pillar.color,
                                    }}
                                >
                                    <pillar.icon className="h-7 w-7" />
                                </div>
                                <span
                                    className="mt-7 inline-block rounded-full px-3 py-1 text-[11px] font-black tracking-wider text-white uppercase"
                                    style={{
                                        backgroundColor: pillar.color,
                                    }}
                                >
                                    {pillar.badge}
                                </span>
                                <h3 className="mt-4 text-2xl leading-tight font-black text-[#173b8f]">
                                    {pillar.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 font-semibold text-[#173b8f]/66">
                                    {pillar.desc}
                                </p>
                                <a
                                    href="#courses"
                                    className="mt-8 inline-flex items-center text-sm font-black text-[#f47b20]"
                                >
                                    {pillar.linkText}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
