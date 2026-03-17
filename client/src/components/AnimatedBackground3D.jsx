"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";

export default function AnimatedBackground3D() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef(null);

    const config = useMemo(() => ({
        particleCount: 60,
        connectionDistance: 150,
        mouseInfluenceRadius: 200,
        baseSpeed: 0.3,
        colors: {
            particle: [99, 102, 241],      // indigo
            particleAlt: [45, 212, 191],    // mint
            connection: [99, 102, 241],
        }
    }), []);

    const initParticles = useCallback((width, height) => {
        return Array.from({ length: config.particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 300,
            vx: (Math.random() - 0.5) * config.baseSpeed,
            vy: (Math.random() - 0.5) * config.baseSpeed,
            vz: (Math.random() - 0.5) * config.baseSpeed * 0.5,
            size: Math.random() * 2.5 + 0.8,
            isAlt: Math.random() > 0.7,
            pulsePhase: Math.random() * Math.PI * 2,
        }));
    }, [config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let particles = [];
        let width, height;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = initParticles(width, height);
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
            ctx.clearRect(0, 0, width, height);
            const t = time * 0.001;

            // Update particles
            for (const p of particles) {
                // Mouse influence
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < config.mouseInfluenceRadius && dist > 0) {
                    const force = (config.mouseInfluenceRadius - dist) / config.mouseInfluenceRadius;
                    p.vx -= (dx / dist) * force * 0.02;
                    p.vy -= (dy / dist) * force * 0.02;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.z += p.vz;

                // Dampen
                p.vx *= 0.999;
                p.vy *= 0.999;

                // Wrap
                if (p.x < -50) p.x = width + 50;
                if (p.x > width + 50) p.x = -50;
                if (p.y < -50) p.y = height + 50;
                if (p.y > height + 50) p.y = -50;
                if (p.z < 0) p.z = 300;
                if (p.z > 300) p.z = 0;

                // Add slight drift
                p.vx += (Math.random() - 0.5) * 0.01;
                p.vy += (Math.random() - 0.5) * 0.01;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                const pi = getProjected(particles[i]);
                for (let j = i + 1; j < particles.length; j++) {
                    const pj = getProjected(particles[j]);
                    const dx = pi.x - pj.x;
                    const dy = pi.y - pj.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.connectionDistance) {
                        const opacity = (1 - dist / config.connectionDistance) * 0.15 * Math.min(pi.scale, pj.scale);
                        const [r, g, b] = config.colors.connection;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                        ctx.lineWidth = 0.5 * Math.min(pi.scale, pj.scale);
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                const proj = getProjected(p);
                const pulse = Math.sin(t * 2 + p.pulsePhase) * 0.3 + 0.7;
                const [r, g, b] = p.isAlt ? config.colors.particleAlt : config.colors.particle;
                const alpha = (0.4 + pulse * 0.4) * proj.scale;
                const size = p.size * proj.scale;

                // Glow
                const gradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * 4);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(proj.x, proj.y, size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
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
    }, [config, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}
