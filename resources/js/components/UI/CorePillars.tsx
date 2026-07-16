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
        badge: 'Courses and Webinars',
        title: 'Mandarin',
        desc: 'Business Mandarin, TOCFL prep, and mentor-led practice sessions for classrooms, offices, interviews, and everyday life in Taiwan.',
        linkText: 'View Class Schedule',
        color: '#f47b20',
    },
    {
        icon: GraduationCap,
        badge: 'Full and Partial',
        title: 'Scholarship',
        desc: 'A focused view of MOE, ICDF, university, and research funding paths with reminders for deadlines, documents, and eligibility.',
        linkText: 'Find Scholarships',
        color: '#6f5bd9',
    },
    {
        icon: BriefcaseBusiness,
        badge: 'Verified Companies',
        title: 'Career Network',
        desc: 'Showcase your skills, experience, and Mandarin progress while connecting with employers and career opportunities across Taiwan.',
        linkText: 'Explore Jobs',
        color: '#28a6a1',
    },
    {
        icon: BadgeCheck,
        badge: 'Proof of Progress',
        title: 'Certificates',
        desc: 'Earn digital certificates by completing courses and challenges, then showcase your achievements to strengthen your professional profile and career opportunities.',
        linkText: 'Learn How It Works',
        color: '#173b8f',
    },
];

export default function CorePillars() {
    return (
        <section
            id="programs"
            className="relative overflow-hidden bg-[#fbfaf7] px-5 py-24"
        >
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                    <div className="rounded-md bg-[#173b8f] p-8 text-white shadow-sm lg:sticky lg:top-28">
                        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                            Practical pathways for every stage of the journey.
                        </h2>
                        <p className="mt-5 text-base leading-8 font-medium text-white/72">
                            The platform connects learning and career
                            preparation for high-school leavers, university
                            students, graduates, and working adults.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {pillars.map((pillar) => (
                            <article
                                key={pillar.title}
                                className="group min-h-80 rounded-md border border-t-4 border-[#173b8f]/10 bg-white p-7 shadow-sm transition hover:border-[#173b8f]/24"
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
                                    className="mt-7 inline-block rounded px-3 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase"
                                    style={{
                                        backgroundColor: pillar.color,
                                    }}
                                >
                                    {pillar.badge}
                                </span>
                                <h3 className="mt-4 text-2xl leading-tight font-extrabold text-[#173b8f]">
                                    {pillar.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 font-medium text-[#173b8f]/66">
                                    {pillar.desc}
                                </p>
                                <a
                                    href="#courses"
                                    className="mt-8 inline-flex items-center text-sm font-extrabold text-[#f47b20]"
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
