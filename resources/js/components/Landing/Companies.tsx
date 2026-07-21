import React from 'react';

const logos = [
    {
        name: 'TSMC',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/TSMC_wordmark.svg',
    },
    {
        name: 'MediaTek',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/MediaTek_logo.svg',
    },
    {
        name: 'ASUS',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ASUS_Logo.svg',
    },
    {
        name: 'Acer',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Acer_2011.svg',
    },
    {
        name: 'Foxconn',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Foxconn_logo_(2).svg',
    },
    {
        name: 'Gogoro',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gogoro.svg',
    },
    {
        name: 'Realtek',
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Realtek_logotype.svg',
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
                            className="flex h-20 w-full items-center justify-center rounded-lg border-2 border-[#173b8f]/15 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#f47b20]/40 hover:shadow-md"
                        >
                            <img
                                src={logo.url}
                                className="h-9 w-32 object-contain transition duration-300 hover:scale-105"
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
