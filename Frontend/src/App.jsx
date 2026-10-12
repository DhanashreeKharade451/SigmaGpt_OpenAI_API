import "./App.css";
import Sidebar from "./sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrThreadId] = useState(uuidv1()); //uuid creates unique id
  const [prevChat, setprevChats] = useState([]); //stores all chats of curr threads, cahts means sequence of prompt and replies
  const [newChat, setNewChat] = useState(true); //here true means when we start new chat it will open new chat window

  //pass above states in providervalues
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChat,
    setprevChats,
  }; //passing values from this object to sidebar and chatwindow

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  );
}

export default App;
