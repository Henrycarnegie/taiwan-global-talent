import { ChevronDown, Compass } from 'lucide-react';
import LoginGoogle from '../UI/LoginGoogle';

const Navbar = () => {
    const dropdownLinkClasses =
        'flex items-center gap-1 px-3 py-2 transition hover:text-[#f47b20]';

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-[#173b8f]/10 bg-white/96">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <a href="/" className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#173b8f] text-lg font-extrabold text-white">
                        TGT
                    </span>
                    <div className="leading-tight">
                        <div className="text-lg font-extrabold tracking-tight text-[#173b8f]">
                            Taiwan Global Talent
                        </div>
                        <div className="text-[11px] font-semibold tracking-wide text-[#173b8f]/58 uppercase">
                            Learning • Careers • Mobility
                        </div>
                    </div>
                </a>

                <div className="hidden items-center gap-2 text-sm font-bold text-[#173b8f] lg:flex">
                    <a className={dropdownLinkClasses} href="#programs">
                        Programs
                        <ChevronDown className="h-3.5 w-3.5" />
                    </a>
                    <a className={dropdownLinkClasses} href="#courses">
                        Courses
                        <ChevronDown className="h-3.5 w-3.5" />
                    </a>
                    <a
                        className="px-3 py-2 transition hover:text-[#f47b20]"
                        href="#courses"
                    >
                        Pathways
                    </a>
                    <a
                        className="px-3 py-2 transition hover:text-[#f47b20]"
                        href="#features"
                    >
                        About
                    </a>
                    <a
                        className="px-3 py-2 transition hover:text-[#f47b20]"
                        href="#companies"
                    >
                        Partners
                    </a>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href="#courses"
                        aria-label="View learning pathways"
                        className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#173b8f] text-white transition hover:bg-[#f47b20] sm:flex"
                    >
                        <Compass className="h-5 w-5" />
                    </a>
                    <LoginGoogle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
