import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Chat() {
  const { newChat, prevChats } = useContext(MyContext);

  return (
    <>
      {newChat && <h1>Start a new chat!</h1>}
      <div className="chats">
        <div className="userDiv">
          <p className="userMessage"> user Message</p>
        </div>
        <div className="gptDiv">
          <p className="gptMessage"> GPT Generated Message</p>
        </div>
      </div>
    </>
  );
}

export default Chat;
