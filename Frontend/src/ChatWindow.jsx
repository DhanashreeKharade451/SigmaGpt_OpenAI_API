import "./ChatWindow.css";
import Chat from "./Chat.jsx";
function ChatWindow() {
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SigmaGPT <i class="fa-solid fa-angle-down"></i>
        </span>
        {/* clickable icon div */}
        <div className="userIconDiv">
          <span className="usericon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      <div className="chatInput">
        <div className="userInput">
          <input type="text" placeholder="Ask anything" />
          <div id="submit">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">ChatGPT can make mistakes. Check important info</p>
      </div>
    </div>
  );
}

export default ChatWindow;
