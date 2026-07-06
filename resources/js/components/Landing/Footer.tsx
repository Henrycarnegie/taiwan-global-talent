export default function Footer() {
    return (
        <footer className="rounded-t-[2.5rem] bg-[#173b36] px-5 py-12 text-[#fffaf0] sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 md:flex-row md:items-end">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f6c453] text-sm font-black text-[#173b36]">
                                TW
                            </span>
                            <span className="font-serif text-2xl font-black">
                                Taiwan Global Talent
                            </span>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-6 text-[#b7d0c8]">
                            A clearer, warmer pathway to learning, studying, and
                            building a career in Taiwan.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm font-bold">
                        <a href="#features">Programs</a>
                        <a href="#how">How it works</a>
                        <a href="#companies">Partners</a>
                        <a href="/login">Sign in</a>
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-[#8fafaa] sm:flex-row">
                    <span>
                        © {new Date().getFullYear()} Taiwan Global Talent
                    </span>
                    <span>Made for global talent with big plans.</span>
                </div>
            </div>
        </footer>
    );
}
