import React from 'react';

const steps = [
    'Create your profile',
    'Upload skills & experience',
    'Get matched automatically',
    'Apply to opportunities in Taiwan',
];

const HowItWorks = () => {
    return (
        <section id="how" className="bg-black px-6 py-24 text-white">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="mb-12 text-3xl font-semibold">How It Works</h2>

                <div className="space-y-6">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center gap-4"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-black">
                                {i + 1}
                            </div>
                            <p>{s}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
