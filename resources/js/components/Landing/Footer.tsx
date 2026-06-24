import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-black/10 px-6 py-10">
            <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 text-sm text-gray-600 md:flex-row">
                <div>Taiwan Digital Talent © {new Date().getFullYear()}</div>

                <div className="flex gap-6">
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
