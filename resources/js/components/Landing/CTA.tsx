import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const trustItems = [
    'Free starter membership',
    'Secure protected data',
    'Integrated campus and employer ecosystem',
];

const CTA = () => {
    return (
        <section className="relative overflow-hidden bg-[#f7f3ea] px-5 py-24">
            <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md bg-[#102a43] shadow-sm lg:grid-cols-[1fr_0.82fr]">
                <div className="p-8 text-white md:p-14">
                    <div className="inline-flex items-center gap-2 rounded border border-white/14 bg-white/10 px-4 py-2 text-xs font-extrabold tracking-widest text-white uppercase">
                        <span className="flex h-2 w-2 rounded-full bg-[#f47b20]" />
                        120+ members joined this week
                    </div>

                    <h2 className="mt-7 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
                        Start with one pathway. Build toward a bigger Taiwan
                        plan.
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-8 font-medium text-white/70">
                        Create a free account, choose the pathway that fits your
                        stage, and keep scholarship, Mandarin, and career
                        preparation moving in one focused workspace.
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

                    <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 md:grid-cols-3">
                        {trustItems.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-3 text-sm font-bold text-white/72"
                            >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#28a6a1]" />
                                {item}
                            </div>
                        ))}
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
