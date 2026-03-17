import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Features from '@/sections/Features';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Certificates from '@/sections/Certificates';
import Contact from '@/sections/Contact';
// import AIChat from '@/sections/AIChat';
import CursorGlow from '@/components/CursorGlow';
import SplashCursor from '@/components/SplashCursor';
import CommandPaletteWrapper from '@/components/CommandPalette';
import Navbar from '@/components/Navbar';

export default function Home() {
    return (
        <main className="relative bg-background min-h-screen">
            <SplashCursor />
            <CursorGlow />
            <Navbar />
            <CommandPaletteWrapper>
                <div className="flex flex-col gap-24 pb-24">
                    <Hero />
                    <About />
                    <Features />
                    <Skills />
                    <Experience />
                    <Projects />
                    <Certificates />
                    <Contact />
                </div>
            </CommandPaletteWrapper>
            {/* <AIChat /> */}
        </main>
    );
}
