import { ShieldCheck, TrendingUp, Handshake, Target } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Create & Auth Profile',
        desc: 'Sign in instantly with Google Auth and complete your public talent profile.',
        icon: ShieldCheck,
        badge: 'Setup',
    },
    {
        number: '02',
        title: 'Build Skills & Language',
        desc: 'Upload your digital portfolio, join webinars, and update your Mandarin certification score (TOCFL).',
        icon: TrendingUp,
        badge: 'Develop',
    },
    {
        number: '03',
        title: 'Auto-Match Ecosystem',
        desc: 'Our matching system automatically connects your profile qualifications with thousands of opportunities in Taiwan.',
        icon: Handshake,
        badge: 'Matching',
    },
    {
        number: '04',
        title: 'Apply & Claim Scholarship',
        desc: 'Apply directly to top companies or claim the study scholarship that best fits you.',
        icon: Target,
        badge: 'Success',
    },
];

const HowItWorks = () => {
    return (
        <section
            id="how"
            className="border-y-4 border-[#173b8f] bg-[#173b8f] px-5 py-24"
        >
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="rounded-full bg-[#ffcb05] px-4 py-2 text-xs font-black tracking-widest text-[#173b8f] uppercase">
                        System Workflow
                    </span>
                    <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
                        How This Platform Helps You
                    </h2>
                </div>

                {/* Steps Timeline Grid */}
                <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Decorative connector line (desktop only) */}
                    <div className="absolute top-1/2 right-4 left-4 z-0 hidden h-1 -translate-y-12 bg-white/20 lg:block" />

                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="group relative z-10 flex flex-col justify-between rounded-lg border-2 border-white bg-white p-6 shadow-[6px_6px_0_#ffcb05] transition-all duration-200 hover:-translate-y-1"
                        >
                            <div>
                                {/* Card Top Row */}
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff7d7]">
                                        <step.icon className="h-5 w-5 text-[#f47b20]" />
                                    </div>
                                    <span className="text-2xl font-black tracking-tight text-[#173b8f]/15">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Stage Tag */}
                                <span className="mb-2 inline-block rounded bg-[#173b8f] px-2 py-1 text-[10px] font-black tracking-wider text-white uppercase">
                                    {step.badge}
                                </span>

                                {/* Main Content */}
                                <h3 className="text-base font-black text-[#173b8f]">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed font-semibold text-[#173b8f]/65">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Small Step Indicator */}
                            <div className="mt-6 flex items-center justify-between border-t-2 border-[#173b8f]/10 pt-3 text-[11px] font-black text-[#f47b20]">
                                <span>Step {i + 1}</span>
                                <span>Done ●</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
