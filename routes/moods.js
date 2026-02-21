import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM moods");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { mood_text } = req.body;
    // We are inserting into 'moods' table, 'mood_text' column
    await db.query("INSERT INTO moods (mood_text) VALUES (?)", [mood_text]);
    res.json({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;