import Meeting from "../models/Meeting.js";

// @desc    Create new meeting
// @route   POST /api/meetings
// @access  Private
export const createMeeting = async (req, res) => {
  const { title, date, participants } = req.body;

  try {
    const meeting = new Meeting({
      title,
      date,
      participants,
      createdBy: req.user._id,
    });

    const createdMeeting = await meeting.save();
    res.status(201).json(createdMeeting);
  } catch (error) {
    res.status(400).json({ message: "Error creating meeting", error });
  }
};

// @desc    Get all meetings for logged-in user
// @route   GET /api/meetings
// @access  Private
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ createdBy: req.user._id }).populate("participants", "name email");
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meetings", error });
  }
};
