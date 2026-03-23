"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const SECTION_LABELS = {
    hero: "LAB_ENTRY_PORTAL",
    about: "SCIENTIST_PROFILE",
    features: "CORE_MODULES",
    skills: "TECH_CONTROL_PANEL",
    experience: "EXPERIMENT_TIMELINE",
    projects: "ACTIVE_AI_SYSTEMS",
    certificates: "RESEARCH_ARCHIVE",
    contact: "COMM_CHANNEL",
};

const SECTION_MESSAGES = {
    hero: "System initialized. Welcome aboard.",
    about: "Loading scientist profile data...",
    features: "Scanning core capability modules...",
    skills: "Activating tech stack nodes...",
    experience: "Streaming experiment data pipeline...",
    projects: "Detecting active AI systems...",
    certificates: "Verifying research credentials...",
    contact: "Opening communication protocol...",
};

export default function SectionHeader({ sectionId, number, title, children }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [statusMessage, setStatusMessage] = useState("");
    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        if (inView) {
            setShowStatus(true);
            const msg = SECTION_MESSAGES[sectionId] || "";
            let i = 0;
            setStatusMessage("");
            const interval = setInterval(() => {
                if (i < msg.length) {
                    setStatusMessage(msg.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 25);
            return () => clearInterval(interval);
        }
    }, [inView, sectionId]);

    const label = SECTION_LABELS[sectionId] || sectionId?.toUpperCase();

    return (
        <div ref={ref}>
            {/* System label bar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-2"
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={inView ? {
                            boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 8px rgba(16,185,129,0.6)", "0 0 0px rgba(16,185,129,0)"]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-mint"
                    />
                    <span className="font-mono text-xs text-mint/60 tracking-[0.3em] uppercase">
                        {label}
                    </span>
                </div>
                <div className="h-px bg-mint/10 flex-1" />
            </motion.div>

            {/* Main heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-3xl font-bold flex items-center gap-4 mb-2 relative"
            >
                <span className="text-indigo font-mono text-xl">{number}.</span>
                {title}
                <div className="h-px bg-white/10 flex-1 ml-4" />
            </motion.h2>

            {/* Status message */}
            {showStatus && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="font-mono text-sm text-gray-500 mb-8"
                >
                    <span className="text-indigo/50">$</span> {statusMessage}
                    <span className="animate-pulse">▊</span>
                </motion.p>
            )}

            {children}
        </div>
    );
}
