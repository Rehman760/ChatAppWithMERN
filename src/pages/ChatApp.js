import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatApp = ({ sender, receiver, roomID, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Function to send a message through the socket
  const sendMessageToSocket = async (message) => {
    await socket.emit("message", {
      message,
      sender,
      receiver,
      roomID,
    });
  };

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    try {
      // Send the message to the server for storage in the database
      const response = await axios.post("/api/create", {
        message: newMessage,
        sender: sender,
        receiver: receiver,
        roomID: roomID,
      });

      // Add the message to the local state
      setMessages([...messages, response.data]);

      // Send the message via the socket for real-time updates
      sendMessageToSocket(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setNewMessage(""); // Clear the input field after sending
  };

  useEffect(() => {
    // Replace with your backend API endpoint for getting messages
    axios
      .get(`/api/${roomID}`) // Use the correct endpoint URL
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error getting messages:", error));
  }, [newMessage, messages, roomID]);

  return (
    <div className="container mx-auto p-4">
      <div className="border border-gray-300 p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="text-gray-500">{message.sender}: </span>
            {message.message}
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
          onClick={handleSendMessage}
          onKeyPress={(event) => {
            event.key === "Enter" && handleSendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
