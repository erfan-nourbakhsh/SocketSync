// Import core React functions and hooks
import React, { useEffect, useState } from "react";

// Import custom modal/dialog components
import CustomDialog from "./CustomDialog";
import "./App.css"; // Import main stylesheet
import io from "socket.io-client"; // Socket.IO client for real-time communication
import Button from "@mui/material/Button"; // Material UI Button component
import { ParticlesContainer } from "./Graph"; // Custom particle animation background
import TeenagerModal from "./TeenagerModal"; // Modal for adding student info
import InformationModal from "./InformationModal"; // Modal for fetching info
import MessageIcon from "@mui/icons-material/Message"; // Chat button icon
import Messages from "./Messages"; // Chat messages component
import MessageInput from "./MessageInput"; // Chat input box

function App() {
  // ---------------- STATE HOOKS ----------------
  const [socket, setSocket] = useState(null); // Store socket connection
  const [isHidden, setIsHidden] = useState(true); // Toggle chat box visibility
  const [addTeenagerModalIsOpen, setAddTeenagerModalIsOpen] = useState(false); // Control TeenagerModal open/close
  const [informationModalIsOpen, setInformationModalIsOpen] = useState(false); // Control InformationModal open/close
  const [nameModalIsOpen, setNameModalIsOpen] = useState(false); // Control Name dialog open/close

  // ---------------- EFFECT: SOCKET CONNECTION ----------------
  useEffect(() => {
    const newSocket = io(`http://localhost:8080/`); // Connect to backend server
    setSocket(newSocket); // Save socket instance in state
    return () => {
      newSocket.close(); // Cleanup socket connection when component unmounts
    };
  }, [setSocket]);

  // ---------------- EFFECT: OPEN NAME MODAL INITIALLY ----------------
  React.useEffect(() => {
    setNameModalIsOpen(true); // Show name modal on first render
  }, []);

  return (
    <div className="App">
      {/* Background particle animation */}
      <ParticlesContainer />

      {/* Chat box (conditionally visible) */}
      {!isHidden && (
        <div
          style={{
            width: 400,
            height: 400,
            background: "white",
            position: "fixed",
            bottom: 100,
            right: 10,
            borderRadius: 16,
          }}
        >
          {/* Chat Room Header */}
          <p style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
            Chat Room
          </p>
          {/* Horizontal divider */}
          <div style={{ width: "100%", height: 0.5, background: "gray" }} />
          {/* Chat container with messages + input */}
          <div
            className="chat-container"
            style={{
              maxHeight: "75%",
              overflowY: "scroll",
            }}
          >
            <Messages socket={socket} /> {/* Display messages */}
            <MessageInput socket={socket} /> {/* Input to send message */}
          </div>
        </div>
      )}

      {/* Floating chat toggle button */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 20,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          background: "skyblue",
          width: 60,
          height: 60,
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => setIsHidden((prev) => !prev)} // Toggle chat box visibility
      >
        {/* Chat bubble icon inside button */}
        <MessageIcon
          style={{
            color: "white",
            marginTop: "28%",
            marginLeft: "5%",
            fontSize: 30,
          }}
        />
      </div>

      {/* App header section */}
      <header className="App-header">
        {/* Title */}
        <h1 style={{ color: "skyblue", zIndex: 1 }}>Socket Programming</h1>

        {/* TeenagerModal for adding a student */}
        <TeenagerModal
          open={addTeenagerModalIsOpen} // open/close control
          handleClose={() => {
            setAddTeenagerModalIsOpen(false); // Close modal
          }}
          handleSubmit={(data) => {
            socket.emit("sendStudents", data); // Send student data to server
            setAddTeenagerModalIsOpen(false); // Close modal after submission
          }}
          socket={socket}
        />

        {/* Buttons for opening modals */}
        <div style={{ display: "flex", gap: 10, marginTop: 200 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setAddTeenagerModalIsOpen(true); // Open Add Student modal
            }}
          >
            Add Student
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setInformationModalIsOpen(true); // Open Information modal
            }}
          >
            Get Information
          </Button>
        </div>

        {/* Description text */}
        <p
          style={{
            zIndex: 1,
            wordBreak: "break-all",
            maxWidth: 540,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Design and implementation of programs under the student information
          network
        </p>

        {/* Footer credit */}
        <div
          style={{
            marginTop: "auto",
            zIndex: 99999,
            fontSize: 18,
            marginBottom: 5,
          }}
        >
          <a
            href="https://www.linkedin.com/in/erfan-nourbakhsh-221540197/"
            style={{ color: "white", textDecoration: "none" }}
          >
            Created By Erfan Nourbakhsh | Spring-2022
          </a>
        </div>

        {/* Conditionally render modals only if socket is available */}
        {socket ? (
          <>
            {/* Information modal */}
            <InformationModal
              open={informationModalIsOpen}
              handleClose={() => {
                setInformationModalIsOpen(false);
              }}
              socket={socket}
              handleAddStudent={() => {
                setAddTeenagerModalIsOpen(true);
              }}
            />

            {/* Dialog for entering faculty name */}
            <CustomDialog
              open={nameModalIsOpen}
              handleSubmit={(data) => {
                socket.emit("sendFacultyName", data); // Send faculty name to server
                setNameModalIsOpen(false); // Close modal
              }}
            />
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App; // Export App component for rendering
