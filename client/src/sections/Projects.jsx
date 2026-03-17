"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/utils/data";
import { Github, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import TiltCard from "@/components/TiltCard";

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
                    className="bg-slateDeep border border-indigo/20 rounded-2xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl"
                    style={{ perspective: 1000 }}
                >
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ rotate: 90, scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X className="w-6 h-6" />
                    </motion.button>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-mint font-mono text-sm mb-6">{project.date}</p>
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
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-indigo"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>
                    <div className="flex gap-4">
                        {project.github && (
                            <motion.a whileHover={{ scale: 1.05, y: -2 }} href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono text-sm transition-colors">
                                <Github className="w-4 h-4" /> Source
                            </motion.a>
                        )}
                        {project.live && (
                            <motion.a whileHover={{ scale: 1.05, y: -2 }} href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo/10 hover:bg-indigo/20 border border-indigo/30 rounded-lg text-indigo font-mono text-sm transition-colors">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </motion.a>
                        )}
                        {project.certificate && (
                            <motion.a whileHover={{ scale: 1.05, y: -2 }} href={project.certificate} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-mint/10 hover:bg-mint/20 border border-mint/30 rounded-lg text-mint font-mono text-sm transition-colors">
                                <ExternalLink className="w-4 h-4" /> Certificate
                            </motion.a>
                        )}
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
                <motion.h2 variants={cardVariants} className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                    <span className="text-indigo font-mono text-xl">05.</span>
                    Featured Systems
                    <div className="h-px bg-white/10 flex-1 ml-4" />
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div key={idx} variants={cardVariants} style={{ perspective: 800 }}>
                            <TiltCard className="group h-full" glareColor="rgba(99, 102, 241, 0.12)">
                                <div
                                    onClick={() => setSelectedProject(project)}
                                    className="glass-card p-6 flex flex-col justify-between cursor-pointer hover:border-indigo/50 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                                >
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <motion.div
                                                className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo group-hover:bg-indigo group-hover:text-white transition-colors"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Code className="w-5 h-5" />
                                            </motion.div>
                                            <div className="flex gap-3">
                                                {project.github && <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>}
                                                {project.live && <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>}
                                                {project.certificate && <a href={project.certificate} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-mint transition-colors"><ExternalLink className="w-5 h-5" /></a>}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo transition-colors">{project.title}</h3>
                                        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                            {project.description[0]}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 4).map((t, i) => (
                                            <span key={i} className="text-xs font-mono text-gray-500 group-hover:text-mint transition-colors">
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 4 && <span className="text-xs font-mono text-gray-500">+{project.tech.length - 4} more</span>}
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

function Code({ className }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
}
