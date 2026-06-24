import React from 'react';
import Companies from '@/components/Landing/Companies';
import CTA from '@/components/Landing/CTA';
import Features from '@/components/Landing/Features';
import Footer from '@/components/Landing/Footer';
import Hero from '@/components/Landing/Hero';
import HowItWorks from '@/components/Landing/HowItWorks';
import Navbar from '@/components/Landing/Navbar';
import Stats from '@/components/Landing/Stats';
import Testimonials from '@/components/Landing/Testimonials';

export default function Landing() {
    return (
        <div className="font-sans text-gray-900">
            <Navbar />
            <Hero />
            <Stats />
            <Features />
            <HowItWorks />
            <Companies />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}
