import React from 'react';

const Testimonials = () => {
    return (
        <section className="px-6 py-24 bg-gray-50">
            <div className="mx-auto max-w-4xl">
                <h2 className="mb-12 text-center text-3xl font-semibold">
                    What Students Say
                </h2>

                <div className="rounded-2xl border border-black/10 bg-white p-8 text-center">
                    <p className="text-lg italic text-gray-600">
                        "This platform helped me understand my pathway to study
                        and work in Taiwan. The opportunities and guidance are
                        very clear."
                    </p>

                    <div className="mt-6 font-semibold">
                        International Student
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;