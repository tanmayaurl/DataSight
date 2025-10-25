import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    // You can customize this logic to pull from your DB later
    const reports = [
      { id: 1, title: "Weekly Team Report", status: "Completed", date: "2025-10-20" },
      { id: 2, title: "Sprint Analysis", status: "In Progress", date: "2025-10-23" },
      { id: 3, title: "Meeting Summary", status: "Completed", date: "2025-10-24" },
    ];
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

export default router;
