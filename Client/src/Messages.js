// Import React and hooks
import React, { useEffect, useState } from "react";
// Import CSS for styling the messages
import "./Messages.css";

// Define the Messages component
// Props:
// - socket: WebSocket connection to receive and send messages
function Messages({ socket }) {
  // State to store messages as an object with message IDs as keys
  const [messages, setMessages] = useState({});

  // useEffect to handle incoming messages and clean up listeners
  useEffect(() => {
    // Listener for new messages
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }; // Copy previous messages
        newMessages[message.id] = message;       // Add or update message by ID
        return newMessages;
      });
    };

    // Listener for message deletion
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }; // Copy previous messages
        delete newMessages[messageID];           // Remove the message with the given ID
        return newMessages;
      });
    };

    // Attach the listeners to the socket events
    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages"); // Request the initial list of messages

    // Cleanup function to remove listeners when component unmounts or socket changes
    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket]);

  return (
    // Container for all messages
    <div className="message-list">
      {/* Convert messages object to array, sort by time, and render */}
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div style={{ marginInline: 10 }} key={message.id}>
            {/* Display sender name */}
            <p
              style={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize: 12,
                marginRight: 2,
                color: "blue",
              }}
            >
              {message.user} :
            </p>

            {/* Message bubble */}
            <div
              style={{
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                paddingBlock: 3,
                paddingInline: 3,
                marginTop: -5,
                boxShadow: "1px 1px 1px 1px #888888",
              }}
            >
              {/* Message text */}
              <p
                style={{ fontSize: 12, marginLeft: 2, wordBreak: "break-all" }}
              >
                {message.value}
              </p>
            </div>

            {/* Timestamp */}
            <p style={{ textAlign: "right", fontSize: 8, fontWeight: "bold" }}>
              {new Date(message.time).toLocaleTimeString()}
            </p>
          </div>
        ))}
    </div>
  );
}

// Export the Messages component for use in other parts of the app
export default Messages;
