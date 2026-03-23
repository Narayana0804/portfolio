"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Research" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["hero", ...NAV_ITEMS.map(n => n.id)];
            const viewportCenter = window.innerHeight / 3;
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
                    <div className="font-mono text-xl font-bold text-white cursor-pointer flex items-center gap-2" onClick={() => scrollTo("hero")}>
                        <motion.div
                            animate={{
                                boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 10px rgba(99,102,241,0.5)", "0 0 0px rgba(99,102,241,0)"]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-indigo"
                        />
                        LN<span className="text-mint">.lab</span>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex gap-1 font-mono text-sm">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={`relative px-3 py-2 rounded-md transition-all duration-200 ${activeSection === item.id
                                        ? "text-indigo"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo shadow-[0_0_6px_rgba(99,102,241,0.8)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex font-mono text-xs border border-white/15 rounded-md px-2 py-1 text-gray-500 items-center gap-1">
                            <span>⌘</span><span>K</span>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden text-gray-400 hover:text-white transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10 md:hidden"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`block w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all ${activeSection === item.id
                                            ? "text-indigo bg-indigo/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <span className="text-mint/40 mr-2">›</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
