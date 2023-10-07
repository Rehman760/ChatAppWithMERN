import { useState } from "react";
import ChatApp from "./pages/ChatApp";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [showCat, setShowCat] = useState(false);

  const joinRoom = () => {
    if (sender !== "" && receiver !== "") {
      socket.emit("join_room", receiver);
      setShowCat(true);
    }
  };
  return (
    <div className="App">
      {console.log("showCat", showCat)}
      <h1 className="text-3xl text-center">This is ChatApp </h1>
      {!showCat ? (
        <div className="flex justify-center items-center  ">
          <form className="border-2 border-gray-600 w-64 align-center justify-center">
            <input
              type="text"
              placeholder="Sender"
              onChange={(e) => setSender(e.target.value)}
              className="m-5 border border-gray-600"
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Receiver"
              onChange={(e) => setReceiver(e.target.value)}
              className="m-5 border border-gray-600"
            />
            <br />
            <button
              className="flex items-end justify-end bg-blue-500 text-white p-2 m-6 rounded"
              type="submit"
              onClick={joinRoom}
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <ChatApp sender={sender} receiver={receiver} socket={socket} />
      )}
    </div>
  );
}

export default App;
