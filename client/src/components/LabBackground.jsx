"use client";

import { useRef, useEffect } from "react";

export default function LabBackground() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animRef = useRef(null);
    const themeRef = useRef("dark");

    useEffect(() => {
        // Init theme
        themeRef.current = document.documentElement.classList.contains("dark") ? "dark" : "light";
        
        const onThemeChange = () => {
            themeRef.current = document.documentElement.classList.contains("dark") ? "dark" : "light";
        };
        window.addEventListener("themechange", onThemeChange);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w, h, nodes = [];
        const N = 30; // decreased density heavily
        const CD = 450; // increased connection distance to make nets larger
        const MR = 350;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            nodes = Array.from({ length: N }, () => ({
                x: Math.random() * w, y: Math.random() * h, z: Math.random() * 350,
                vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, vz: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2 + 1, phase: Math.random() * Math.PI * 2,
                isAlt: Math.random() > 0.6, active: true, aPhase: Math.random() * Math.PI * 2,
            }));
        };

        const hm = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

        const proj = (n) => {
            const p = 800, s = p / (p + n.z);
            return { x: (n.x - w / 2) * s + w / 2, y: (n.y - h / 2) * s + h / 2, s };
        };

        const animate = (t) => {
            const time = t * 0.001;
            ctx.clearRect(0, 0, w, h);

            const isDark = themeRef.current === "dark";

            const cGridD = "rgba(99,102,241,0.015)";
            const cGridL = "rgba(79,70,229,0.03)";
            const cCenterD = "rgba(99,102,241,0.03)";
            const cCenterL = "rgba(79,70,229,0.05)";

            // Perspective floor grid
            ctx.save();
            ctx.strokeStyle = isDark ? cGridD : cGridL;
            ctx.lineWidth = 0.5;
            const gs = 80;
            for (let x = 0; x < w; x += gs) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = 0; y < h; y += gs) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }
            // Stronger center lines
            ctx.strokeStyle = isDark ? cCenterD : cCenterL;
            ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
            ctx.restore();

            // Ambient glow spots
            const drawGlow = (cx, cy, r, colorBase, opacity) => {
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                g.addColorStop(0, `rgba(${colorBase},${opacity})`); 
                g.addColorStop(1, "transparent");
                ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
            };

            const primaryC = isDark ? "99,102,241" : "79,70,229";
            const accentC = isDark ? "16,185,129" : "5,150,105";

            drawGlow(w * 0.5, h * 0.42, 400, primaryC, isDark ? 0.05 : 0.03);
            drawGlow(w * 0.15, h * 0.3, 300, accentC, isDark ? 0.025 : 0.015);
            drawGlow(w * 0.85, h * 0.3, 300, primaryC, isDark ? 0.025 : 0.015);
            drawGlow(w * 0.3, h * 0.75, 250, accentC, isDark ? 0.015 : 0.01);
            drawGlow(w * 0.7, h * 0.75, 250, primaryC, isDark ? 0.015 : 0.01);

            // Update nodes
            for (const n of nodes) {
                const dx = mouseRef.current.x - n.x, dy = mouseRef.current.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MR && dist > 0) {
                    const f = (MR - dist) / MR;
                    n.vx -= (dx / dist) * f * 0.02; n.vy -= (dy / dist) * f * 0.02;
                }
                n.x += n.vx * 0.8; n.y += n.vy * 0.8; n.z += n.vz;
                n.vx *= 0.997; n.vy *= 0.997;
                n.vx += (Math.random() - 0.5) * 0.01; n.vy += (Math.random() - 0.5) * 0.01;
                if (n.x < -100) n.x = w + 100; if (n.x > w + 100) n.x = -100;
                if (n.y < -100) n.y = h + 100; if (n.y > h + 100) n.y = -100;
                if (n.z < 0) n.z = 350; if (n.z > 350) n.z = 0;
                n.active = Math.sin(time * 0.5 + n.aPhase) > -0.3; // more active lines
            }

            // Draw connections (The Web)
            for (let i = 0; i < nodes.length; i++) {
                const pi = proj(nodes[i]);
                for (let j = i + 1; j < nodes.length; j++) {
                    const pj = proj(nodes[j]);
                    const dx = pi.x - pj.x, dy = pi.y - pj.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CD) {
                        const op = (1 - dist / CD) * Math.min(pi.s, pj.s);
                        const both = nodes[i].active && nodes[j].active;
                        if (both) {
                            const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
                            // Make lines slightly thicker and brighter
                            grad.addColorStop(0, `rgba(${primaryC},${op * (isDark ? 0.6 : 0.4)})`);
                            grad.addColorStop(0.5, `rgba(${accentC},${op * (isDark ? 0.4 : 0.25)})`);
                            grad.addColorStop(1, `rgba(${primaryC},${op * (isDark ? 0.6 : 0.4)})`);
                            ctx.beginPath(); ctx.strokeStyle = grad;
                            ctx.lineWidth = 3.5 * Math.min(pi.s, pj.s); // Thicker lines for larger nets
                            ctx.moveTo(pi.x, pi.y); ctx.lineTo(pj.x, pj.y); ctx.stroke();
                            
                            // Emphasized Data pulse particles computing over the web
                            const fp = (time * 1.2 + i * 0.15) % 1; // faster pulses
                            const fx = pi.x + (pj.x - pi.x) * fp, fy = pi.y + (pj.y - pi.y) * fp;
                            
                            // Pulse trail/glow
                            const pGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, 12);
                            pGrad.addColorStop(0, `rgba(${accentC},${op})`);
                            pGrad.addColorStop(1, "transparent");
                            ctx.beginPath(); ctx.fillStyle = pGrad;
                            ctx.arc(fx, fy, 12, 0, Math.PI * 2); ctx.fill();

                            ctx.beginPath();
                            ctx.fillStyle = `rgba(255,255,255,${op})`; // bright core of pulse
                            ctx.arc(fx, fy, 2.5, 0, Math.PI * 2); ctx.fill();

                        } else {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${primaryC},${op * (isDark ? 0.15 : 0.1)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(pi.x, pi.y); ctx.lineTo(pj.x, pj.y); ctx.stroke();
                        }
                    }
                }
            }

            // Removed node (dot) rendering to create a pure 3D neural network web

            animRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", hm);
        animRef.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", hm);
            window.removeEventListener("themechange", onThemeChange);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.95 }} />;
}
