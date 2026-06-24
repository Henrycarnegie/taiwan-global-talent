import React from 'react';
import LoginGoogle from '../Button/LoginGoogle';

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="text-lg font-semibold tracking-tight">
                    Taiwan Digital Talent
                </div>

                <div className="hidden gap-8 text-sm text-gray-600 md:flex">
                    <a href="#features">Features</a>
                    <a href="#companies">Companies</a>
                    <a href="#how">How it works</a>
                </div>

                <div className="flex gap-2">
                    <button className="rounded-full bg-black px-4 py-2 text-sm text-white transition hover:opacity-90">
                        Get Started
                    </button>
                    <LoginGoogle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
