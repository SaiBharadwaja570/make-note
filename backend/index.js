import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './models/user.model.js';
import authentication from './utilities.js'

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
      user,
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

        if (user.password !== password) {
            return res.status(400).json({ error: true, message: "Invalid email or password" });
        }

        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600m" }
        );

        return res.json({
            error: false,
            user,
            accessToken,
            message: "Login successful"
        });

    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.post('/add-note', authentication, async (req, res) => {
    
})


app.listen(8000, () => console.log("Server running on http://localhost:8000"));
