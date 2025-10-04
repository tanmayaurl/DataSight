import Meeting from "../models/Meeting.js";

// @desc    Create a new meeting
export const createMeeting = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, participants } = req.body;

    const meeting = await Meeting.create({
      title,
      description,
      date,
      startTime,
      endTime,
      createdBy: req.user._id, // from auth middleware
      participants,
    });

    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating meeting" });
  }
};

// @desc    Get all meetings of logged-in user
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [{ createdBy: req.user._id }, { participants: req.user._id }],
    }).populate("participants", "name email");

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching meetings" });
  }
};

// @desc    Delete meeting
export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Only creator can delete
    if (meeting.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await meeting.deleteOne();
    res.json({ message: "Meeting deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting meeting" });
  }
};
