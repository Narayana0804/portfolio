"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_STATES = {
    hero: { status: "ONLINE", message: "Lab entry portal active", icon: "◉" },
    about: { status: "LOADED", message: "Scientist profile initialized", icon: "◎" },
    features: { status: "PROCESSING", message: "Core modules scanning...", icon: "⟐" },
    skills: { status: "ACTIVATED", message: "Tech stack control panel online", icon: "⬡" },
    experience: { status: "STREAMING", message: "Experiment data flowing...", icon: "◈" },
    projects: { status: "RUNNING", message: "Active AI systems detected", icon: "⬢" },
    certificates: { status: "VERIFIED", message: "Research achievements loaded", icon: "◆" },
    contact: { status: "OPEN", message: "Communication channel ready", icon: "◇" },
};

export default function SectionStatusIndicator() {
    const [currentSection, setCurrentSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["hero", "about", "features", "skills", "experience", "projects", "certificates", "contact"];
            const viewportCenter = window.innerHeight / 2;
            const scrollY = window.scrollY;

            setIsVisible(scrollY > 100);

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                        if (currentSection !== id) {
                            setCurrentSection(id);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentSection]);

    const sectionState = SECTION_STATES[currentSection] || SECTION_STATES.hero;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-start gap-3"
                >
                    {/* Status line */}
                    <div className="flex items-center gap-2">
                        <motion.div
                            key={currentSection}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"
                        />
                        <span className="font-mono text-xs text-mint tracking-[0.2em] uppercase">
                            {sectionState.status}
                        </span>
                    </div>

                    {/* Section dots */}
                    <div className="flex flex-col gap-2 ml-[3px]">
                        {Object.keys(SECTION_STATES).map((id) => (
                            <motion.button
                                key={id}
                                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentSection === id
                                        ? "bg-indigo shadow-[0_0_6px_rgba(99,102,241,0.8)] scale-150"
                                        : "bg-white/15 hover:bg-white/30"
                                }`}
                                whileHover={{ scale: 2 }}
                                title={id.charAt(0).toUpperCase() + id.slice(1)}
                            />
                        ))}
                    </div>

                    {/* Narrative message */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="font-mono text-xs text-gray-500 max-w-[120px] leading-tight mt-1"
                        >
                            <span className="text-indigo/60">{sectionState.icon}</span>{" "}
                            {sectionState.message}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
