"use client";

import { useRef, useEffect, useState } from "react";

const SECTION_CONFIGS = {
    hero: { label: "LAB_ENTRY", nodeOpacity: 0.15, connectionOpacity: 0.08, pulseSpeed: 0.02, activeNodes: 0.075, glowIntensity: 0.1, flowSpeed: 0.002 },
    about: { label: "PROFILE_TERMINAL", nodeOpacity: 0.25, connectionOpacity: 0.12, pulseSpeed: 0.04, activeNodes: 0.1, glowIntensity: 0.2, flowSpeed: 0.003 },
    features: { label: "CORE_MODULES", nodeOpacity: 0.3, connectionOpacity: 0.15, pulseSpeed: 0.04, activeNodes: 0.125, glowIntensity: 0.2, flowSpeed: 0.004 },
    skills: { label: "TECH_CONTROL_PANEL", nodeOpacity: 0.4, connectionOpacity: 0.2, pulseSpeed: 0.06, activeNodes: 0.175, glowIntensity: 0.3, flowSpeed: 0.005 },
    experience: { label: "EXPERIMENT_TIMELINE", nodeOpacity: 0.35, connectionOpacity: 0.18, pulseSpeed: 0.04, activeNodes: 0.15, glowIntensity: 0.25, flowSpeed: 0.004 },
    projects: { label: "ACTIVE_AI_SYSTEMS", nodeOpacity: 0.5, connectionOpacity: 0.25, pulseSpeed: 0.08, activeNodes: 0.225, glowIntensity: 0.4, flowSpeed: 0.006 },
    certificates: { label: "RESEARCH_ARCHIVE", nodeOpacity: 0.3, connectionOpacity: 0.15, pulseSpeed: 0.04, activeNodes: 0.125, glowIntensity: 0.2, flowSpeed: 0.004 },
    contact: { label: "COMM_CHANNEL", nodeOpacity: 0.35, connectionOpacity: 0.2, pulseSpeed: 0.04, activeNodes: 0.15, glowIntensity: 0.3, flowSpeed: 0.004 },
};

