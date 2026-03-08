"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/utils/data";
import { Github, ExternalLink, X } from "lucide-react";
import { useState } from "react";

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
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slateDeep border border-indigo/20 rounded-2xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-mint font-mono text-sm mb-6">{project.date}</p>
                    <ul className="space-y-4 text-gray-300 mb-8">
                        {project.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="text-indigo mt-1">▹</span>
                                <span dangerouslySetInnerHTML={{ __html: desc.replace(/\d+%/g, match => `<span class="text-mint font-bold">${match}</span>`).replace(/[\w-]+ architecture/gi, match => `<span class="text-white font-bold">${match}</span>`) }} />
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-indigo">
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono text-sm transition-colors">
                                <Github className="w-4 h-4" /> Source
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo/10 hover:bg-indigo/20 border border-indigo/30 rounded-lg text-indigo font-mono text-sm transition-colors">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                        {project.certificate && (
                            <a href={project.certificate} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-mint/10 hover:bg-mint/20 border border-mint/30 rounded-lg text-mint font-mono text-sm transition-colors">
                                <ExternalLink className="w-4 h-4" /> Certificate
                            </a>
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

    return (
        <section id="projects" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                    <span className="text-indigo font-mono text-xl">04.</span>
                    Featured Systems
                    <div className="h-px bg-white/10 flex-1 ml-4" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedProject(project)}
                            className="glass-card p-6 flex flex-col justify-between cursor-pointer group hover:border-indigo/50 transition-all duration-300"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo group-hover:bg-indigo group-hover:text-white transition-colors">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <div className="flex gap-3">
                                        {project.github && <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><Github className="w-5 h-5" /></a>}
                                        {project.live && <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><ExternalLink className="w-5 h-5" /></a>}
                                        {project.certificate && <a href={project.certificate} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-mint"><ExternalLink className="w-5 h-5" /></a>}
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
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </section>
    );
}

function Code({ className }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
}
