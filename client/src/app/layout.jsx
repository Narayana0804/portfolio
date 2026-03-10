import Script from "next/script";
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
                {/* Chatbase Chatbot */}
                <Script id="chatbase-script" strategy="afterInteractive">
                    {`
                    (function(){
                        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                            window.chatbase=(...arguments)=>{
                                if(!window.chatbase.q){window.chatbase.q=[]}
                                window.chatbase.q.push(arguments)
                            };
                            window.chatbase=new Proxy(window.chatbase,{
                                get(target,prop){
                                    if(prop==="q"){return target.q}
                                    return(...args)=>target(prop,...args)
                                }
                            })
                        }
                        const onLoad=function(){
                            const script=document.createElement("script");
                            script.src="https://www.chatbase.co/embed.min.js";
                            script.id="5sovt9yvcwzxhRvH2_NTA";
                            script.domain="www.chatbase.co";
                            document.body.appendChild(script)
                        };
                        if(document.readyState==="complete"){
                            onLoad()
                        }else{
                            window.addEventListener("load",onLoad)
                        }
                    })();
                    `}
                </Script>
            </body>
        </html>
    );
}
