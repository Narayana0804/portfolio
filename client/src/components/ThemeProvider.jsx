"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark"); // Default to dark

    useEffect(() => {
        // Enforce dark mode
        document.documentElement.classList.add("dark");
        localStorage.setItem("ai-lab-theme", "dark");
        window.dispatchEvent(new Event("themechange"));
    }, []);

    const toggleTheme = () => {
        // Do nothing or force dark
        setTheme("dark");
        document.documentElement.classList.add("dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
