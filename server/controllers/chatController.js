const Chat = require('../models/Chat');

const portfolioContext = `
You are an AI assistant for Lakshmi Narayana Swamy's portfolio.
Information about Lakshmi:
- AI & ML Engineer, System Builder, Problem Solver.
- Skills: C++, JavaScript, C, Python, NodeJS, React, Scikit-learn, TensorFlow, PyTorch, Flask, MySQL, MongoDB.
- Experience: AI & ML Intern at Infosys (Oct 2025 - Dec 2025). Engineered real-time crowd density estimation. Reduced preprocessing latency by 30%. Achieved 95% detection reliability.
- Projects: 
  1. AI-Based Subjective Exam Evaluation System (MERN, Gemini API). Reduced grading time by 80%.
  2. Adaptive Particle Swarm Optimization-Based Portfolio Optimization System (Python, Flask, APSO). Improved stability by 35%+.
  3. Crowd Density Monitoring System (PyTorch, OpenCV).
- Education: Lovely Professional University (B.Tech CSE, CGPA 8.87, Aug 2023-Present).
Answer briefly and professionally based strictly on this information.
`;

exports.handleChat = async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ error: 'userId and message are required.' });
        }

        // Very simple keyword based response for simulation if no API key
        let reply = "I am processing your request. As an AI assistant built for this portfolio, I can answer questions about Lakshmi's skills, experience, and projects.";
        const lowercaseMsg = message.toLowerCase();

        if (lowercaseMsg.includes('project')) {
            reply = "Lakshmi has several notable projects, including an AI-Based Subjective Exam Evaluation System, and an Adaptive Particle Swarm Optimization-Based Portfolio Optimization System. Would you like to know more about a specific one?";
        } else if (lowercaseMsg.includes('skill') || lowercaseMsg.includes('tech')) {
            reply = "Lakshmi's core skills include C++, Python, JavaScript, React, Node.js, PyTorch, and TensorFlow, along with database systems like MongoDB and MySQL.";
        } else if (lowercaseMsg.includes('experience') || lowercaseMsg.includes('intern') || lowercaseMsg.includes('infosys')) {
            reply = "Lakshmi interned as an AI & ML Intern at Infosys from Oct to Dec 2025, where he engineered a real-time crowd density estimation pipeline using PyTorch and OpenCV.";
        }

        // Save to DB
        if (process.env.MONGODB_URI) {
            let chat = await Chat.findOne({ userId });
            if (!chat) {
                chat = new Chat({ userId, messages: [] });
            }
            chat.messages.push({ role: 'user', content: message });
            chat.messages.push({ role: 'assistant', content: reply });
            await chat.save();
        }

        res.status(200).json({ reply });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
