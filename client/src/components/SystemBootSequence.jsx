"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
    { text: "$ initializing ai-lab-core v3.7.2...", delay: 0, type: "system" },
    { text: "[OK] Neural network modules loaded", delay: 400, type: "success" },
    { text: "[OK] TensorFlow runtime initialized", delay: 700, type: "success" },
    { text: "[OK] PyTorch CUDA backend connected", delay: 1000, type: "success" },
    { text: "$ loading portfolio.config...", delay: 1400, type: "system" },
    { text: "[OK] Data pipelines configured", delay: 1700, type: "success" },
    { text: "[OK] Model weights loaded (CSRNet, MCNN)", delay: 2000, type: "success" },
    { text: "[OK] Communication protocols active", delay: 2300, type: "success" },
    { text: "$ mounting user interface...", delay: 2600, type: "system" },
    { text: "[OK] All systems operational", delay: 2900, type: "success" },
    { text: ">>> WELCOME TO THE AI LAB <<<", delay: 3200, type: "highlight" },
];

export default function SystemBootSequence() {
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const hasRunRef = useRef(false);

    useEffect(() => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;

        // Check if boot was already shown this session
        if (typeof window !== 'undefined' && sessionStorage.getItem('bootShown')) {
            setIsComplete(true);
            return;
        }

        BOOT_MESSAGES.forEach((msg, index) => {
            setTimeout(() => {
                setVisibleMessages(prev => [...prev, msg]);
            }, msg.delay);
        });

        setTimeout(() => {
            setIsHiding(true);
            setTimeout(() => {
                setIsComplete(true);
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('bootShown', 'true');
                }
            }, 800);
        }, 4200);
    }, []);

    if (isComplete) return null;

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isHiding ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
                >
                    <div className="w-full max-w-xl px-6">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-indigo animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
                            <span className="font-mono text-sm text-gray-500 uppercase tracking-[0.3em]">
                                System Boot
                            </span>
                        </div>

                        <div className="font-mono text-sm space-y-1.5 min-h-[300px]">
                            {visibleMessages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`${
                                        msg.type === "system"
                                            ? "text-indigo"
                                            : msg.type === "success"
                                            ? "text-mint/70"
                                            : "text-white font-bold tracking-wider mt-4"
                                    }`}
                                >
                                    {msg.text}
                                    {idx === visibleMessages.length - 1 && msg.type !== "highlight" && (
                                        <span className="animate-pulse ml-1">▊</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="mt-8 h-px bg-white/10 relative overflow-hidden rounded-full">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo to-mint"
                                initial={{ width: "0%" }}
                                animate={{ width: isHiding ? "100%" : `${(visibleMessages.length / BOOT_MESSAGES.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="mt-2 flex justify-between font-mono text-xs text-gray-600">
                            <span>LAB_INIT</span>
                            <span>{Math.round((visibleMessages.length / BOOT_MESSAGES.length) * 100)}%</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
