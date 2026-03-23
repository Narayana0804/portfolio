"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { extracurricular } from "@/utils/data";
import SectionHeader from "@/components/SectionHeader";

export default function Extracurricular() {
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

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="extracurricular" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <SectionHeader sectionId="extracurricular" number="07" title="Extracurricular" />

                <div className="relative border-l border-indigo/30 ml-4 md:ml-6 pl-8 space-y-12 mt-6">
                    <motion.div
                        className="absolute left-0 top-0 w-px bg-gradient-to-b from-indigo via-mint to-transparent"
                        initial={{ height: "0%" }}
                        animate={inView ? { height: "100%" } : {}}
                        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                        style={{ marginLeft: "-0.5px" }}
                    />

                    {extracurricular.map((item, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="relative group">
                            <motion.div
                                className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slateDeep border-2 border-indigo group-hover:bg-indigo transition-all duration-300"
                                whileHover={{ scale: 1.4, boxShadow: "0 0 20px rgba(99,102,241,0.8)" }}
                                animate={inView ? {
                                    boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 15px rgba(99,102,241,0.6)", "0 0 0px rgba(99,102,241,0)"],
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                            />

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo transition-colors">{item.title}</h3>
                                    <h4 className="text-lg text-mint mt-1">{item.organizer}</h4>
                                </div>
                                <div className="text-gray-500 font-mono text-base mt-2 md:mt-0 flex flex-col md:items-end">
                                    <span>{item.date}</span>
                                    <span className="text-sm">{item.location}</span>
                                </div>
                            </div>

                            <motion.ul
                                className="space-y-3 text-gray-400 mb-6 mt-4"
                                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                            >
                                {item.description.map((desc, i) => (
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
                                        <span>{desc}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                className="flex flex-wrap gap-2 mb-6"
                                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                            >
                                {item.tags.map((t, i) => (
                                    <motion.span
                                        key={i}
                                        variants={tagVariants}
                                        whileHover={{
                                            scale: 1.1,
                                            borderColor: "rgba(99,102,241,0.5)",
                                            transition: { duration: 0.2 }
                                        }}
                                        className="text-sm font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo cursor-default"
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </motion.div>
                            
                            {item.image && (
                                <motion.div 
                                    className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 mt-4 group relative"
                                    whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
