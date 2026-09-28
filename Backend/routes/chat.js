import express from "express";
import { Threads } from "openai/resources/beta/threads/threads.js";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router(); //variable to reate routes

//route for testing Database
router.post("/test", async (req, res) => {
  try {
    //creating a thread
    const thread = new Thread({
      threadId: "xyz",
      title: "Testing New Thread",
    });

    //save the thread
    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to save in DB",
      details: err.message,
    });
  }
});

//Creating All routes
//Route1: Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 }); //it will fetch all threads and We will store it in  variable threads
    //descending order of updatedAt ... most recent data on top
    res.json(threads); //return all threads in response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

//Route2: Send the information of perticular thread based on the thread ID
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

//route3: delete thread based on perticulat ID
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

// chat route (very imp and main route)

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      //create new thread in DB
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      //push messages in existing thread
      thread.messages.push({ role: "user", content: message });
    }
    //this assistantreply we will store in thread in the database
    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});
export default router;
