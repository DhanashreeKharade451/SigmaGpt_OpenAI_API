import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  // prompt should display in inputbox and both should display in chat as well
  const { prompt, setPrompt, reply, setReply, currentThreadId } =
    useContext(MyContext);
  const [loading, setLoading] = useState(false); //whaen we send prompt then it will be true and we can see loader until we get reply for our prompt . and we will make it true in function getReply

  const getReply = async () => {
    setLoading(true);
    console.log("message", prompt, "threadID", currentThreadId);
    const options = {
      //these option we will pass to the backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SigmaGPT <i className="fa-solid fa-angle-down"></i>
        </span>
        {/* clickable icon div */}
        <div className="userIconDiv">
          <span className="usericon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>

      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>

      <div className="chatInput">
        <div className="userInput">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key == "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">ChatGPT can make mistakes. Check important info</p>
      </div>
    </div>
  );
}

export default ChatWindow;
