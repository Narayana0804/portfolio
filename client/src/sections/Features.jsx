"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MagicBento from "@/components/MagicBento";

export default function Features() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="features" className="px-6 lg:px-12 max-w-6xl mx-auto w-full py-24">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                className="space-y-16"
            >
                <div className="text-center max-w-3xl mx-auto">
                    <motion.p variants={itemVariants} className="text-indigo font-mono mb-4 text-sm tracking-widest uppercase">02. Core Capabilities</motion.p>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">Engineering Intelligence</motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed">
                        I focus on building high-performance solutions that bridge the gap between complex AI algorithms and real-world scalability.
                    </motion.p>
                </div>

                <motion.div variants={itemVariants} className="w-full">
                    <MagicBento 
                        textAutoHide={true}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={400}
                        particleCount={15}
                        glowColor="99, 102, 241"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
