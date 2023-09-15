import React, { useEffect, useState } from "react";
import ScrollBottom from "react-scroll-to-bottom";

export default function Chat({ Socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await Socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    Socket.off("receive_message");
    Socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [Socket]);

  return (
    <ScrollBottom className="scroll-container">
      <div className="chat--container">
        <div className="chat-header">
          <p className="connected--header">You are now connected</p>
        </div>
        <div className="chat-body">
          {messageList.map((mess) => {
            return (
              <div
                className="message--container"
                id={mess.author === username ? "you" : "other"}
              >
                <div className="message">
                  <p className="message--content">{mess.message}</p>
                  <div className="auth--time">
                    <p>{mess.time}</p>
                    <p className="author">{mess.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat--footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Message..."
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <button className="send--message" onClick={() => sendMessage()}>
            Send
          </button>
        </div>
      </div>
    </ScrollBottom>
  );
}
