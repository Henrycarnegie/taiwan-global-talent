import React from 'react';

const logos = [
    { name: 'TSMC', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/TSMC_Logo.svg' },
    { name: 'MediaTek', url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/MediaTek_Logo.svg' },
    { name: 'ASUS', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/ASUS_ROG_logo.svg' },
    { name: 'Acer', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Acer_logo.svg' },
    { name: 'Foxconn', url: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Foxconn_Logo.svg' },
    { name: 'Gogoro', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Gogoro_Logo.svg' },
    { name: 'Realtek', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Realtek_logo.svg' }
];

const Companies = () => {
    return (
        <section id="companies" className="px-6 py-24 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">
                        Membantu Perusahaan Internasional Menemukan Tenaga Kerja Profesional
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-8 items-center justify-items-center md:grid-cols-4 lg:grid-cols-7 opacity-50">
                    {logos.map((logo, i) => (
                        <img
                            key={i}
                            src={logo.url}
                            className="h-7 w-28 object-contain grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
                            alt={`${logo.name} logo`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;