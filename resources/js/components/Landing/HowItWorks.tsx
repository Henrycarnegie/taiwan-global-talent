import { ArrowRight } from 'lucide-react';

const steps = [
    [
        '01',
        'Tell us who you are',
        'Create your profile in minutes and show us what you want to achieve.',
    ],
    [
        '02',
        'Follow your pathway',
        'Learn Mandarin, explore funding, and build your professional story at your pace.',
    ],
    [
        '03',
        'Meet your next opportunity',
        'Connect with universities, mentors, and employers ready to welcome global talent.',
    ],
];

export default function HowItWorks() {
    return (
        <section
            id="how"
            className="overflow-hidden bg-[#1f4d46] px-5 py-24 text-[#fffaf0] sm:px-8 lg:py-32"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                        <p className="text-xs font-black tracking-[0.2em] text-[#f6c453] uppercase">
                            Simple by design
                        </p>
                        <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] font-black tracking-[-0.045em] sm:text-7xl">
                            Your next chapter, in three clear steps.
                        </h2>
                    </div>
                    <p className="max-w-xl self-end text-lg leading-8 text-[#c3d7d1]">
                        No maze of forms. No wondering what comes next. Just a
                        thoughtful path from where you are to where you want to
                        be.
                    </p>
                </div>

                <div className="mt-16 divide-y divide-white/20 border-y border-white/20">
                    {steps.map(([number, title, desc]) => (
                        <div
                            key={number}
                            className="group grid gap-5 py-8 md:grid-cols-[90px_1fr_1fr_60px] md:items-center"
                        >
                            <span className="font-serif text-3xl font-black text-[#f6c453]">
                                {number}
                            </span>
                            <h3 className="font-serif text-3xl font-black tracking-tight sm:text-4xl">
                                {title}
                            </h3>
                            <p className="max-w-lg leading-7 text-[#c3d7d1]">
                                {desc}
                            </p>
                            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition group-hover:translate-x-2 group-hover:bg-[#f26a3d]">
                                <ArrowRight className="h-5 w-5" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
