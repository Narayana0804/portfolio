"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/utils/data";
import { Github, ExternalLink, X, Activity } from "lucide-react";
import { useState } from "react";
import TiltCard from "@/components/TiltCard";
import SectionHeader from "@/components/SectionHeader";

const SYSTEM_STATES = ["RUNNING", "DEPLOYED", "ACTIVE", "TRAINED", "OPTIMIZED", "LIVE", "STABLE"];

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, y: 40, rotateX: 10 }}
                    animate={{ scale: 1, y: 0, rotateX: 0 }}
                    exit={{ scale: 0.8, y: 40, rotateX: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slateDeep border border-indigo/20 rounded-2xl w-full max-w-2xl relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    style={{ perspective: 1000 }}
                >
                    {project.image && (
                        <div className="w-full h-48 md:h-64 relative border-b border-white/10 flex-shrink-0">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-[#0a0a0e]/50 pointer-events-none" />
                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors z-50"
                                whileHover={{ rotate: 90, scale: 1.1 }}
                            >
                                <X className="w-5 h-5" />
                            </motion.button>
                            <div className="absolute bottom-4 left-6 md:left-8 flex items-center gap-2 z-10">
                                <div className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                <span className="font-mono text-xs text-white/90 tracking-[0.2em] uppercase font-bold drop-shadow-md">SYSTEM ACTIVE</span>
                            </div>
                        </div>
                    )}
                    
                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                        {!project.image && (
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                                <span className="font-mono text-xs text-mint/50 tracking-[0.2em] uppercase">SYSTEM DETAILS</span>
                                <div className="flex-1" />
                                <motion.button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ rotate: 90, scale: 1.2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                        )}

                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-mint font-mono text-base mb-6">{project.date}</p>
                    <ul className="space-y-4 text-gray-300 mb-8">
                        {project.description.map((desc, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="flex items-start gap-3"
                            >
                                <span className="text-indigo mt-1">▹</span>
                                <span dangerouslySetInnerHTML={{ __html: desc.replace(/\d+%/g, match => `<span class="text-mint font-bold">${match}</span>`).replace(/[\w-]+ architecture/gi, match => `<span class="text-white font-bold">${match}</span>`) }} />
                            </motion.li>
                        ))}
                    </ul>
                    <motion.div
                        className="flex flex-wrap gap-2 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {project.tech.map((t, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.03 }}
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-base font-mono text-indigo"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>
                    <div className="flex gap-4">
                        {project.github && (
                            <motion.a whileHover={{ scale: 1.05, y: -2 }} href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono text-base transition-colors">
                                <Github className="w-4 h-4" /> Source
                            </motion.a>
                        )}
                        {project.live && (
                            <motion.a whileHover={{ scale: 1.05, y: -2 }} href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo/10 hover:bg-indigo/20 border border-indigo/30 rounded-lg text-indigo font-mono text-base transition-colors">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </motion.a>
                        )}
                        {project.certificate && (
                            <motion.a whileHover={{ scale: 1.05, y: -2 }} href={project.certificate} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-mint/10 hover:bg-mint/20 border border-mint/30 rounded-lg text-mint font-mono text-base transition-colors">
                                <ExternalLink className="w-4 h-4" /> Certificate
                            </motion.a>
                        )}
                    </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default function Projects() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selectedProject, setSelectedProject] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: 8 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <section id="projects" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <SectionHeader sectionId="projects" number="05" title="Featured Systems" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div key={idx} variants={cardVariants} style={{ perspective: 800 }}>
                            <TiltCard className="group h-full" glareColor="rgba(99, 102, 241, 0.12)">
                                <div
                                    onClick={() => setSelectedProject(project)}
                                    className="glass-card p-0 flex flex-col cursor-pointer hover:border-indigo/50 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden group/card relative"
                                >
                                    {project.image && (
                                        <div className="w-full h-48 sm:h-56 overflow-hidden relative border-b border-indigo/20/50 flex-shrink-0">
                                            <div className="absolute inset-0 bg-indigo-900/20 z-10 group-hover/card:bg-transparent transition-colors duration-500 mix-blend-overlay" />
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover/card:scale-110 group-hover/card:rotate-1 transition-all duration-700 opacity-80 group-hover/card:opacity-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-[#0a0a0e]/40 to-transparent z-10 pointer-events-none" />
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 flex flex-col justify-between z-20 relative bg-[#0a0a0e]/60 backdrop-blur-sm">
                                        <div>
                                        {/* System status badge */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                                            <span className="font-mono text-xs text-mint/50 tracking-[0.15em] uppercase">
                                                SYS_{String(idx + 1).padStart(2, '0')} • {SYSTEM_STATES[idx % SYSTEM_STATES.length]}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center mb-6">
                                            <motion.div
                                                className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo group-hover:bg-indigo group-hover:text-white transition-colors"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Activity className="w-5 h-5" />
                                            </motion.div>
                                            <div className="flex gap-3">
                                                {project.github && <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>}
                                                {project.live && <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>}
                                                {project.certificate && <a href={project.certificate} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-mint transition-colors"><ExternalLink className="w-5 h-5" /></a>}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo transition-colors">{project.title}</h3>
                                        <p className="text-gray-400 text-base mb-6 line-clamp-3">
                                            {project.description[0]}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tech.slice(0, 4).map((t, i) => (
                                                <span key={i} className="text-base font-mono text-gray-500 group-hover:text-mint transition-colors">
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && <span className="text-base font-mono text-gray-500">+{project.tech.length - 4} more</span>}
                                        </div>

                                        {/* Performance bar */}
                                        <div className="h-px bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-indigo/40 to-mint/40"
                                                initial={{ width: "0%" }}
                                                animate={inView ? { width: `${70 + Math.random() * 30}%` } : {}}
                                                transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="font-mono text-[8px] text-gray-600">{project.tech.length} modules</span>
                                            <span className="font-mono text-[8px] text-mint/30">system healthy</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </section>
    );
}
