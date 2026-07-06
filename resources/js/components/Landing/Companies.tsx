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
        <section id="companies" className="bg-[#f3eadb] px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xs font-black tracking-[0.2em] text-[#f26a3d] uppercase">
                        Trusted connections
                    </p>
                    <h2 className="mt-4 font-serif text-4xl font-black tracking-tight text-[#173b36] sm:text-5xl">
                        Meet the organizations shaping Taiwan’s future
                    </h2>
                </div>

                <div className="grid grid-cols-2 items-center justify-items-center gap-8 opacity-60 md:grid-cols-4 lg:grid-cols-7">
                    {logos.map((logo, i) => (
                        <img
                            key={i}
                            src={logo.url}
                            className="h-7 w-28 object-contain grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                            alt={`${logo.name} logo`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
