const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userId: {
        type: String,   // A simple session ID or visitor ID
        required: true,
    },
    messages: [{
        role: { type: String, enum: ['user', 'assistant'] },
        content: { type: String }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', ChatSchema);
