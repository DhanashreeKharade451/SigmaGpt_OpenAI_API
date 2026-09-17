import mongoose from "mongoose";

//create message schema
const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: trusted,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ThreadSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true, // thread id is unique identifier for each thread
  },
  title: {
    type: String,
    default: "New Chat",
  },
  messages: [MessageSchema],
  cratedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Thread", ThreadSchema);
