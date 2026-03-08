"use client";

import { motion } from "framer-motion";
import { personalData } from "@/utils/data";
import { ArrowRight, Download, Github } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
    const [headline, setHeadline] = useState("");
    const fullText = personalData.role;

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setHeadline(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20">
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 max-w-3xl w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-mint font-mono text-sm mb-4"
                    >
                        $ whoami
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4"
                    >
                        {personalData.name}.
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-2xl md:text-4xl text-gray-400 font-mono h-12"
                    >
                        {headline}<span className="animate-pulse">_</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8 text-gray-400 max-w-lg leading-relaxed"
                    >
                        Welcome to the High-Performance AI Lab. I build intelligent systems and solve complex problems with modern technology.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <a href="#projects" className="flex items-center gap-2 bg-indigo/10 border border-indigo/30 hover:bg-indigo/20 hover:border-indigo/50 text-indigo px-6 py-3 rounded-lg font-mono transition-all">
                            View Projects <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href={personalData.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-6 py-3 rounded-lg font-mono transition-all">
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 bg-mint/10 border border-mint/30 hover:bg-mint/20 hover:border-mint/50 text-mint px-6 py-3 rounded-lg font-mono transition-all">
                            <Download className="w-4 h-4" /> Resume
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative flex-shrink-0"
                >
                    <div className="absolute inset-0 bg-indigo rounded-full blur-[100px] opacity-20"></div>
                    <img
                        src="/profile.jpg"
                        alt="Profile Photo"
                        className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full border-2 border-indigo object-cover shadow-[0_0_50px_rgba(99,102,241,0.4)]"
                    />
                </motion.div>
            </div>
        </section>
    );
}
