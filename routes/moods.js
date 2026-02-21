import express from "express";
import { db } from "../db.js";

const router = express.Router();

// 1. POST - Save a mood to the "moods" table
router.post("/", async (req, res) => {
  try {
    // We get mood_text from your website
    const { mood_text } = req.body;

    if (!mood_text) {
      return res.status(400).json({ error: "Mood text is required" });
    }

    // Insert into the table you actually have in Railway
    const [result] = await db.query(
      "INSERT INTO moods (mood_text) VALUES (?)",
      [mood_text]
    );

    res.json({ message: "Mood saved successfully!", id: result.insertId });
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. GET - Read moods from the "moods" table
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM moods ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;