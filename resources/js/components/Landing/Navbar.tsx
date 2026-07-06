import LoginGoogle from '../UI/LoginGoogle';

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#173b36]/10 bg-[#fffaf0]/90 px-5 py-3 shadow-[0_10px_40px_rgba(29,59,54,0.08)] backdrop-blur-xl sm:px-7">
                <a href="#top" className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1f4d46] text-sm font-black text-[#fffaf0]">
                        TW
                    </span>
                    <span className="hidden text-sm font-black tracking-[-0.02em] text-[#173b36] sm:block">
                        Taiwan Global Talent
                    </span>
                </a>

                <div className="hidden items-center gap-8 text-sm font-semibold text-[#42635d] md:flex">
                    <a
                        className="transition hover:text-[#f26a3d]"
                        href="#features"
                    >
                        Programs
                    </a>
                    <a className="transition hover:text-[#f26a3d]" href="#how">
                        How it works
                    </a>
                    <a
                        className="transition hover:text-[#f26a3d]"
                        href="#companies"
                    >
                        Partners
                    </a>
                </div>

                <LoginGoogle />
            </div>
        </nav>
    );
}
