import express from 'express';
import { User } from '../models/user.model';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

router.post('/logout', async (req, res) => {
    try {
        // Assuming you are using sessions or tokens for authentication
        // Invalidate the user's session or token here
        req.session = null; // If using sessions
        // Or handle token invalidation logic if using JWT or similar

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
});