import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createMeeting, getMeetings } from "../controllers/meetingController.js";

const router = express.Router();

// Protected routes
router.post("/", protect, createMeeting);   // create new meeting
router.get("/", protect, getMeetings);      // get all meetings of user

export default router;
