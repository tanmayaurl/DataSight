import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  title: String,
  time: String,
  participants: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Meeting", meetingSchema);
