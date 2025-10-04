import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, meetings API is working 🚀` });
});

export default router;
