"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TiltCard from "@/components/TiltCard";
import SectionHeader from "@/components/SectionHeader";

export default function About() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <section id="about" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                className="flex flex-col md:flex-row gap-12"
            >
                <div className="flex-1">
                    <SectionHeader sectionId="about" number="01" title="About Me" />
                    <div className="text-gray-400 space-y-4 text-lg leading-relaxed">
                        <motion.p variants={itemVariants}>
                            An AI & ML Engineer focused on designing scalable and reliable systems. I specialize in taking theoretical machine learning concepts and engineering them into robust, high-performance applications.
                        </motion.p>
                        <motion.p variants={itemVariants}>
                            My journey involves working across the full stack—from engineering real-time crowd density estimation pipelines using PyTorch, to building responsive web dashboards with React and Node.js.
                        </motion.p>
                        <motion.p variants={itemVariants}>
                            When I&apos;m not optimizing algorithms or debugging distributed systems, I enjoy participating in hackathons and exploring new frontiers in generative AI and cloud infrastructure.
                        </motion.p>
                    </div>
                </div>

                <motion.div variants={itemVariants} className="flex-1 lg:pl-12">
                    <TiltCard className="group" glareColor="rgba(99, 102, 241, 0.12)">
                        <div className="glass-card p-6 border-indigo/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 to-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                <div className="flex gap-2">
                                    <motion.div whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" />
                                    <motion.div whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" />
                                    <motion.div whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" />
                                </div>
                                <span className="text-base font-mono text-gray-500">system_profile.js</span>
                            </div>
                            <pre className="text-base font-mono leading-relaxed overflow-x-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                >
                                    <code className="text-indigo">const</code> <code className="text-white">scientist</code> <code className="text-indigo">=</code> <code className="text-white">&#123;</code>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.65, duration: 0.4 }}
                                >
                                    <code className="text-mint">  name</code><code className="text-white">:</code> <code className="text-yellow-300">&quot;Lakshmi Narayana&quot;</code>,
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                >
                                    <code className="text-mint">  lab</code><code className="text-white">:</code> <code className="text-yellow-300">&quot;AI Systems Engineering&quot;</code>,
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.95, duration: 0.4 }}
                                >
                                    <code className="text-mint">  focus</code><code className="text-white">:</code> <code className="text-yellow-300">&quot;Real-world impact&quot;</code>,
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 1.1, duration: 0.4 }}
                                >
                                    <code className="text-mint">  status</code><code className="text-white">:</code> <code className="text-indigo">() =&gt;</code> <code className="text-white">&#123;</code>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 1.25, duration: 0.4 }}
                                >
                                    <code className="text-indigo">    return</code> <code className="text-yellow-300">&quot;building intelligent systems...&quot;</code>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 1.4, duration: 0.4 }}
                                >
                                    <code className="text-white">  &#125;</code>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 1.55, duration: 0.4 }}
                                >
                                    <code className="text-white">&#125;;</code>
                                </motion.div>
                            </pre>
                            {/* System status bar */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 1.8 }}
                                className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-gray-600"
                            >
                                <span><span className="inline-block w-1.5 h-1.5 rounded-full bg-mint mr-1 animate-pulse" />Profile loaded</span>
                                <span>v3.7.2</span>
                            </motion.div>
                        </div>
                    </TiltCard>
                </motion.div>
            </motion.div>
        </section>
    );
}
