"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { personalData } from "@/utils/data";
import { Mail, MessageSquare, Send, Phone } from "lucide-react";
import emailjs from '@emailjs/browser';
import MagneticButton from "@/components/MagneticButton";

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                e.target,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
            setStatus("success");
            e.target.reset();
        } catch (err) {
            console.error('EmailJS Error:', err);
            setStatus("error");
        }

        setTimeout(() => setStatus("idle"), 4000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
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
        <section id="contact" className="px-6 lg:px-12 max-w-4xl mx-auto w-full py-24 text-center">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.p variants={itemVariants} className="text-indigo font-mono mb-4 text-sm">08. What&apos;s Next?</motion.p>
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</motion.h2>
                <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-xl mx-auto">
                    Currently looking for new opportunities. Whether you have a question, a project proposal, or just want to connect about AI/ML, my inbox is always open.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-12">
                    <MagneticButton>
                        <a href={`mailto:${personalData.email}`} className="flex items-center gap-3 text-gray-400 hover:text-indigo transition-colors font-mono text-sm group">
                            <div className="p-3 rounded-full bg-indigo/10 group-hover:bg-indigo/20 transition-colors group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                <Mail className="w-5 h-5 text-indigo" />
                            </div>
                            {personalData.email}
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href={`tel:${personalData.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-mint transition-colors font-mono text-sm group">
                            <div className="p-3 rounded-full bg-mint/10 group-hover:bg-mint/20 transition-colors group-hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                                <Phone className="w-5 h-5 text-mint" />
                            </div>
                            {personalData.phone}
                        </a>
                    </MagneticButton>
                </motion.div>

                <motion.form
                    variants={itemVariants}
                    onSubmit={handleSubmit}
                    className="glass-card p-6 md:p-10 text-left max-w-2xl mx-auto space-y-6 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo to-mint"
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="text-xs font-mono text-gray-400 uppercase">Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all"
                                placeholder="John Doe"
                            />
                        </motion.div>
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.7 }}
                        >
                            <label className="text-xs font-mono text-gray-400 uppercase">Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all"
                                placeholder="john@example.com"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        <label className="text-xs font-mono text-gray-400 uppercase">Message</label>
                        <textarea
                            required
                            name="message"
                            rows={4}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all resize-none"
                            placeholder="Initialize communication protocol..."
                        ></textarea>
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex justify-center items-center gap-2 bg-indigo hover:bg-indigo/90 text-white font-mono py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] disabled:opacity-70"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {status === "submitting" ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Transmitting...</span>
                        ) : status === "success" ? (
                            <span className="flex items-center gap-2 text-mint font-bold"><MessageSquare className="w-4 h-4" /> Message Delivered</span>
                        ) : status === "error" ? (
                            <span className="text-red-400">Transmission Failed</span>
                        ) : (
                            <span className="flex items-center gap-2">Execute Send <Send className="w-4 h-4" /></span>
                        )}
                    </motion.button>
                </motion.form>

                <motion.div
                    variants={itemVariants}
                    className="mt-20 text-sm font-mono text-gray-500"
                >
                    Designed & Engineered by <span className="text-indigo">{personalData.name}</span>
                    <br /> Built with Next.js, Framer Motion & Node.js
                </motion.div>
            </motion.div>
        </section>
    );
}
