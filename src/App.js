import { useState } from "react";
import ChatApp from "./pages/ChatApp";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [sender, setSender] = useState("");
  const [roomID, setRoomID] = useState("");
  const [receiver, setReceiver] = useState("");
  return (
    <div className="App">
      <h1 className="text-3xl text-center">This is ChatApp </h1>
      <form>
        <input
          type="text"
          placeholder="Sender"
          onChange={(e) => setSender(e.target.value)}
          className="mt-4 mb-4"
        />
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e) => setRoomID(e.target.value)}
          className="mb-4"
        />
        <input
          type="text"
          placeholder="Receiver"
          onChange={(e) => setReceiver(e.target.value)}
          className="mb-4"
        />
        <button
          className="bg-blue-500 text-white p-2"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </button>
      </form>
      <ChatApp sender={sender} receiver={receiver} roomID={roomID} />
    </div>
  );
}

export default App;
