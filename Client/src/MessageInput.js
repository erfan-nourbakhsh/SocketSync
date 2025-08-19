// Import React library and useState hook
import React, { useState } from "react";

// Import custom CSS for the component
import "./MessageInput.css";

// Import Material-UI Button component
import Button from "@mui/material/Button";

// Define the NewMessage component
// Props: socket – the WebSocket connection used to send messages
const NewMessage = ({ socket }) => {
  // State to store the current input value
  const [value, setValue] = useState("");

  // Function to handle sending the message
  const submitForm = (e) => {
    if (value) {
      socket.emit("message", value); // Emit the message via WebSocket
      setValue("");                  // Clear the input field after sending
    }
  };

  return (
    // Main container for the input and send button
    <div
      style={{
        display: "flex",       // Arrange children (input + button) horizontally
        position: "fixed",     // Fixed position relative to viewport
        width: 400,            // Fixed width for chat input
        bottom: 100,           // Position 100px from the bottom of the screen
        background: "gray",    // Gray background for input area
        paddingBlock: 3,       // Vertical padding inside container
      }}
    >
      {/* Input field for typing the message */}
      <input
        autoFocus                 // Focus input automatically on render
        value={value}             // Bind input value to state
        placeholder="Type your message" // Placeholder text
        onChange={(e) => {
          setValue(e.currentTarget.value); // Update state as user types
        }}
        style={{
          width: "93%",            // Take most of the container width
          marginInline: 2,         // Small horizontal margin
          borderRadius: 6,         // Rounded corners
        }}
      />

      {/* Button to send the message */}
      <Button
        variant="contained"        // Material-UI contained button style
        onClick={() => {
          submitForm();            // Call submit function when clicked
        }}
      >
        Send
      </Button>
    </div>
  );
};

// Export the component for use in other parts of the app
export default NewMessage;
