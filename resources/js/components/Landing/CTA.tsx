import {
    ArrowRight,
    BriefcaseBusiness,
    GraduationCap,
    ShieldCheck,
    Users,
} from 'lucide-react';

const ecosystemItems = [
    {
        label: 'Free starter membership',
        icon: GraduationCap,
    },
    {
        label: 'Secure protected data',
        icon: ShieldCheck,
    },
    {
        label: 'Campus and employer ecosystem',
        icon: BriefcaseBusiness,
    },
];

const CTA = () => {
    return (
        <section className="relative overflow-hidden bg-[#f7f3ea] px-5 py-24">
            <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md bg-[#102a43] shadow-sm lg:grid-cols-[1fr_0.82fr]">
                <div className="p-8 text-white md:p-14">
                    <h2 className="max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
                        Start with one pathway. Build toward a bigger Taiwan
                        plan.
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-8 font-medium text-white/70">
                        Create your free account to access Mandarin courses,
                        earn certificates, connect with a global learning
                        community, and discover scholarships, internships, and
                        career opportunities—all in one place.
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <a
                            href="/login"
                            className="group inline-flex items-center justify-center rounded-md bg-[#f47b20] px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#173b8f]"
                        >
                            Join as Talent
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        <a
                            href="/login"
                            className="inline-flex items-center justify-center rounded-md border border-white/24 bg-white/8 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#173b8f]"
                        >
                            Company Partnership
                        </a>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-8">
                        <div className="mb-5 flex items-center gap-3 text-xs font-extrabold tracking-widest text-white/55 uppercase">
                            <Users className="h-4 w-4 text-[#ffcb05]" />
                            Connected ecosystem
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {ecosystemItems.map((item, index) => (
                                <div
                                    key={item.label}
                                    className="group relative flex min-h-28 items-center gap-4 rounded-md border border-white/12 bg-white/8 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#ffcb05]/55 hover:bg-white/14"
                                >
                                    {index < ecosystemItems.length - 1 && (
                                        <span className="absolute top-1/2 left-[calc(100%+0.25rem)] hidden h-px w-3 bg-[#ffcb05]/45 md:block" />
                                    )}

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#ffcb05] text-[#173b8f] transition duration-300 group-hover:bg-white">
                                        <item.icon className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm leading-6 font-extrabold text-white/82 transition group-hover:text-white">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative min-h-96 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=82"
                        alt="Professional group planning together"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,42,67,0.62)_0%,rgba(16,42,67,0.08)_100%)]" />
                    <div className="absolute right-6 bottom-6 left-6 rounded-md bg-white p-5 text-[#173b8f] shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#173b8f] text-white">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-extrabold tracking-widest text-[#173b8f]/45 uppercase">
                                    Guided setup
                                </p>
                                <p className="text-lg font-extrabold">
                                    Profile, pathway, opportunities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
