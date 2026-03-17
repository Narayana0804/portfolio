"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/utils/data";
import TiltCard from "@/components/TiltCard";

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, rotateX: 15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0 }
    };

    const renderCategory = (title, items, glareColor) => (
        <motion.div variants={cardVariants} style={{ perspective: 800 }}>
            <TiltCard className="group h-full" glareColor={glareColor}>
                <div className="glass-card p-6 border-white/5 hover:border-white/20 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                    <h3 className="text-mint font-mono text-sm mb-4">$ {title.toUpperCase()}</h3>
                    <motion.ul
                        className="grid grid-cols-2 gap-2"
                        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    >
                        {items.map((item, idx) => (
                            <motion.li
                                key={idx}
                                variants={itemVariants}
                                whileHover={{
                                    x: 5,
                                    color: "#6366f1",
                                    transition: { duration: 0.2 }
                                }}
                                className="flex items-center gap-2 text-gray-300 font-mono text-sm cursor-default"
                            >
                                <motion.span
                                    className="text-indigo"
                                    whileHover={{ scale: 1.4, rotate: 90 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    ❯
                                </motion.span>
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </TiltCard>
        </motion.div>
    );

    return (
        <section id="skills" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.h2 variants={cardVariants} className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                    <span className="text-indigo font-mono text-xl">03.</span>
                    Technical Arsenal
                    <div className="h-px bg-white/10 flex-1 ml-4" />
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {renderCategory("Languages", skills.languages, "rgba(99, 102, 241, 0.15)")}
                    {renderCategory("Frameworks", skills.frameworks, "rgba(45, 212, 191, 0.15)")}
                    {renderCategory("Tools", skills.tools, "rgba(250, 204, 21, 0.15)")}
                    {renderCategory("Soft_Skills", skills.softSkills, "rgba(244, 114, 182, 0.15)")}
                </div>
            </motion.div>
        </section>
    );
}
