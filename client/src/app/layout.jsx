import './globals.css';
import { Inter, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

export const metadata = {
    title: 'Lakshmi Narayana Swamy | High-Performance AI Lab',
    description: 'AI & ML Engineer, System Builder, and Problem Solver portfolio.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
            <body className="antialiased selection:bg-indigo-500/30">
                {children}
            </body>
        </html>
    );
}
