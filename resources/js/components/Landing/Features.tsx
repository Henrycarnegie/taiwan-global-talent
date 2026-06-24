import React from 'react';

const features = [
    {
        title: 'Smart Talent Matching',
        desc: 'AI-powered matching between students and companies in Taiwan.',
    },
    {
        title: 'Scholarship Discovery',
        desc: 'Find fully funded scholarships from Taiwanese universities.',
    },
    {
        title: 'Career Opportunities',
        desc: 'Internships and full-time jobs from top tech companies.',
    },
    {
        title: 'Mandarin Learning Path',
        desc: 'Structured learning to prepare for life in Taiwan.',
    },
];

const Features = () => {
    return (
        <section id="features" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 text-center text-3xl font-semibold">
                    Everything You Need to Succeed in Taiwan
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-black/10 p-6 transition hover:shadow-sm"
                        >
                            <h3 className="text-lg font-semibold">{f.title}</h3>
                            <p className="mt-2 text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
