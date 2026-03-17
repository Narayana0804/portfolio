"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "@/utils/data";

export default function Experience() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
        visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    const techVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="experience" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                    <span className="text-indigo font-mono text-xl">04.</span>
                    Experience
                    <div className="h-px bg-white/10 flex-1 ml-4" />
                </motion.h2>

                <div className="relative border-l border-indigo/30 ml-4 md:ml-6 pl-8 space-y-12">
                    {experience.map((exp, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="relative group">
                            <motion.div
                                className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slateDeep border-2 border-indigo group-hover:bg-indigo transition-all duration-300"
                                whileHover={{ scale: 1.4, boxShadow: "0 0 20px rgba(99,102,241,0.8)" }}
                                animate={inView ? {
                                    boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 15px rgba(99,102,241,0.6)", "0 0 0px rgba(99,102,241,0)"],
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                            />

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo transition-colors">{exp.role} <span className="text-mint">@ {exp.company}</span></h3>
                                </div>
                                <div className="text-gray-500 font-mono text-sm mt-1 md:mt-0">{exp.date}</div>
                            </div>

                            <motion.ul
                                className="space-y-3 text-gray-400 mb-6"
                                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                            >
                                {exp.description.map((desc, i) => (
                                    <motion.li
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                                        }}
                                        className="flex items-start gap-3"
                                    >
                                        <motion.span
                                            className="text-indigo mt-1"
                                            whileHover={{ scale: 1.3, rotate: 90 }}
                                        >
                                            ▹
                                        </motion.span>
                                        <span dangerouslySetInnerHTML={{ __html: desc.replace(/\d+%/g, match => `<span class="text-mint font-bold">${match}</span>`) }} />
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                className="flex flex-wrap gap-2"
                                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                            >
                                {exp.tech.map((t, i) => (
                                    <motion.span
                                        key={i}
                                        variants={techVariants}
                                        whileHover={{
                                            scale: 1.1,
                                            borderColor: "rgba(99,102,241,0.5)",
                                            transition: { duration: 0.2 }
                                        }}
                                        className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo cursor-default"
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
