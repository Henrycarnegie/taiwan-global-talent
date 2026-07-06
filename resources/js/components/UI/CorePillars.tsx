import {
    Languages,
    GraduationCap,
    BriefcaseBusiness,
    BadgeCheck,
    ArrowRight,
} from 'lucide-react';

const pillars = [
    {
        icon: Languages,
        badge: 'Courses & Webinars',
        title: 'Mandarin & Self Development',
        desc: 'Structured business Mandarin classes for TOCFL preparation and monthly live webinars with mentors from Taiwan’s technology industry.',
        linkText: 'View Class Schedule',
    },
    {
        icon: GraduationCap,
        badge: 'Fully Funded',
        title: 'Scholarship Discovery Hub',
        desc: 'A comprehensive scholarship database covering MOE, ICDF, and research funding from laboratories at Taiwan’s leading universities.',
        linkText: 'Find Scholarships',
    },
    {
        icon: BriefcaseBusiness,
        badge: 'Verified Companies',
        title: 'Smart Job Finding Program',
        desc: 'Automatic résumé matching. Complete your digital talent profile and let recruiters from TSMC, Foxconn, or MediaTek contact you directly.',
        linkText: 'Explore Opportunities',
    },
    {
        icon: BadgeCheck,
        badge: 'Automated PDF',
        title: 'Verified Certificate Programs',
        desc: 'Complete coding challenges, bootcamps, or language classes and earn instant digital certificates for your professional portfolio.',
        linkText: 'Learn How It Works',
    },
];

export default function CorePillars() {
    return (
        <section className="border-y border-slate-100 bg-white px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase">
                        Integrated Ecosystem Platform
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                        One Platform, Countless Career Opportunities in Taiwan
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-500">
                        We bring language preparation, study-funding
                        information, and international career opportunities
                        together in one integrated dashboard.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {pillars.map((pillar, i) => (
                        <div
                            key={i}
                            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-500/20 hover:shadow-xl"
                        >
                            <div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-blue-50">
                                    <pillar.icon className="h-6 w-6 text-slate-700 transition-colors group-hover:text-blue-600" />
                                </div>
                                <span className="mt-4 inline-block rounded bg-blue-50 px-2 py-0.5 text-[11px] font-bold tracking-wider text-blue-600 uppercase">
                                    {pillar.badge}
                                </span>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">
                                    {pillar.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                    {pillar.desc}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center border-t border-slate-50 pt-4 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                                <span>{pillar.linkText}</span>
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
