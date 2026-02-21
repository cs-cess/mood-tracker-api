import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET - Show moods
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM moods");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Save a mood
router.post("/", async (req, res) => {
  try {
    const { mood_text } = req.body;
    // This matches the "moods" table name in your Railway screenshot
    await db.query("INSERT INTO moods (mood_text) VALUES (?)", [mood_text]);
    res.json({ message: "Mood saved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;