/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--bg-main)",
                slateDeep: "var(--bg-surface)",
                indigo: "var(--color-primary)",
                mint: "var(--color-accent)",
                surface: "var(--bg-surface)",
                textMain: "var(--color-text)",
                borderLight: "var(--color-border)",
                white: "var(--color-text)",
                gray: {
                    300: "var(--color-gray-300)",
                    400: "var(--color-gray-400)",
                    500: "var(--color-gray-500)",
                    600: "var(--color-gray-600)"
                }
            },
            fontFamily: {
                mono: ['var(--font-fira-code)', 'monospace'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
            },
        },
    },
    plugins: [],
};
