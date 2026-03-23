"use client";

import { motion } from "framer-motion";
import { personalData } from "@/utils/data";
import { ArrowRight, Download, Github, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import MagneticButton from "@/components/MagneticButton";

const SYSTEM_LINES = [
    "Connecting to neural core...",
    "Loading model weights...",
    "Inference engine ready.",
    "All systems operational.",
];

export default function Hero() {
    const [headline, setHeadline] = useState("");
    const fullText = personalData.role;
    const [systemLines, setSystemLines] = useState([]);
    const [systemComplete, setSystemComplete] = useState(false);

    useEffect(() => {
        // System boot lines with cleanup
        const timeouts = [];
        setSystemLines([]);
        setSystemComplete(false);

        SYSTEM_LINES.forEach((line, i) => {
            const tid = setTimeout(() => {
                setSystemLines(prev => {
                    if (prev.includes(line)) return prev;
                    return [...prev, line];
                });
                if (i === SYSTEM_LINES.length - 1) {
                    const completeTid = setTimeout(() => setSystemComplete(true), 300);
                    timeouts.push(completeTid);
                }
            }, 800 + i * 400);
            timeouts.push(tid);
        });

        // Typing headline
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                setHeadline(fullText.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => {
            timeouts.forEach(t => clearTimeout(t));
            clearInterval(typingInterval);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <FloatingParticles count={30} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
            >
                <div className="flex-1 max-w-3xl w-full">
                    {/* System status micro-terminal */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 font-mono text-base text-gray-500 space-y-0.5"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-3 h-3 text-mint/50" />
                            <span className="text-mint/40 tracking-[0.2em] uppercase text-xs">Lab Entry Portal</span>
                        </div>
                        {systemLines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className={i === systemLines.length - 1 && systemComplete ? "text-mint/70" : "text-gray-600"}
                            >
                                <span className="text-indigo/40">›</span> {line}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-mint font-mono text-base mb-4"
                    >
                        $ whoami
                    </motion.p>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold text-white mb-4"
                    >
                        {personalData.name}.
                    </motion.h1>

                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-4xl text-gray-400 font-mono h-12"
                    >
                        {headline}<span className="animate-pulse">_</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="mt-8 text-gray-400 max-w-lg leading-relaxed"
                    >
                        Welcome to my digital lab. I build intelligent systems, engineer real-time AI pipelines, and solve complex problems at scale.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <MagneticButton>
                            <a href="#projects" className="flex items-center gap-2 bg-indigo/10 border border-indigo/30 hover:bg-indigo/20 hover:border-indigo/50 text-indigo px-6 py-3 rounded-lg font-mono transition-all hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]">
                                View Systems <ArrowRight className="w-4 h-4" />
                            </a>
                        </MagneticButton>
                        <MagneticButton>
                            <a href={personalData.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-6 py-3 rounded-lg font-mono transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                                <Github className="w-4 h-4" /> GitHub
                            </a>
                        </MagneticButton>
                        <MagneticButton>
                            <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 bg-mint/10 border border-mint/30 hover:bg-mint/20 hover:border-mint/50 text-mint px-6 py-3 rounded-lg font-mono transition-all hover:shadow-[0_0_25px_rgba(45,212,191,0.3)]">
                                <Download className="w-4 h-4" /> Resume
                            </a>
                        </MagneticButton>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="relative flex-shrink-0"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-indigo rounded-full blur-[100px] opacity-20"
                    />
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotateZ: [0, 1, -1, 0]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src="/profile.jpg"
                            alt="Profile Photo"
                            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full border-2 border-indigo object-cover shadow-[0_0_50px_rgba(99,102,241,0.4)]"
                        />
                    </motion.div>
                    {/* Orbiting ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-20px] border border-indigo/20 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-40px] border border-mint/10 rounded-full border-dashed"
                    />
                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, type: "spring" }}
                        className="absolute -bottom-2 -right-2 bg-slateDeep/90 backdrop-blur-md border border-mint/30 rounded-lg px-3 py-1.5 font-mono text-xs text-mint shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-mint mr-1.5 animate-pulse" />
                        SYSTEM ACTIVE
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
