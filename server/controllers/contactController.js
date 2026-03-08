const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newContact = new Contact({ name, email, message });
        if (process.env.MONGODB_URI) {
            await newContact.save();
        } else {
            console.log('Simulation Mode: Contact saved in memory:', newContact);
        }

        res.status(201).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
