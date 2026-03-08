"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="about" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-12"
            >
                <div className="flex-1">
                    <h2 className="text-3xl font-bold flex items-center gap-4 mb-6 relative">
                        <span className="text-indigo font-mono text-xl">01.</span>
                        About Me
                        <div className="h-px bg-white/10 flex-1 ml-4" />
                    </h2>
                    <div className="text-gray-400 space-y-4 leading-relaxed">
                        <p>
                            I am an AI & ML Engineer focused on designing scalable and reliable systems. I specialize in taking theoretical machine learning concepts and engineering them into robust, high-performance applications.
                        </p>
                        <p>
                            My journey involves working across the full stack—from engineering real-time crowd density estimation pipelines using PyTorch, to building responsive web dashboards with React and Node.js.
                        </p>
                        <p>
                            When I&apos;m not optimizing algorithms or debugging distributed systems, I enjoy participating in hackathons and exploring new frontiers in generative AI and cloud infrastructure.
                        </p>
                    </div>
                </div>

                <div className="flex-1 lg:pl-12">
                    <div className="glass-card p-6 border-indigo/20 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 to-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-xs font-mono text-gray-500">system_init.js</span>
                        </div>
                        <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
                            <code className="text-indigo">const</code> <code className="text-white">engineer</code> <code className="text-indigo">=</code> <code className="text-white">&#123;</code><br />
                            <code className="text-mint">name</code><code className="text-white">:</code> <code className="text-yellow-300">"Lakshmi Narayana"</code>,<br />
                            <code className="text-mint">focus</code><code className="text-white">:</code> <code className="text-yellow-300">"Real-world impact"</code>,<br />
                            <code className="text-mint">currentAction</code><code className="text-white">:</code> <code className="text-indigo">() =&gt;</code> <code className="text-white">&#123;</code><br />
                            <code className="text-indigo">return</code> <code className="text-yellow-300">"building intelligent systems..."</code><br />
                            <code className="text-white">&#125;</code><br />
                            <code className="text-white">&#125;;</code>
                        </pre>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
