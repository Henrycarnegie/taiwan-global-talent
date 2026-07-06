import { ArrowUpRight } from 'lucide-react';

export default function CTA() {
    return (
        <section className="bg-[#fffaf0] px-5 py-24 sm:px-8 lg:py-32">
            <div className="mx-auto max-w-7xl text-center">
                <p className="text-xs font-black tracking-[0.2em] text-[#f26a3d] uppercase">
                    Ready when you are
                </p>
                <h2 className="mx-auto mt-5 max-w-5xl font-serif text-6xl leading-[0.88] font-black tracking-[-0.055em] text-[#173b36] sm:text-8xl lg:text-9xl">
                    Your Taiwan story can start today.
                </h2>
                <a
                    href="/login"
                    className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#f26a3d] px-8 py-5 text-sm font-black text-white shadow-[0_9px_0_#173b36] transition hover:-translate-y-1 hover:shadow-[0_13px_0_#173b36]"
                >
                    Join Taiwan Global Talent{' '}
                    <ArrowUpRight className="h-5 w-5" />
                </a>
            </div>
        </section>
    );
}
