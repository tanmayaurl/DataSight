import express from "express";
import Meeting from "../models/Meeting.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
});

router.post("/", async (req, res) => {
  const meeting = await Meeting.create(req.body);
  res.json(meeting);
});

export default router;
