"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";

import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Features from "@/sections/Features";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Certificates from "@/sections/Certificates";
import Contact from "@/sections/Contact";
import Extracurricular from "@/sections/Extracurricular";

const SECTIONS = {
    about: { component: About, title: "Scientist Profile", label: "PROFILE_TERMINAL" },
    skills: { component: Skills, title: "Tech Stack", label: "TECH_CONTROL_PANEL" },
    features: { component: Features, title: "Core Modules", label: "CORE_MODULES" },
    experience: { component: Experience, title: "Experiments", label: "EXPERIMENT_TIMELINE" },
    projects: { component: Projects, title: "Active Systems", label: "ACTIVE_AI_SYSTEMS" },
    certificates: { component: Certificates, title: "Research Archive", label: "RESEARCH_ARCHIVE" },
    contact: { component: Contact, title: "Communications", label: "COMM_CHANNEL" },
    extracurricular: { component: Extracurricular, title: "Extracurriculars", label: "ACTIVITY_LOG" },
};

export default function SectionOverlay({ section, onClose }) {
    const config = SECTIONS[section];
    if (!config) return null;
    const SectionComponent = config.component;

    return (
        <motion.div
            key={section}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl overflow-y-auto"
        >
            {/* Top header bar */}
            <div className="sticky top-0 z-[70] bg-background/80 backdrop-blur-xl border-b border-borderLight">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
                    <motion.button
                        onClick={onClose}
                        className="flex items-center gap-2 text-textMain/70 hover:text-textMain transition-colors font-mono text-sm group"
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:text-indigo transition-colors" />
                        <span className="hidden sm:inline">Back to Lab</span>
                    </motion.button>

                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse shadow-[0_0_6px_var(--color-accent)]" />
                        <span className="font-mono text-xs text-mint/80 tracking-[0.2em] uppercase">
                            {config.label}
                        </span>
                    </div>

                    <motion.button
                        onClick={onClose}
                        className="p-2 rounded-lg text-textMain/70 hover:text-textMain hover:bg-surface transition-all"
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Section content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pb-20 text-lg"
            >
                <SectionComponent />
            </motion.div>

        </motion.div>
    );
}
