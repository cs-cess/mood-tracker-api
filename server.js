import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moodRoutes from "./routes/moods.js"; // Import the routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // This line is required to read your curl data!

// This links your moods.js file to the URL path
app.use("/api/moods", moodRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});