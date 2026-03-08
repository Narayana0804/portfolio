"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certificates, education } from "@/utils/data";
import { Award, GraduationCap } from "lucide-react";

export default function Certificates() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="certificates" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12 flex flex-col gap-16">
            <div className="flex flex-col lg:flex-row gap-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                        <span className="text-indigo font-mono text-xl">05.</span>
                        Education
                        <div className="h-px bg-white/10 flex-1 ml-4" />
                    </h2>

                    <div className="space-y-8">
                        {education.map((edu, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="mt-1 w-10 h-10 rounded-full bg-slateDeep border border-indigo/30 flex items-center justify-center text-indigo shrink-0">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                                    <p className="text-gray-400 font-mono text-sm">{edu.degree}</p>
                                    <p className="text-mint text-sm font-semibold mt-1">{edu.score}</p>
                                    <p className="text-gray-500 font-mono text-xs mt-1">{edu.date} | {edu.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1"
                >
                    <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                        <span className="text-indigo font-mono text-xl">06.</span>
                        Certifications
                        <div className="h-px bg-white/10 flex-1 ml-4" />
                    </h2>

                    <div className="space-y-6">
                        {certificates.map((cert, idx) => (
                            <div key={idx} className="glass-card p-4 hover:border-mint/30 transition-colors flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center text-mint shrink-0 group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-white leading-tight mb-1 group-hover:text-mint transition-colors">{cert.title}</h3>
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                                        <span className="text-indigo">{cert.issuer}</span>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-gray-500">{cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Certificate Images Gallery */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.filter(cert => cert.image).map((cert, idx) => (
                        <div key={`img-${idx}`} className="glass-card group overflow-hidden relative aspect-[4/3]">
                            <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h4 className="text-white font-bold text-sm leading-tight">{cert.title}</h4>
                                <p className="text-mint font-mono text-xs mt-1">{cert.issuer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
