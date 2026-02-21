import express from "express";
import { db } from "../db.js";

const router = express.Router();

// POST - Save a mood
router.post("/", async (req, res) => {
  try {
    const { mood_text } = req.body;
    // This matches the simple table we discussed
    await db.query("INSERT INTO mood_entries (mood_text) VALUES (?)", [mood_text]);
    res.json({ message: "Mood saved!" });
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Show moods
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM mood_entries");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// THIS IS THE LINE YOU ARE MISSING
export default router;