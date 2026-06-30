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
        <div className="font-sans text-slate-900 bg-slate-50/50 antialiased selection:bg-red-500 selection:text-white">
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