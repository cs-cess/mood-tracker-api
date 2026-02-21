import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET all moods to show history
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM moods ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new mood
router.post("/", async (req, res) => {
  try {
    // This looks for 'mood_text' OR 'mood' just in case the frontend is stubborn
    const mood_text = req.body.mood_text || req.body.mood;
    
    if (!mood_text) {
      return res.status(400).json({ error: "No mood data received" });
    }

    // Insert into your Railway table 'moods' and column 'mood_text'
    await db.query("INSERT INTO moods (mood_text) VALUES (?)", [mood_text]);
    
    res.json({ message: "Mood saved successfully!", savedValue: mood_text });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;