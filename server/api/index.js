const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const contactRoutes = require('../routes/contactRoutes');
const chatRoutes = require('../routes/chatRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ["https://lakshminarayana-weld.vercel.app"],
  methods: ["GET", "POST"]
}));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    } else {
      console.warn('MONGODB_URI is not defined in environment variables.');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running.' });
});

// For Vercel Serverless Functions
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
