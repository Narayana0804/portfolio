export const personalData = {
    name: "Lakshmi Narayana Swamy",
    role: "AI Engineer | System Builder | Problem Solver",
    email: "lakshminarayanapakalapati28@gmail.com",
    phone: "+91-8247037946",
    github: "https://github.com/Narayana0804",
    linkedin: "https://www.linkedin.com/in/lakshmi-narayana-pakalapati",
};

export const skills = {
    languages: ["C++", "JavaScript", "C", "Python"],
    frameworks: ["NodeJS", "React", "Scikit-learn", "TensorFlow", "PyTorch", "Flask"],
    tools: ["MySQL", "MongoDB"],
    softSkills: ["Problem-Solving", "Team Player", "Adaptability"],
};

export const experience = [
    {
        company: "INFOSYS",
        role: "AI & ML Intern",
        date: "October 2025 - December 2025",
        description: [
            "Engineered the core pipeline for real-time crowd density estimation by integrating frame extraction, preprocessing, and CSRNet/MCNN-based density map generation into a unified PyTorch workflow, improving inference stability and reducing preprocessing latency by approximately 30% on ShanghaiTech dataset.",
            "Developed a live surveillance monitoring system by combining OpenCV-based video stream processing with threshold-driven overcrowding detection and alert triggers.",
            "Built a Streamlit dashboard that enables real-time visualization of heatmaps/density maps and crowd counts with over 95% detection reliability during live testing."
        ],
        tech: ["PyTorch", "OpenCV", "NumPy", "Pillow", "CSRNet/MCNN", "Streamlit", "Matplotlib", "Docker", "NVIDIA CUDA", "SMTP/Twilio API"]
    }
];

export const projects = [
    {
        title: "Dynamic Memory Management Visualizer",
        date: "December 2025",
        description: [
            "Interactive web-based tool that simulates and visualizes memory management techniques such as paging, segmentation, and virtual memory.",
            "Provides real-time visualization of memory allocation, page faults, and performance analytics with FIFO/LRU algorithms.",
            "Built with a Flask backend for simulation logic and a modern responsive frontend for real-time grid visualization."
        ],
        tech: ["Python", "Flask", "JavaScript", "HTML/CSS", "Vercel"],
        github: "https://github.com/Narayana0804/dynamic-memory-management-visualizer",
        live: "https://dynamic-memory-management-visualize.vercel.app"
    },
    {
        title: "Crowd Density Monitoring System",
        date: "October 2025 - December 2025",
        description: [
            "Engineered the core pipeline for real-time crowd density estimation by integrating frame extraction, preprocessing, and CSRNet-based density map generation into a unified PyTorch workflow.",
            "Developed a live surveillance monitoring system by combining OpenCV-based video stream processing with threshold-driven overcrowding detection.",
            "Built a Streamlit dashboard that enables real-time visualization of heatmaps/density maps and crowd counts with over 95% detection reliability."
        ],
        tech: ["PyTorch", "OpenCV", "NumPy", "Pillow", "CSRNet/MCNN", "Streamlit", "Matplotlib", "Docker"],
        github: "https://github.com/springboardmentor0509-source/deepVision_crowd_monitor/tree/lakshminarayana",
        certificate: "https://drive.google.com/file/d/1kBb8_rZtoPRrhsGp_wvR53IHz-vubSHl/view?usp=sharing"
    },
    {
        title: "AI-Based Subjective Exam Evaluation System",
        date: "June 2025 - July 2025",
        description: [
            "Built a full-stack platform to replace slow, inconsistent manual grading by allowing teachers to upload model answers and students to submit responses through a streamlined digital workflow.",
            "Integrated LLM-based semantic evaluation to score answers based on meaning, ensuring consistency across different writing styles and reducing subjective scoring biases.",
            "Delivered instant automated feedback through a Node.js backend + JS frontend, reducing grading time by 80% and enabling scalable evaluation for large batches with reliable performance efficiency."
        ],
        tech: ["MERN stack", "Tailwind CSS", "REST APIs", "LLM Integration (Gemini API)", "Vite"],
        github: "https://github.com/hemeshhere/AI-Based-Exam-Evaluation-System",
        live: "https://ai-valuation.vercel.app/"
    },
    {
        title: "Adaptive Particle Swarm Optimization-Based Portfolio Optimization System",
        date: "March 2025-April 2025",
        description: [
            "Architected a Flask-based APSO engine to replace manual, static portfolio allocation by processing multi-asset CSV data and computing returns/covariance for accurate data-driven optimization.",
            "Implemented APSO-driven weight generation with full risk analysis (volatility, drawdown, Sharpe) and clear interactive visualizations for more practical financial decision-making.",
            "Designed a modular preprocessing and optimization pipeline that improved stability by 35%+ over classical PSO and enabled easy extension to real-time financial data for modern quant workflows."
        ],
        tech: ["Python", "Flask", "Pandas", "NumPy", "APSO", "Matplotlib", "HTML/CSS/JS"],
        github: "https://github.com/Narayana0804/APSO-Portfolio-Optimizer"
    },
    {
        title: "Razors N' Scissors",
        date: "2024",
        description: [
            "Professional salon and barber shop landing page featuring a responsive design and integrated appointment booking form.",
            "Built with clean semantic HTML and custom CSS for a premium aesthetic and user experience."
        ],
        tech: ["HTML", "CSS", "UI/UX Design"],
        github: "https://github.com/Narayana0804/razors-n-scissors"
    },
    {
        title: "Envinow",
        date: "2024",
        description: [
            "Visually stunning environmental awareness landing page focused on nature conservation and landscape preservation.",
            "Features responsive layouts and high-quality imagery to engage users in environmental advocacy."
        ],
        tech: ["HTML", "CSS", "Responsive Design"],
        github: "https://github.com/Narayana0804/envinow"
    },
    {
        title: "Web Development Foundations Collection",
        date: "2024",
        description: [
            "A set of interactive web components including a digital birthday card, a destination selector, and an automated timetable system.",
            "Demonstrates core frontend development skills through various practical utility projects."
        ],
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Narayana0804/Fullstack"
    }
];

export const certificates = [
    { title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional", issuer: "Oracle University", date: "September 2025", image: "/Oracle Generative AI Professional.jpg" },
    { title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate", issuer: "Oracle University", date: "September 2025", image: "/Oracle AI Foundations Associate.jpg" },
    { title: "Full Stack Development with Gen AI", issuer: "W3grads", date: "July 2025", image: "/Full Stack Development with Gen AI.jpg" },
    { title: "Prompt Engineering", issuer: "Infosys Springboard", date: "June 2025", image: "/Prompt Engineering.jpg" },
    { title: "Artificial Intelligence Primer Certification", issuer: "Infosys Springboard", date: "June 2025", image: "/AI Primer.jpg" }
];

export const education = [
    {
        institution: "Lovely Professional University",
        degree: "Bachelor of Technology - Computer Science and Engineering",
        score: "CGPA: 8.87",
        date: "August 2023 - Present",
        location: "Phagwara, Punjab"
    },
    {
        institution: "Sasi Junior College",
        degree: "Intermediate",
        score: "Percentage: 98",
        date: "June 2021 - March 2023",
        location: "Nallajerla, Andhra Pradesh"
    },
    {
        institution: "Sasi English Medium High School",
        degree: "Matriculation",
        score: "Percentage: 99",
        date: "June 2020 - March 2021",
        location: "Nallajerla, Andhra Pradesh"
    }
];
