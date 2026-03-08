"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "@/utils/data";

export default function Experience() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="experience" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                    <span className="text-indigo font-mono text-xl">03.</span>
                    Experience
                    <div className="h-px bg-white/10 flex-1 ml-4" />
                </h2>

                <div className="relative border-l border-indigo/30 ml-4 md:ml-6 pl-8 space-y-12">
                    {experience.map((exp, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slateDeep border-2 border-indigo group-hover:bg-indigo group-hover:shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-300"></div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo transition-colors">{exp.role} <span className="text-mint">@ {exp.company}</span></h3>
                                </div>
                                <div className="text-gray-500 font-mono text-sm mt-1 md:mt-0">{exp.date}</div>
                            </div>

                            <ul className="space-y-3 text-gray-400 mb-6">
                                {exp.description.map((desc, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-indigo mt-1">▹</span>
                                        <span dangerouslySetInnerHTML={{ __html: desc.replace(/\d+%/g, match => `<span class="text-mint font-bold">${match}</span>`) }} />
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
