"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
    Code2, FolderGit2, Briefcase, Award, Mail, User,
    Cpu, Terminal, Activity, Github, Download, Zap, Linkedin
} from "lucide-react";
import LabBackground from "@/components/LabBackground";
import SectionOverlay from "@/components/SectionOverlay";
import SystemBootSequence from "@/components/SystemBootSequence";
import AIChat from "@/sections/AIChat";
import { personalData, skills, projects, experience, certificates, extracurricular } from "@/utils/data";

/* ═══════════════ PANEL CONFIG ═══════════════ */
const PANELS = [
    {
        id: "about", title: "PROFILE_TERMINAL", subtitle: "Scientist Profile",
        icon: User, number: "01", color: "indigo",
        desktopPos: "top-[5%] left-[2%] xl:left-[5%]",
        parallaxDepth: 15, floatAmp: 8, floatDur: 5.5, floatDelay: 0,
    },
    {
        id: "skills", title: "TECH_STACK", subtitle: "Control Panel",
        icon: Cpu, number: "02", color: "mint",
        desktopPos: "top-[36%] left-[1%] xl:left-[3%]",
        parallaxDepth: 20, floatAmp: 10, floatDur: 6, floatDelay: 0.8,
    },
    {
        id: "projects", title: "ACTIVE_SYSTEMS", subtitle: "AI Systems",
        icon: Activity, number: "03", color: "indigo",
        desktopPos: "top-[2%] right-[2%] xl:right-[4%]",
        parallaxDepth: 15, floatAmp: 9, floatDur: 5, floatDelay: 0.4,
    },
    {
        id: "experience", title: "EXPERIMENT_LOG", subtitle: "Timeline",
        icon: Briefcase, number: "04", color: "mint",
        desktopPos: "top-[27%] right-[1%] xl:right-[2%]",
        parallaxDepth: 20, floatAmp: 7, floatDur: 6.5, floatDelay: 1.2,
    },
    {
        id: "certificates", title: "CREDENTIALS", subtitle: "Research Archive",
        icon: Award, number: "05", color: "indigo",
        desktopPos: "bottom-[6%] left-[6%] xl:left-[10%]",
        parallaxDepth: 25, floatAmp: 6, floatDur: 5.8, floatDelay: 1.6,
    },
    {
        id: "contact", title: "COMM_CHANNEL", subtitle: "Communication",
        icon: Mail, number: "06", color: "mint",
        desktopPos: "top-[52%] right-[3%] xl:right-[5%]",
        parallaxDepth: 25, floatAmp: 8, floatDur: 5.2, floatDelay: 2.0,
    },
    {
        id: "extracurricular", title: "ACTIVITY_LOG", subtitle: "Extracurriculars",
        icon: Zap, number: "07", color: "indigo",
        desktopPos: "top-[77%] right-[1%] xl:right-[3%]",
        parallaxDepth: 15, floatAmp: 9, floatDur: 5.5, floatDelay: 1.0,
    },
];

/* ═══════════════ SYSTEM MESSAGES ═══════════════ */
const SYSTEM_MSGS = [
    { text: "7 systems active", pos: "top-[18%] right-[33%]", delay: 3 },
    { text: "Pipeline running...", pos: "bottom-[28%] left-[28%]", delay: 5 },
    { text: "Neural core: ONLINE", pos: "top-[68%] right-[28%]", delay: 7 },
    { text: "Inference stable", pos: "top-[22%] left-[30%]", delay: 9 },
];

