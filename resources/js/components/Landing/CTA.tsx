import React from 'react';

const CTA = () => {
    return (
        <section className="px-6 py-24 bg-white">
            <div className="mx-auto max-w-5xl text-center">

                <h2 className="text-3xl font-semibold mb-6">
                    Ready to Build Your Future in Taiwan?
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Join hundreds of students and companies already connecting on
                    Taiwan Digital Talent.
                </p>

                <div className="flex gap-4 justify-center">
                    <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition">
                        Get Started
                    </button>
                    <button className="border border-black/20 px-6 py-3 rounded-full hover:bg-black/5 transition">
                        For Companies
                    </button>
                </div>

            </div>
        </section>
    );
};

export default CTA;