export default function NeuralNetworkBackground() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef(null);
    const currentSectionRef = useRef("hero");
    const targetConfigRef = useRef(SECTION_CONFIGS.hero);
    const lerpedConfigRef = useRef({ ...SECTION_CONFIGS.hero });
    const scrollYRef = useRef(0);
    const profileImgRef = useRef(null);

    const lerp = (a, b, t) => a + (b - a) * t;

    useEffect(() => {
        const img = new Image();
        img.src = "/profile.jpg";
        img.onload = () => { profileImgRef.current = img; };

        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
            const sections = ["hero", "about", "features", "skills", "experience", "projects", "certificates", "contact"];
            const viewportCenter = window.innerHeight / 2;

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                        if (currentSectionRef.current !== id) {
                            currentSectionRef.current = id;
                            targetConfigRef.current = SECTION_CONFIGS[id] || SECTION_CONFIGS.hero;
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const nodeCount = 15;
        let nodes = [];
        let width, height;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            nodes = Array.from({ length: nodeCount }, (_, i) => {
                const isLeft = i % 2 === 0;
                return {
                    isLeft,
                    x: isLeft ? Math.random() * (width * 0.35) : width - Math.random() * (width * 0.35),
                    y: Math.random() * height,
                    z: Math.random() * 250,
                    vx: (Math.random() - 0.5) * 0.008,
                    vy: (Math.random() - 0.5) * 0.008,
                    vz: (Math.random() - 0.5) * 0.004,
                    size: Math.random() * 3 + 1.5,
                    pulsePhase: Math.random() * Math.PI * 2,
                    isAlt: Math.random() > 0.65,
                    isActive: Math.random() > 0.5,
                    activationPhase: Math.random() * Math.PI * 2,
                };
            });
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const getProjected = (p) => {
            const perspective = 600;
            const scale = perspective / (perspective + p.z);
            return {
                x: (p.x - width / 2) * scale + width / 2,
                y: (p.y - height / 2) * scale + height / 2,
                scale,
            };
        };

        const animate = (time) => {
            const t = time * 0.001;
            const target = targetConfigRef.current;
            const current = lerpedConfigRef.current;

            const lerpSpeed = 0.02;
            current.nodeOpacity = lerp(current.nodeOpacity, target.nodeOpacity, lerpSpeed);
            current.connectionOpacity = lerp(current.connectionOpacity, target.connectionOpacity, lerpSpeed);
            current.pulseSpeed = lerp(current.pulseSpeed, target.pulseSpeed, lerpSpeed);
            current.activeNodes = lerp(current.activeNodes, target.activeNodes, lerpSpeed);
            current.glowIntensity = lerp(current.glowIntensity, target.glowIntensity, lerpSpeed);
            current.flowSpeed = lerp(current.flowSpeed, target.flowSpeed, lerpSpeed);

            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // Subtle background grid
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.015 * current.glowIntensity})`;
            ctx.lineWidth = 0.5;
            const gridSize = 100;
            const offsetX = (scrollYRef.current * 0.02) % gridSize;
            const offsetY = (scrollYRef.current * 0.04) % gridSize;
            for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            // Update nodes
            for (const n of nodes) {
                n.x += n.vx * (0.04 + current.flowSpeed);
                n.y += n.vy * (0.04 + current.flowSpeed);
                n.z += n.vz * 0.08;

                n.vx *= 0.998; n.vy *= 0.998;
                n.vx += (Math.random() - 0.5) * 0.00008;
                n.vy += (Math.random() - 0.5) * 0.00008;

                // Keeps them softly bound to their sides
                if (n.isLeft && n.x > width * 0.45) n.vx -= 0.0005;
                if (!n.isLeft && n.x < width * 0.55) n.vx += 0.0005;

                if (n.y < -60) n.y = height + 60;
                if (n.y > height + 60) n.y = -60;
                if (n.z < 0) n.z = 250;
                if (n.z > 250) n.z = 0;

                n.isActive = Math.sin(t * 0.3 + n.activationPhase) > (1 - current.activeNodes * 2);
            }

            // Draw center node and connections
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const pi = getProjected(n);
                
                const mDx = mouseRef.current.x - pi.x;
                const mDy = mouseRef.current.y - pi.y;
                const mouseDist = Math.sqrt(mDx * mDx + mDy * mDy);
                const isHovered = mouseDist < 180;

                const cdx = centerX - pi.x;
                const cdy = centerY - pi.y;
                const distToCenter = Math.sqrt(cdx * cdx + cdy * cdy);

                let opacity = Math.max(0, 1 - distToCenter / (width * 1.2)) * Math.max(0.2, current.connectionOpacity * 3) * pi.scale;
                if (isHovered) opacity *= 3; 
                
                // Draw connecting edge to center image with boosted visibility
                const gradient = ctx.createLinearGradient(centerX, centerY, pi.x, pi.y);
                gradient.addColorStop(0, `rgba(99, 102, 241, ${Math.min(1, opacity * 2.5)})`);
                gradient.addColorStop(1, `rgba(16, 185, 129, ${Math.min(1, opacity * (isHovered ? 4 : 1.5))})`);
                
                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = (isHovered ? 3 : 1.5) * pi.scale;
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pi.x, pi.y);
                ctx.stroke();

                // Draw moving data light towards node
                if (n.isActive || isHovered) {
                    const flowSpd = isHovered ? current.flowSpeed * 10 : current.flowSpeed; // much faster when hovered
                    const flowPos = ((t * flowSpd) + (i * 0.1)) % 1;
                    const fpx = centerX + (pi.x - centerX) * flowPos;
                    const fpy = centerY + (pi.y - centerY) * flowPos;
                    
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(16, 185, 129, ${opacity * (isHovered ? 4 : 2)})`;
                    ctx.arc(fpx, fpy, isHovered ? 4 * pi.scale : 2 * pi.scale, 0, Math.PI * 2);
                    ctx.shadowBlur = isHovered ? 15 : 5;
                    ctx.shadowColor = "rgba(16,185,129,0.8)";
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }

            // Draw center profile image
            if (profileImgRef.current) {
                const imgSize = 45 + Math.sin(t * current.pulseSpeed * 2) * 5;
                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX, centerY, imgSize, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(profileImgRef.current, centerX - imgSize, centerY - imgSize, imgSize * 2, imgSize * 2);
                ctx.restore();
                
                // Orbiting glow
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.4 + Math.sin(t)*0.2})`;
                ctx.lineWidth = 2;
                ctx.arc(centerX, centerY, imgSize + 6, t * 0.5, t * 0.5 + Math.PI);
                ctx.stroke();
            }

            // Draw nodes
            for (const n of nodes) {
                const proj = getProjected(n);
                const pulse = Math.sin(t * current.pulseSpeed + n.pulsePhase) * 0.3 + 0.7;
                const mDx = mouseRef.current.x - proj.x;
                const mDy = mouseRef.current.y - proj.y;
                const isHovered = Math.sqrt(mDx * mDx + mDy * mDy) < 180;
                
                const baseAlpha = current.nodeOpacity * proj.scale;
                const alpha = baseAlpha * (isHovered ? 2.5 : 1) * (n.isActive ? 1.5 : 0.6);

                const color = n.isAlt ? [16, 185, 129] : [99, 102, 241];
                
                if (n.isActive || isHovered) {
                    const glowGrad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, n.size * 10 * proj.scale);
                    glowGrad.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * current.glowIntensity * pulse})`);
                    glowGrad.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
                    ctx.beginPath();
                    ctx.fillStyle = glowGrad;
                    ctx.arc(proj.x, proj.y, n.size * 10 * proj.scale, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
                ctx.arc(proj.x, proj.y, n.size * proj.scale * (isHovered ? 1.8 : 1), 0, Math.PI * 2);
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.8 }}
        />
    );
}
