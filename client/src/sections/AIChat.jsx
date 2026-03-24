"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, ChevronUp } from "lucide-react";

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! I am an AI assistant built to help you explore Lakshmi's portfolio. Ask me about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Use a simple session ID for context (would be enhanced in production)
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("https://portfolio-backend-sm7m.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: sessionId, message: input })
            });

            const data = await res.json();

            // Artificial delay for realism
            setTimeout(() => {
                setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
                setIsTyping(false);
            }, 600);

        } catch (error) {
            console.error("Chat error:", error);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-slateDeep/95 backdrop-blur-xl border border-indigo/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-indigo/10 border-b border-indigo/20 px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-indigo/20 flex items-center justify-center text-indigo">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-mint rounded-full border border-slateDeep animate-pulse"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">Portfolio AI</h3>
                                    <p className="text-base text-mint font-mono">Online & Ready</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-indigo/20 text-indigo'}`}>
                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={`px-4 py-2 rounded-2xl text-base leading-relaxed max-w-[75%] ${msg.role === 'user'
                                        ? 'bg-indigo text-white rounded-tr-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                        : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/10'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 text-gray-400">
                                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-indigo/20 text-indigo">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/20">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about projects, skills..."
                                    className="w-full bg-slateDeep/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-base text-white focus:outline-none focus:border-indigo/50 transition-colors placeholder-gray-500 font-mono"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-2 w-8 h-8 rounded-full bg-indigo flex items-center justify-center text-white disabled:opacity-50 transition-colors"
                                >
                                    <ChevronUp className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-indigo text-white flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] relative z-50 border border-indigo/50"
            >
                <Bot className="w-6 h-6" />
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-mint rounded-full border-2 border-slateDeep animate-ping"></span>
                )}
            </motion.button>
        </div>
    );
}
