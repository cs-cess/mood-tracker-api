// POST - Save a mood
router.post("/", async (req, res) => {
  try {
    const { mood_text } = req.body;
    // We only insert mood_text now
    await db.query("INSERT INTO mood_entries (mood_text) VALUES (?)", [mood_text]);
    res.json({ message: "Mood saved!" });
  } catch (error) {
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