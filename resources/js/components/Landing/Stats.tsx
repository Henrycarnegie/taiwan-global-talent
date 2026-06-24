import React from 'react';

const stats = [
    { label: 'Students', value: '2,500+' },
    { label: 'Companies', value: '180+' },
    { label: 'Universities', value: '45+' },
    { label: 'Opportunities', value: '1,200+' },
];

const Stats = () => {
    return (
        <section className="border-y border-black/5 py-16">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
                {stats.map((s, i) => (
                    <div key={i}>
                        <div className="text-2xl font-semibold">{s.value}</div>
                        <div className="text-sm text-gray-500">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
