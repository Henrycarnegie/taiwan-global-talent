import React from 'react';
import Companies from '@/components/Landing/Companies';
import CTA from '@/components/Landing/CTA';
import Features from '@/components/Landing/Features';
import Footer from '@/components/Landing/Footer';
import Hero from '@/components/Landing/Hero';
import HowItWorks from '@/components/Landing/HowItWorks';
import Membership from '@/components/Landing/Membership';
import Navbar from '@/components/Landing/Navbar';
import Stats from '@/components/Landing/Stats';
import CorePillars from '@/components/UI/CorePillars';

export default function Landing() {
    return (
        <div className="bg-white font-sans text-[#173b8f] antialiased selection:bg-[#ffcb05] selection:text-[#173b8f]">
            <Navbar />
            <Hero />
            <Stats />

            <CorePillars />

            <Features />
            <Membership />

            <HowItWorks />
            <Companies />
            <CTA />
            <Footer />
        </div>
    );
}
