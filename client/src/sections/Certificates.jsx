"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certificates, education } from "@/utils/data";
import { Award, GraduationCap, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import TiltCard from "@/components/TiltCard";

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            onClick={onClose}
        >
            {/* Close button */}
            <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation arrows */}
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

            {/* Image container */}
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
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_0_80px_rgba(99,102,241,0.2)] border border-white/10"
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center"
                >
                    <h3 className="text-white font-bold text-lg">{certificate.title}</h3>
                    <p className="text-mint font-mono text-sm mt-1">{certificate.issuer} • {certificate.date}</p>
                    <p className="text-gray-500 font-mono text-xs mt-3">
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    const imageCardVariants = {
        hidden: { opacity: 0, scale: 0.85, rotateY: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <section id="certificates" className="px-6 lg:px-12 max-w-7xl mx-auto w-full py-12 flex flex-col gap-16">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                className="flex flex-col lg:flex-row gap-12"
            >
                <motion.div variants={itemVariants} className="flex-1">
                    <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                        <span className="text-indigo font-mono text-xl">06.</span>
                        Education
                        <div className="h-px bg-white/10 flex-1 ml-4" />
                    </h2>

                    <motion.div
                        className="space-y-8"
                        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                    >
                        {education.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                }}
                                whileHover={{ x: 8 }}
                                className="flex gap-4 cursor-default"
                            >
                                <motion.div
                                    className="mt-1 w-10 h-10 rounded-full bg-slateDeep border border-indigo/30 flex items-center justify-center text-indigo shrink-0"
                                    whileHover={{ scale: 1.2, borderColor: "rgba(99,102,241,0.8)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <GraduationCap className="w-5 h-5" />
                                </motion.div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                                    <p className="text-gray-400 font-mono text-sm">{edu.degree}</p>
                                    <p className="text-mint text-sm font-semibold mt-1">{edu.score}</p>
                                    <p className="text-gray-500 font-mono text-xs mt-1">{edu.date} | {edu.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex-1">
                    <h2 className="text-3xl font-bold flex items-center gap-4 mb-10 relative">
                        <span className="text-indigo font-mono text-xl">07.</span>
                        Certifications
                        <div className="h-px bg-white/10 flex-1 ml-4" />
                    </h2>

                    <motion.div
                        className="space-y-6"
                        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    >
                        {certificates.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, x: 30 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                }}
                                whileHover={{ x: -5, borderColor: "rgba(45,212,191,0.3)" }}
                                className="glass-card p-4 transition-colors flex gap-4 items-center group cursor-default"
                            >
                                <motion.div
                                    className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center text-mint shrink-0"
                                    whileHover={{ scale: 1.2, rotate: 15 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Award className="w-5 h-5" />
                                </motion.div>
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-white leading-tight mb-1 group-hover:text-mint transition-colors">{cert.title}</h3>
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                                        <span className="text-indigo">{cert.issuer}</span>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-gray-500">{cert.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Certificate Images Gallery */}
            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className="w-full"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certsWithImages.map((cert, idx) => (
                        <motion.div key={`img-${idx}`} variants={imageCardVariants} style={{ perspective: 800 }}>
                            <TiltCard className="group cursor-pointer" glareColor="rgba(45, 212, 191, 0.15)">
                                <div
                                    className="glass-card overflow-hidden relative aspect-[4/3]"
                                    onClick={() => setSelectedCert(cert)}
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <h4 className="text-white font-bold text-sm leading-tight">{cert.title}</h4>
                                        <p className="text-mint font-mono text-xs mt-1">{cert.issuer}</p>
                                    </div>
                                    {/* Zoom hint icon */}
                                    <motion.div
                                        className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <ZoomIn className="w-4 h-4 text-white" />
                                    </motion.div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
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
