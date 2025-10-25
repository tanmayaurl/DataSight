import Meeting from "../models/Meeting.js";

export const createMeeting = async (req, res) => {
  try {
    const { title, date, participants, notes } = req.body;
    const meeting = await Meeting.create({
      user: req.user._id,
      title,
      date,
      participants,
      notes,
    });
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ user: req.user._id }).sort({
      date: 1,
    });
    res.json(meetings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
