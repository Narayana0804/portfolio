"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
                <div className="font-mono text-xl font-bold text-white cursor-pointer" onClick={() => scrollTo("hero")}>
                    LN<span className="text-mint">.dev</span>
                </div>
                <div className="hidden md:flex gap-8 font-mono text-sm">
                    <button onClick={() => scrollTo("about")} className="text-gray-400 hover:text-white transition-colors">About</button>
                    <button onClick={() => scrollTo("experience")} className="text-gray-400 hover:text-white transition-colors">Experience</button>
                    <button onClick={() => scrollTo("projects")} className="text-gray-400 hover:text-white transition-colors">Projects</button>
                    <button onClick={() => scrollTo("contact")} className="text-gray-400 hover:text-white transition-colors">Contact</button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex font-mono text-xs border border-white/20 rounded-md px-2 py-1 text-gray-400">
                        <span className="mr-1">⌘</span>K
                    </div>
                </div>
            </div>
        </nav>
    );
}