/* ═══════════════ PANEL PREVIEW ═══════════════ */
function PanelPreview({ id }) {
    switch (id) {
        case "about":
            return (
                <div className="font-mono text-sm space-y-1 text-gray-400">
                    <div><span className="text-indigo">const</span> <span className="text-textMain font-bold">engineer</span> = {"{"}</div>
                    <div>  name: <span className="text-yellow-300">&quot;{personalData.name.split(" ")[0]}&quot;</span>,</div>
                    <div>  focus: <span className="text-yellow-300">&quot;AI/ML&quot;</span>,</div>
                    <div>  status: <span className="text-mint font-bold">&quot;active&quot;</span></div>
                    <div>{"}"}</div>
                </div>
            );
        case "skills":
            return (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {[...skills.languages.slice(0, 3), ...skills.frameworks.slice(0, 3)].map((s, i) => (
                        <div key={i} className="font-mono text-sm text-gray-300">
                            <span className="text-mint">›</span> {s}
                        </div>
                    ))}
                </div>
            );
        case "projects":
            return (
                <div className="space-y-1.5">
                    <div className="font-mono text-[15px] text-mint font-bold">{projects.length} systems detected</div>
                    {projects.slice(0, 2).map((p, i) => (
                        <div key={i} className="font-mono text-sm text-gray-300 truncate">
                            <span className="text-indigo">●</span> {p.title.length > 24 ? p.title.slice(0, 24) + "..." : p.title}
                        </div>
                    ))}
                </div>
            );
        case "experience":
            return (
                <div className="space-y-1.5">
                    {experience.slice(0, 2).map((e, i) => (
                        <div key={i} className="font-mono text-sm text-gray-300">
                            <span className="text-mint font-bold">┃</span> {e.role} <span className="text-indigo">@ {e.company}</span>
                        </div>
                    ))}
                    <div className="font-mono text-sm text-gray-500">{experience.length} experiment{experience.length > 1 ? "s" : ""} logged</div>
                </div>
            );
        case "certificates":
            return (
                <div className="space-y-1.5">
                    <div className="font-mono text-[15px] text-mint font-bold">{certificates.length} verified</div>
                    <div className="font-mono text-sm text-gray-300">Oracle ✓  W3grads ✓</div>
                    <div className="font-mono text-sm text-gray-500">All authenticated</div>
                </div>
            );
        case "contact":
            return (
                <div className="space-y-1.5">
                    <div className="font-mono text-[15px] text-mint font-bold">▶ READY</div>
                    <div className="font-mono text-sm text-gray-300">Secure link active</div>
                    <div className="font-mono text-sm text-gray-500">Click to transmit</div>
                </div>
            );
        case "extracurricular":
            return (
                <div className="space-y-1.5">
                    <div className="font-mono text-[13px] text-mint font-bold truncate pr-2">{extracurricular[0].title}</div>
                    <div className="font-mono text-sm text-gray-300 truncate">{extracurricular[0].organizer}</div>
                    <div className="font-mono text-[11px] text-gray-500 text-indigo flex flex-wrap mt-1 gap-x-1">{extracurricular[0].tags.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div>
                </div>
            );
        default: return null;
    }
}

/* ═══════════════ HOLOGRAPHIC PANEL ═══════════════ */
function HolographicPanel({ panel, onClick, index, mouseX, mouseY }) {
    const Icon = panel.icon;
    const depth = panel.parallaxDepth;
    const isMint = panel.color === "mint";

    const borderCls = isMint
        ? "border-mint/15 hover:border-mint/40"
        : "border-indigo/15 hover:border-indigo/40";

    const glowShadow = isMint
        ? "hover:shadow-[0_0_50px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(16,185,129,0.1)]"
        : "hover:shadow-[0_0_50px_rgba(99,102,241,0.15),inset_0_1px_0_rgba(99,102,241,0.1)]";

    return (
        <motion.div
            className={`absolute ${panel.desktopPos} w-[240px] xl:w-[280px] z-10`}
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{
                opacity: 1, scale: 1,
                y: [0, -panel.floatAmp, 0],
            }}
            transition={{
                opacity: { duration: 0.7, delay: 0.4 + index * 0.12 },
                scale: { duration: 0.7, delay: 0.4 + index * 0.12 },
                y: { duration: panel.floatDur, repeat: Infinity, ease: "easeInOut", delay: panel.floatDelay },
            }}
            style={{
                transform: `translate(${mouseX * depth}px, ${mouseY * depth}px)`,
            }}
        >
            <motion.div
                onClick={() => onClick(panel.id)}
                className={`
                    relative bg-white/[0.04] backdrop-blur-2xl border ${borderCls} rounded-2xl p-5
                    cursor-pointer transition-all duration-300 group overflow-hidden
                    ${glowShadow}
                `}
                whileHover={{
                    scale: 1.08,
                    y: -6,
                    rotateX: 2,
                    rotateY: isMint ? -2 : 2,
                }}
                whileTap={{ scale: 0.96 }}
                style={{ perspective: 800, transformStyle: "preserve-3d" }}
            >
                {/* Top light reflection */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Scanline animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-30">
                    <motion.div
                        className="absolute w-full h-20 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
                        animate={{ top: ["-80px", "calc(100% + 80px)"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    />
                </div>

                {/* Panel header */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <motion.div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${isMint ? "bg-mint/10 text-mint" : "bg-indigo/10 text-indigo"}`}
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Icon className="w-4 h-4" />
                        </motion.div>
                        <span className="font-mono text-sm text-gray-400 tracking-[0.12em] uppercase font-medium">{panel.title}</span>
                    </div>
                    <span className="font-mono text-sm text-gray-600 font-bold">{panel.number}</span>
                </div>

                {/* Divider with animated fill */}
                <div className="h-px bg-white/5 mb-3.5 relative overflow-hidden">
                    <motion.div
                        className={`h-full ${isMint ? "bg-mint/40" : "bg-indigo/40"}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.6 + index * 0.15 }}
                    />
                </div>

                {/* Preview content - LARGER TEXT */}
                <div className="relative z-10 min-h-[70px]">
                    <PanelPreview id={panel.id} />
                </div>

                {/* Footer */}
                <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMint ? "bg-mint shadow-[0_0_6px_rgba(16,185,129,0.6)]" : "bg-indigo shadow-[0_0_6px_rgba(99,102,241,0.6)]"}`} />
                        <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">{panel.subtitle}</span>
                    </div>
                    <motion.span
                        className="font-mono text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ENTER →
                    </motion.span>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════ CMD+K ═══════════════ */
function LabCommandPalette({ onNavigate }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(p => !p); }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, []);

    const cmds = [
        { id: "about", label: "Profile Terminal", icon: User },
        { id: "skills", label: "Tech Stack", icon: Cpu },
        { id: "projects", label: "Active Systems", icon: Activity },
        { id: "experience", label: "Experiment Log", icon: Briefcase },
        { id: "certificates", label: "Credentials", icon: Award },
        { id: "contact", label: "Communications", icon: Mail },
        { id: "extracurricular", label: "Activity Log", icon: Zap },
    ];
    const filtered = cmds.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

    if (!open) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[18vh] bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-lg bg-[#0B0E14] border border-white/10 rounded-xl shadow-[0_0_60px_rgba(99,102,241,0.15)] overflow-hidden"
            >
                <div className="flex items-center px-4 py-3 border-b border-white/10">
                    <Terminal className="w-4 h-4 text-indigo mr-3" />
                    <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                        placeholder="Navigate to module..." className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 font-mono text-sm" />
                </div>
                <div className="p-2 max-h-[300px] overflow-y-auto">
                    {filtered.length === 0 && <div className="py-6 text-center text-sm text-gray-500 font-mono">No modules found.</div>}
                    {filtered.map(cmd => {
                        const CI = cmd.icon;
                        return (<button key={cmd.id} onClick={() => { onNavigate(cmd.id); setOpen(false); setQuery(""); }}
                            className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 rounded-lg cursor-pointer hover:bg-white/5 transition-colors font-mono">
                            <CI className="w-4 h-4 mr-3 text-indigo" />{cmd.label}
                            <span className="ml-auto text-[9px] text-gray-600 uppercase">{cmd.id}</span>
                        </button>);
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   ██   MAIN LAB SCENE
   ═══════════════════════════════════════════════ */
export default function Home() {
    const [activeSection, setActiveSection] = useState(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handler = (e) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        };
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);

    const handlePanel = useCallback((id) => setActiveSection(id), []);
    const handleClose = useCallback(() => setActiveSection(null), []);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-[#030305]">
            <SystemBootSequence />
            <LabBackground />

            {/* ═══ ROOM AMBIENT LAYERS ═══ */}
            {/* Radial core glow */}
            <div className="fixed inset-0 pointer-events-none z-[1]"
                style={{ background: "radial-gradient(ellipse 600px 500px at 50% 45%, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
            {/* Floor gradient */}
            <div className="fixed inset-0 pointer-events-none z-[1]"
                style={{ background: "linear-gradient(to top, rgba(99,102,241,0.04) 0%, transparent 30%)" }} />
            {/* Vignette */}
            <div className="fixed inset-0 pointer-events-none z-[2]"
                style={{ boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.7)" }} />
            {/* Top fog */}
            <div className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-[2]"
                style={{ background: "linear-gradient(to bottom, rgba(3,3,5,0.8) 0%, transparent 100%)" }} />

            {/* ═══ LAB SCENE ═══ */}
            <AnimatePresence>
                {!activeSection && (
                    <motion.div
                        key="lab"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full z-10"
                        style={{ perspective: "1200px" }}
                    >
                        {/* ─── DESKTOP ─── */}
                        <div className="hidden lg:block relative w-full h-full">

                            {/* ─── SVG CONNECTIONS ─── */}
                            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                                {PANELS.map((p, i) => {
                                    let ex = "50%", ey = "50%";
                                    if (p.id === "about") { ex = "14%"; ey = "15%"; }
                                    if (p.id === "skills") { ex = "12%"; ey = "46%"; }
                                    if (p.id === "certificates") { ex = "18%"; ey = "84%"; }
                                    if (p.id === "projects") { ex = "85%"; ey = "12%"; }
                                    if (p.id === "experience") { ex = "87%"; ey = "37%"; }
                                    if (p.id === "contact") { ex = "84%"; ey = "62%"; }
                                    if (p.id === "extracurricular") { ex = "86%"; ey = "87%"; }

                                    const isMint = p.color === "mint";
                                    const c = isMint ? "#10b981" : "#6366f1";
                                    return (
                                        <g key={"line-" + p.id}>
                                            <motion.line
                                                x1="50%" y1="50%"
                                                x2={ex} y2={ey}
                                                stroke={c}
                                                strokeWidth="1.5"
                                                strokeOpacity="0.3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 1.5, delay: 0.5 + i * 0.15 }}
                                                strokeDasharray="4 6"
                                            />
                                            {/* Pulsing endpoint nodes */}
                                            <motion.circle cx={ex} cy={ey} r="3" fill={c}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: [0, 1.5, 1], opacity: 0.8 }}
                                                transition={{ duration: 0.6, delay: 1.5 + i * 0.15 }}
                                            />
                                            <motion.circle cx={ex} cy={ey} r="8" fill="transparent" stroke={c} strokeWidth="1"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: [0, 2, 1.2], opacity: [0, 0.5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                                            />
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* Floating panels */}
                            {PANELS.map((panel, idx) => (
                                <HolographicPanel
                                    key={panel.id}
                                    panel={panel}
                                    onClick={handlePanel}
                                    index={idx}
                                    mouseX={mouse.x}
                                    mouseY={mouse.y}
                                />
                            ))}

                            {/* ─── FLOATING SYSTEM MESSAGES ─── */}
                            {SYSTEM_MSGS.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute ${msg.pos} z-[5] pointer-events-none`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.5, 0.5, 0] }}
                                    transition={{
                                        duration: 6, repeat: Infinity, delay: msg.delay,
                                        times: [0, 0.1, 0.8, 1],
                                    }}
                                    style={{
                                        transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`,
                                    }}
                                >
                                    <span className="font-mono text-[11px] text-indigo/40 tracking-wider">
                                        {msg.text}
                                    </span>
                                </motion.div>
                            ))}

                            {/* ═══ CENTRAL CONSOLE ═══ */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
                                style={{
                                    transform: `translate(calc(-50% + ${mouse.x * -5}px), calc(-50% + ${mouse.y * -5}px))`,
                                }}
                            >
                                {/* Orbiting rings */}
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-5 border border-indigo/20 rounded-full"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-10 border border-mint/10 rounded-full border-dashed"
                                    />
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-16 border border-indigo/5 rounded-full"
                                    />

                                    {/* Profile orb */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                                        className="relative"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute inset-[-30px] bg-indigo/20 rounded-full blur-[80px]"
                                        />
                                        <img
                                            src="/profile.jpg"
                                            alt="Profile"
                                            className="w-32 h-32 xl:w-40 xl:h-40 rounded-full object-cover border-2 border-indigo/40 relative z-10"
                                            style={{ boxShadow: "0 0 80px rgba(99,102,241,0.35), 0 0 30px rgba(99,102,241,0.2)" }}
                                        />
                                        {/* ONLINE badge */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.5, type: "spring" }}
                                            className="absolute -bottom-1 -right-1 z-20 bg-[#0B0E14]/90 backdrop-blur-md border border-mint/30 rounded-lg px-2.5 py-1 font-mono text-[10px] text-mint"
                                            style={{ boxShadow: "0 0 15px rgba(16,185,129,0.2)" }}
                                        >
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-mint mr-1 animate-pulse" />
                                            ONLINE
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* ─── IDENTITY TEXT (LARGE) ─── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.7 }}
                                    className="mt-8 text-center"
                                >
                                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-none"
                                        style={{ textShadow: "0 0 40px rgba(99,102,241,0.15)" }}>
                                        {personalData.name}
                                    </h1>
                                    <motion.p
                                        className="text-indigo font-mono text-base md:text-lg mt-3 tracking-wide"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        {personalData.role}
                                    </motion.p>

                                    {/* Action buttons */}
                                    <div className="flex items-center justify-center gap-4 mt-6">
                                        <motion.a
                                            href={personalData.github} target="_blank" rel="noreferrer"
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                                            title="GitHub"
                                        >
                                            <Github className="w-5 h-5" />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.linkedin.com/in/lakshmi-narayana-pakalapati" target="_blank" rel="noreferrer"
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 transition-all"
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                                            title="LinkedIn"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </motion.a>
                                        <motion.a
                                            href="https://leetcode.com/u/w5GmegTfjQ/" target="_blank" rel="noreferrer"
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#ffa116] hover:border-[#ffa116]/50 hover:bg-[#ffa116]/10 transition-all"
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                                            title="LeetCode"
                                        >
                                            <Code2 className="w-5 h-5" />
                                        </motion.a>
                                        <motion.a
                                            href="/resume.pdf" target="_blank"
                                            className="p-3 rounded-xl bg-indigo/10 border border-indigo/25 text-indigo hover:bg-indigo/20 hover:border-indigo/40 transition-all"
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ boxShadow: "0 4px 20px rgba(99,102,241,0.15)" }}
                                            title="Resume"
                                        >
                                            <Download className="w-5 h-5" />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CMD+K hint */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                                className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-500 flex items-center gap-2"
                            >
                                <span className="border border-white/10 rounded px-2 py-0.5 text-gray-400 text-[11px]">⌘K</span>
                                Quick Navigate
                            </motion.div>
                        </div>

                        {/* ─── MOBILE ─── */}
                        <div className="lg:hidden flex flex-col items-center h-full overflow-y-auto px-5 py-8 gap-5">
                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-4">
                                <div className="relative">
                                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute inset-[-20px] bg-indigo/20 rounded-full blur-[50px]" />
                                    <img src="/profile.jpg" alt="Profile"
                                        className="w-28 h-28 rounded-full object-cover border-2 border-indigo/40 relative z-10"
                                        style={{ boxShadow: "0 0 50px rgba(99,102,241,0.3)" }} />
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-5 text-center">{personalData.name}</h1>
                                <p className="text-indigo font-mono text-sm mt-2">{personalData.role}</p>
                                <div className="flex gap-3 mt-4">
                                    <a href={personalData.github} target="_blank" rel="noreferrer"
                                        className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400"><Github className="w-4 h-4" /></a>
                                    <a href="/resume.pdf" target="_blank"
                                        className="p-2.5 rounded-lg bg-indigo/10 border border-indigo/20 text-indigo"><Download className="w-4 h-4" /></a>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                                {PANELS.map((panel, idx) => {
                                    const Icon = panel.icon;
                                    const isMint = panel.color === "mint";
                                    return (
                                        <motion.div key={panel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 + idx * 0.08 }}
                                            onClick={() => handlePanel(panel.id)}
                                            className={`bg-white/[0.04] backdrop-blur-xl border ${isMint ? "border-mint/15" : "border-indigo/15"} rounded-xl p-4 cursor-pointer active:scale-95 transition-transform`}
                                            style={{ boxShadow: `0 0 30px ${isMint ? "rgba(16,185,129,0.05)" : "rgba(99,102,241,0.05)"}` }}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isMint ? "bg-mint/10 text-mint" : "bg-indigo/10 text-indigo"}`}>
                                                    <Icon className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="font-mono text-xs text-gray-400 tracking-wider uppercase">{panel.title}</span>
                                            </div>
                                            <div className="min-h-[55px]"><PanelPreview id={panel.id} /></div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══ SECTION OVERLAY ═══ */}
            <AnimatePresence>
                {activeSection && <SectionOverlay section={activeSection} onClose={handleClose} />}
            </AnimatePresence>

            {/* ═══ CMD+K ═══ */}
            <LabCommandPalette onNavigate={handlePanel} />

            {/* ═══ AI CHAT ═══ */}
            <AIChat />
        </main>
    );
}
