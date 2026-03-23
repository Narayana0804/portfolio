"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certificates, education } from "@/utils/data";
import { GraduationCap, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";

function CertificateLightbox({ certificate, certificates: allCerts, onClose, onNavigate }) {
    const currentIndex = allCerts.findIndex(c => c.title === certificate.title);

    const goNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % allCerts.length;
        onNavigate(allCerts[nextIndex]);
    }, [currentIndex, allCerts, onNavigate]);

    const goPrev = useCallback(() => {
        const prevIndex = (currentIndex - 1 + allCerts.length) % allCerts.length;
        onNavigate(allCerts[prevIndex]);
    }, [currentIndex, allCerts, onNavigate]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, goNext, goPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <X className="w-6 h-6" />
            </motion.button>

            {allCerts.length > 1 && (
                <>
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        className="absolute left-4 md:left-8 z-50 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                        whileHover={{ scale: 1.1, x: -3 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        className="absolute right-4 md:right-8 z-50 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                        whileHover={{ scale: 1.1, x: 3 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>
                </>
            )}

            <motion.div
                key={certificate.title}
                initial={{ scale: 0.7, opacity: 0, rotateY: 15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotateY: -15 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
                style={{ perspective: 1200 }}
            >
                <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_0_80px_var(--color-primary)] border border-white/10 opacity-90"
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center"
                >
                    <h3 className="text-white font-bold text-lg">{certificate.title}</h3>
                    <p className="text-mint font-mono text-base mt-1">{certificate.issuer} • {certificate.date}</p>
                    <p className="text-gray-500 font-mono text-base mt-3">
                        {currentIndex + 1} / {allCerts.length} — Use ← → arrows to navigate
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Certificates() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selectedCert, setSelectedCert] = useState(null);

    const certsWithImages = certificates.filter(cert => cert.image);

    return (
        <section id="certificates" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12 flex flex-col gap-16">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="w-full flex flex-col gap-12"
            >
                {/* Header Phase */}
                <SectionHeader sectionId="certificates" number="06" title="Credentials & Education" />

                {/* Main Grid: Education on left, Certificates on right (or stacked on mobile) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Education Timeline */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                            <span className="font-mono text-xs text-mint/60 tracking-[0.3em] uppercase">
                                Academic Profile
                            </span>
                            <div className="h-px bg-mint/10 flex-1" />
                        </div>
                        
                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 8 }}
                                    className="flex gap-4 cursor-default group"
                                >
                                    <motion.div
                                        className="mt-1 w-10 h-10 rounded-full bg-surface border border-indigo/30 flex items-center justify-center text-indigo shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:border-indigo/80 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <GraduationCap className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-bold text-textMain group-hover:text-indigo transition-colors">{edu.institution}</h3>
                                        <p className="text-gray-400 font-mono text-base">{edu.degree}</p>
                                        <p className="text-mint text-base font-semibold mt-1">{edu.score}</p>
                                        <p className="text-gray-500 font-mono text-base mt-1">{edu.date} | {edu.location}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certificates Grid */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse" />
                            <span className="font-mono text-xs text-indigo/60 tracking-[0.3em] uppercase">
                                Verified Credentials
                            </span>
                            <div className="h-px bg-indigo/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certsWithImages.map((cert, idx) => (
                                <motion.div
                                    key={`cert-${idx}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="glass-card group cursor-pointer relative overflow-hidden rounded-xl border border-white/5 hover:border-indigo/40 transition-all duration-300"
                                    style={{
                                        boxShadow: "var(--glass-shadow)"
                                    }}
                                    onClick={() => setSelectedCert(cert)}
                                >
                                    {/* Preview Image Background */}
                                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                        <img src={cert.image} alt="bg" className="w-full h-full object-cover blur-sm" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative p-5 h-full flex flex-col justify-end min-h-[180px]">
                                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ZoomIn className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-[19px] font-bold text-textMain leading-tight mb-2 group-hover:text-indigo transition-colors">{cert.title}</h3>
                                        <div className="flex flex-col gap-1 mt-auto">
                                            <span className="text-mint font-mono text-base">{cert.issuer}</span>
                                            <span className="text-gray-500 font-mono text-xs">{cert.date}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Hover glow line */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-indigo w-0 group-hover:w-full transition-all duration-500 ease-out" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Full-page lightbox */}
            <AnimatePresence>
                {selectedCert && (
                    <CertificateLightbox
                        certificate={selectedCert}
                        certificates={certsWithImages}
                        onClose={() => setSelectedCert(null)}
                        onNavigate={(cert) => setSelectedCert(cert)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
