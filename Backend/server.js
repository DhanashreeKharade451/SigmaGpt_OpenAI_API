//using GPT model

// import OpenAI from "openai";
// import "dotenv/config";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: "gpt-4o-mini",
//   instructions: "You are a coding assistant that talks like a pirate",
//   input: "joke related to Computer Science",
// });

// console.log(response.output_text);
//***********************************************************************************

// import ollama from "ollama";

// const response = await ollama.chat({
//   model: "llama3.2",
//   messages: [
//     {
//       role: "user",
//       content: "Tell me a joke related to Computer Science. ",
//     },
//   ],
// });

// console.log(response.message.content);

//***********************************************************

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
console.log("Connected with Database!");
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});

app.use("/api", chatRoutes);

//connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log("Failed to connect with DB", err);
  }
};
//****************************************************************************** */
//
// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: Json.stringify({
//       model: "gpt-6-astra",
//       messages: [
//         {
//           role: "user",
//           //content: "Hello!", // this is static content insted of we will use req.body
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     //to test API Endpoint
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options,
//     );
//     const data = await response.json();
//     // console.log(data.choices[0].message.content); // this is final reply
//     res.send(data.choices[0].message.content); // this final reply we will send to frontend
//   } catch (err) {
//     console.log(err);
//   }
// });
