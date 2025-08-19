// Import React library
import React from "react";

// Define a functional component "Message"
// Props: 
// - isYou: boolean indicating if the message is sent by the current user
// - name: sender's name, default is "asdasd" if not provided
const Message = ({ isYou, name = "asdasd" }) => {
  return (
    <div
      style={{
        background: "white",                // Set background color of the message
        width: "80%",                       // Message box takes 80% of the container width
        borderTopLeftRadius: isYou ? 20 : 0,  // Rounded corner conditionally for current user
        borderTopRightRadius: isYou ? 0 : 20, // Rounded corner conditionally for other users
        borderBottomLeftRadius: 20,         // Bottom left corner rounded
        borderBottomRightRadius: 20,        // Bottom right corner rounded
        // paddingBlock: 3,                 // Optional padding (commented out)
        marginTop: 5,                        // Top margin between messages
        marginInline: 5,                     // Horizontal margin
        marginLeft: isYou ? "auto" : 5,      // Align current user messages to the right
      }}
    >
      {/* Display sender name */}
      <p style={{ fontSize: 12, color: "blue", marginLeft: 2 }}>
        {isYou ? "Me" : name}  {/* Show "Me" if current user, else show sender's name */}
      </p>
    </div>
  );
};

// Export the Message component for use in other parts of the app
export default Message;
