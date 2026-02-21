import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moodRoutes from "./routes/moods.js";

dotenv.config();
const app = express();

// 1. Middlewares
app.use(cors()); // Allows GitHub Pages to talk to Render
app.use(express.json()); // Allows the server to read the mood data you send

// 2. Routes
app.use("/api/moods", moodRoutes); // Connects to your moods.js logic

// 3. Port Configuration
// Using 0.0.0.0 is a best practice for Render to ensure it's "visible"
const PORT = process.env.PORT || 8080; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});