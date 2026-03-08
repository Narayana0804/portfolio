"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Home, User, Code, Briefcase, Mail } from "lucide-react";

export default function CommandPaletteWrapper({ children }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const scrollToSection = (id) => {
        setOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
            >
                <div className="w-full max-w-lg bg-slateDeep border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="flex items-center px-4 py-3 border-b border-white/10">
                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 font-mono text-sm"
                        />
                    </div>
                    <Command.List className="p-2 overflow-y-auto max-h-[300px]">
                        <Command.Empty className="py-6 text-center text-sm text-gray-500">No results found.</Command.Empty>
                        <Command.Group heading="Navigation" className="text-xs text-gray-400 px-2 py-2">
                            <Command.Item
                                onSelect={() => scrollToSection("hero")}
                                className="flex items-center px-4 py-2 mt-1 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10 transition-colors"
                            >
                                <Home className="w-4 h-4 mr-3" /> Home
                            </Command.Item>
                            <Command.Item
                                onSelect={() => scrollToSection("about")}
                                className="flex items-center px-4 py-2 mt-1 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10 transition-colors"
                            >
                                <User className="w-4 h-4 mr-3" /> About & Skills
                            </Command.Item>
                            <Command.Item
                                onSelect={() => scrollToSection("experience")}
                                className="flex items-center px-4 py-2 mt-1 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10 transition-colors"
                            >
                                <Briefcase className="w-4 h-4 mr-3" /> Experience
                            </Command.Item>
                            <Command.Item
                                onSelect={() => scrollToSection("projects")}
                                className="flex items-center px-4 py-2 mt-1 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10 transition-colors"
                            >
                                <Code className="w-4 h-4 mr-3" /> Projects
                            </Command.Item>
                            <Command.Item
                                onSelect={() => scrollToSection("contact")}
                                className="flex items-center px-4 py-2 mt-1 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10 transition-colors"
                            >
                                <Mail className="w-4 h-4 mr-3" /> Contact
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </div>
            </Command.Dialog>
            {children}
        </>
    );
}
