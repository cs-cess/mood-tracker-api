import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET - This is what shows up when you visit the link in the browser
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM moods");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - This is what happens when you click "Save to Database"
router.post("/", async (req, res) => {
  try {
    const { mood_text } = req.body;
    
    // We insert into the table/column we see in your Railway screenshot
    await db.query("INSERT INTO moods (mood_text) VALUES (?)", [mood_text]);
    
    res.json({ message: "Mood saved successfully!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;