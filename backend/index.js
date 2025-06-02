import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './models/user.model.js';
import authentication from './utilities.js'
import bcrypt from 'bcrypt';
import Note from './models/notes.model.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get("/", (req, res) => {
  res.json({ data: "Hello" });
});

app.post('/create-account', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields required" });
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    const user = await User.create({ fullName, email, password });

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600m" }
    );

    return res.json({
      error: false,
      user: { _id: user._id, fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration successful"
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: true, message: "User already exists (duplicate in DB)" });
    }

    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "All fields required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: true, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Invalid email or password" });
        }

        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600m" }
        );

        return res.json({
            error: false,
            user: { _id: user._id, fullName: user.fullName, email: user.email },
            accessToken,
            message: "Login successful"
        });

    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.post('/add-note', authentication, async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: true, message: "Title and content are required" });
    }
    try {
        const note = await Note.create({
            title,
            content,
            tags: tags || [],
            isPinned: isPinned || false,
            userId: req.user.id
        });
        res.json({ error: false, note, message: "Note added successfully" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.get('/notes', authentication, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ isPinned: -1, createdOn: -1 });
        res.json({ error: false, notes });
    } catch (err) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.put('/note/:id', authentication, async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content, tags },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });
        res.json({ error: false, note, message: "Note updated successfully" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.delete('/note/:id', authentication, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });
        res.json({ error: false, message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.patch('/note/:id/pin', authentication, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });
        note.isPinned = !note.isPinned;
        await note.save();
        res.json({ error: false, note, message: note.isPinned ? "Note pinned" : "Note unpinned" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
