import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#173b8f] px-5 py-14">
            <div className="mx-auto grid max-w-7xl gap-10 text-sm font-bold text-white md:grid-cols-[1.25fr_0.8fr_1.2fr_0.8fr]">
                <div>
                    <div className="text-2xl font-black text-white">
                        Taiwan Global Talent
                    </div>
                    <p className="mt-3 max-w-sm leading-7 text-white/72">
                        A practical platform for Mandarin learning, career
                        preparation, scholarships, and employer connections in
                        Taiwan.
                    </p>
                    <div className="mt-4 text-white/60">
                        © {new Date().getFullYear()} Taiwan Global Talent
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="font-black tracking-wide text-[#ffcb05] uppercase">
                        Site Links
                    </h4>
                    <a
                        href="#features"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        About
                    </a>
                    <a
                        href="#courses"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        View Pathways
                    </a>
                    <a
                        href="#companies"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        Partners
                    </a>
                    <a
                        href="/login"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        Sign In
                    </a>
                </div>

                <div className="space-y-3">
                    <h4 className="font-black tracking-wide text-[#ffcb05] uppercase">
                        Get Updated
                    </h4>
                    <p className="leading-7 text-white/72">
                        Be the first to know about new pathways, scholarship
                        windows, and Taiwan career events.
                    </p>
                    <div className="flex rounded-md bg-white p-1">
                        <input
                            className="min-w-0 flex-1 bg-transparent px-3 text-xs text-[#173b8f] outline-none"
                            placeholder="Type your email..."
                        />
                        <button className="rounded-md bg-[#f47b20] px-4 py-2 text-xs font-black text-white">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="font-black tracking-wide text-[#ffcb05] uppercase">
                        Follow
                    </h4>
                    <a
                        href="#"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        Facebook
                    </a>
                    <a
                        href="#"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        Instagram
                    </a>
                    <a
                        href="#"
                        className="block text-white/78 transition hover:text-[#ffcb05]"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
