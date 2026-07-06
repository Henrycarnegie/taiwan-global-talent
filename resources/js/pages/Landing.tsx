import Companies from '@/components/Landing/Companies';
import CTA from '@/components/Landing/CTA';
import Features from '@/components/Landing/Features';
import Footer from '@/components/Landing/Footer';
import Hero from '@/components/Landing/Hero';
import HowItWorks from '@/components/Landing/HowItWorks';
import Membership from '@/components/Landing/Membership';
import Navbar from '@/components/Landing/Navbar';
import Stats from '@/components/Landing/Stats';

export default function Landing() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#fffaf0] font-sans text-[#173b36] antialiased selection:bg-[#f6c453] selection:text-[#173b36]">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Features />
                <HowItWorks />
                <Membership />
                <Companies />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
