import express from "express";
import { db } from "../db.js";
import { getAIResponse } from "../services/aiService.js";

const router = express.Router();

// POST – Create Mood (with Input Validation)
router.post("/", async (req, res) => {
  try {
    const { user_id, mood_text } = req.body;

    // --- Extra Credit: Input Validation ---
    if (!mood_text || mood_text.trim() === "") {
      return res.status(400).json({ error: "Mood text cannot be empty" });
    }

    // 1. Insert the user's mood into mood_entries
    const [result] = await db.query(
      "INSERT INTO mood_entries (user_id, mood_text) VALUES (?, ?)",
      [user_id, mood_text]
    );

    // 2. Get the response from our AI Service
    const aiMessage = await getAIResponse(mood_text);

    // 3. Insert the AI's response into ai_responses
    await db.query(
      "INSERT INTO ai_responses (mood_entry_id, ai_message) VALUES (?, ?)",
      [result.insertId, aiMessage]
    );

    res.json({ message: "Mood saved", aiMessage });
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET – Read Moods (with JOIN)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.full_name, m.mood_text, a.ai_message, m.created_at
      FROM users u
      JOIN mood_entries m ON u.id = m.user_id
      JOIN ai_responses a ON m.id = a.mood_entry_id
      ORDER BY m.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Extra Credit: DELETE Route ---
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // We delete the AI response first due to Foreign Key constraints
    await db.query("DELETE FROM ai_responses WHERE mood_entry_id = ?", [id]);
    await db.query("DELETE FROM mood_entries WHERE id = ?", [id]);
    
    res.json({ message: `Mood entry ${id} and its AI response deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;