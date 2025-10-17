import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true },
    description: { type: String },
    date: { type: Date,
       required: true },
    startTime: { type: String, required: true }, // e.g. "10:00 AM"
    endTime: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
