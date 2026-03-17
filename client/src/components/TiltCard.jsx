"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "", glareColor = "rgba(99, 102, 241, 0.15)" }) {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXVal = ((y - centerY) / centerY) * -12;
        const rotateYVal = ((x - centerX) / centerX) * 12;

        setRotateX(rotateXVal);
        setRotateY(rotateYVal);
        setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Glare overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 60%)`,
                }}
            />
            <div style={{ transform: "translateZ(0)" }}>
                {children}
            </div>
        </motion.div>
    );
}
