import React from 'react';

const logos = [
    {
        name: 'TSMC',
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/TSMC_Logo.svg',
    },
    {
        name: 'MediaTek',
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/MediaTek_Logo.svg',
    },
    {
        name: 'ASUS',
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/ASUS_ROG_logo.svg',
    },
    {
        name: 'Acer',
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Acer_logo.svg',
    },
    {
        name: 'Foxconn',
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Foxconn_Logo.svg',
    },
    {
        name: 'Gogoro',
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Gogoro_Logo.svg',
    },
    {
        name: 'Realtek',
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Realtek_logo.svg',
    },
];

const Companies = () => {
    return (
        <section id="companies" className="bg-white px-5 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="text-3xl font-black tracking-tight text-[#173b8f] md:text-4xl">
                        Helping International Companies Find Professional Talent
                    </h2>
                </div>

                <div className="grid grid-cols-2 items-center justify-items-center gap-5 md:grid-cols-4 lg:grid-cols-7">
                    {logos.map((logo, i) => (
                        <div
                            key={i}
                            className="flex h-20 w-full items-center justify-center rounded-lg border-2 border-[#173b8f]/15 bg-[#fff7d7] p-4"
                        >
                            <img
                                src={logo.url}
                                className="h-7 w-28 object-contain grayscale transition duration-300 hover:grayscale-0"
                                alt={`${logo.name} logo`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
