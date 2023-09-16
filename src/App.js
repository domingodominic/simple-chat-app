import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://locahost:3004");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      <div className="container">
        {!showChat ? (
          <div className="room--container">
            <h2>Join</h2>
            <div className="inputs">
              <input
                className="username"
                type="text"
                placeholder="Name..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                className="room"
                type="text"
                placeholder="Room ID"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <button
              className="join--btn"
              onClick={() => {
                joinRoom();
              }}
            >
              JOIN ROOM
            </button>{" "}
          </div>
        ) : (
          <Chat Socket={socket} username={username} room={room} />
        )}
      </div>
    </div>
  );
}

export default App;
