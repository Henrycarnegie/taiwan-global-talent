import React from 'react';

const companies = [
    'TSMC',
    'MediaTek',
    'ASUS',
    'Acer',
    'Delta Electronics',
    'Foxconn',
];

const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Acer_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/db/ASUS_ROG_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/43/Foxconn_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Gogoro_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/29/MediaTek_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Realtek_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/TSMC_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/71/Realtek_logo.svg',
];

const Companies = () => {
    return (
        <section id="companies" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 text-center text-3xl font-semibold">
                    Trusted By Leading Companies in Taiwan
                </h2>

                <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
                    {companies.map((company, i) => (
                        <p key={i}>{company}</p>
                    ))}
                    {logos.map((logo, i) => (
                        <img
                            key={i}
                            src={logo}
                            className="h-8 w-full object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                            alt="Company Logo"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
