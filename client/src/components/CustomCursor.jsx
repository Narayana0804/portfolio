"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { stiffness: 500, damping: 28 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouchDevice(true);
            return;
        }

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        const interactiveElements = document.querySelectorAll(
            "a, button, [role='button'], input, textarea, select"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [mouseX, mouseY]);

    if (isTouchDevice) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: "difference" }}>
            {/* Outer Glow Ring */}
            <motion.div
                style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
                animate={{
                    width: isHovered ? 50 : 32,
                    height: isHovered ? 50 : 32,
                    boxShadow: isHovered ? "0 0 20px rgba(139, 92, 246, 0.3)" : "none",
                }}
                className="absolute border border-white/40 rounded-full flex items-center justify-center transition-all duration-300"
            />
            {/* Inner Dot */}
            <motion.div
                style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
                animate={{
                    width: isHovered ? 6 : 4,
                    height: isHovered ? 6 : 4,
                }}
                className="absolute bg-white rounded-full transition-all duration-200"
            />
        </div>
    );
}
