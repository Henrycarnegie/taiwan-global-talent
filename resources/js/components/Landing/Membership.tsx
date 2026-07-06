import { Check, Sparkles } from 'lucide-react';

const benefits = [
    'A public talent profile',
    'Community and mentor access',
    'Scholarship discovery',
    'Career matching',
];

export default function Membership() {
    return (
        <section className="bg-[#fffaf0] px-5 py-24 sm:px-8 lg:py-32">
            <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border-2 border-[#173b36] bg-[#f6c453] shadow-[10px_12px_0_#173b36] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="p-8 sm:p-12 lg:p-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#173b36]/20 bg-[#fffaf0]/70 px-4 py-2 text-xs font-black tracking-widest uppercase">
                        <Sparkles className="h-4 w-4" /> Free membership
                    </div>
                    <h2 className="mt-7 max-w-2xl font-serif text-5xl leading-[0.95] font-black tracking-[-0.04em] text-[#173b36] sm:text-6xl">
                        Big plans should have an easy first step.
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#294f48]/80">
                        Join the platform at no cost and start building a future
                        in Taiwan with useful tools, real opportunities, and a
                        community beside you.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="flex items-center gap-3 font-bold text-[#173b36]"
                            >
                                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#173b36] text-white">
                                    <Check className="h-4 w-4" />
                                </span>
                                {benefit}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid place-items-center border-t-2 border-[#173b36] bg-[#f38b66] p-10 text-center lg:border-t-0 lg:border-l-2">
                    <div>
                        <p className="text-xs font-black tracking-[0.2em] text-[#173b36]/65 uppercase">
                            Forever free
                        </p>
                        <p className="mt-3 font-serif text-7xl font-black tracking-tight text-[#173b36]">
                            NT$0
                        </p>
                        <a
                            href="/login"
                            className="mt-7 inline-flex rounded-full bg-[#173b36] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                        >
                            Create your profile
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
