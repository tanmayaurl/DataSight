import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
