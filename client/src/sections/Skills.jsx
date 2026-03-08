"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/utils/data";

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const renderCategory = (title, items) => (
        <motion.div variants={itemVariants} className="glass-card p-6 border-white/5 hover:border-white/20 transition-colors">
            <h3 className="text-mint font-mono text-sm mb-4">$ {title.toUpperCase()}</h3>
            <ul className="grid grid-cols-2 gap-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 font-mono text-sm">
                        <span className="text-indigo">❯</span> {item}
                    </li>
                ))}
            </ul>
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
                <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                    <span className="text-indigo font-mono text-xl">02.</span>
                    Technical Arsenal
                    <div className="h-px bg-white/10 flex-1 ml-4" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {renderCategory("Languages", skills.languages)}
                    {renderCategory("Frameworks", skills.frameworks)}
                    {renderCategory("Tools", skills.tools)}
                    {renderCategory("Soft_Skills", skills.softSkills)}
                </div>
            </motion.div>
        </section>
    );
}
