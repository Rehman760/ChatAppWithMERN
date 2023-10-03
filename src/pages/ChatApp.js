import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatApp = ({ sender, receiver, roomID }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Replace with your backend API endpoints
  const sendMessage = async () => {
    try {
      const response = await axios.post("/api/create", {
        message: newMessage,
        sender: sender,
        receiver: receiver,
        roomID: roomID,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // Replace with your backend API endpoint for getting messages
    axios
      .get("/api/:roomID")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error getting messages:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="border border-gray-300 p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="text-gray-500">{message.sender}: </span>
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="w-3/4 p-2 border border-gray-300"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="w-1/4 bg-blue-500 text-white p-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
