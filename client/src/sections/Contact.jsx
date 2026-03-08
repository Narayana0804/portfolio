"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { personalData } from "@/utils/data";
import { Mail, MessageSquare, Send, Phone } from "lucide-react";
import emailjs from '@emailjs/browser';

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
            e.target.reset(); // clear form
        } catch (err) {
            console.error('EmailJS Error:', err);
            setStatus("error");
        }

        setTimeout(() => setStatus("idle"), 4000);
    };

    return (
        <section id="contact" className="px-6 lg:px-12 max-w-4xl mx-auto w-full py-24 text-center">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <p className="text-indigo font-mono mb-4 text-sm">07. What&apos;s Next?</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    Currently looking for new opportunities. Whether you have a question, a project proposal, or just want to connect about AI/ML, my inbox is always open.
                </p>

                <div className="flex flex-wrap justify-center gap-8 mb-12">
                    <a href={`mailto:${personalData.email}`} className="flex items-center gap-3 text-gray-400 hover:text-indigo transition-colors font-mono text-sm group">
                        <div className="p-3 rounded-full bg-indigo/10 group-hover:bg-indigo/20 transition-colors">
                            <Mail className="w-5 h-5 text-indigo" />
                        </div>
                        {personalData.email}
                    </a>
                    <a href={`tel:${personalData.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-mint transition-colors font-mono text-sm group">
                        <div className="p-3 rounded-full bg-mint/10 group-hover:bg-mint/20 transition-colors">
                            <Phone className="w-5 h-5 text-mint" />
                        </div>
                        {personalData.phone}
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 text-left max-w-2xl mx-auto space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo to-mint"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 uppercase">Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo/50 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 uppercase">Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo/50 transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 uppercase">Message</label>
                        <textarea
                            required
                            name="message"
                            rows={4}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo/50 transition-colors resize-none"
                            placeholder="Initialize communication protocol..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex justify-center items-center gap-2 bg-indigo hover:bg-indigo/90 text-white font-mono py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] disabled:opacity-70"
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
                    </button>
                </form>

                <div className="mt-20 text-sm font-mono text-gray-500">
                    Designed & Engineered by <span className="text-indigo">{personalData.name}</span>
                    <br /> Built with Next.js, Framer Motion & Node.js
                </div>
            </motion.div>
        </section>
    );
}
