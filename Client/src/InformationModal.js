// Import React library for using JSX and hooks
import React from "react";

// Import Material-UI Dialog components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Import Material-UI layout and button components
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Import custom table components for different operations
import Average from "./Operations/Average";
import Min from "./Operations/Min";
import Max from "./Operations/Max";
import Sort from "./Operations/Sort";

// Define the InformationModal component
// Props: open (boolean), handleClose (function), socket (WebSocket), handleAddStudent (function)
const InformationModal = ({ open, handleClose, socket, handleAddStudent }) => {
  // State to track selected operation
  const [operation, setOperation] = React.useState("");
  // State to store results for each operation
  const [avgRes, setAvgRes] = React.useState([]);
  const [minRes, setMinRes] = React.useState([]);
  const [maxRes, setMaxRes] = React.useState([]);
  const [sortRes, setSortRes] = React.useState([]);
  // State to track if "Get Result" button was clicked
  const [clickButton, setClickButton] = React.useState(false);

  return (
    <div>
      {/* Main Dialog component */}
      <Dialog
        open={open} // Controls visibility
        onClose={() => {
          // Reset all state when dialog closes
          handleClose();
          setOperation("");
          setAvgRes([]);
          setMinRes([]);
          setMaxRes([]);
          setSortRes([]);
          setClickButton(false);
        }}
        sx={{ ".MuiDialog-paper": { minWidth: 800 } }} // Set minimum width
      >
        {/* Dialog header */}
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: 50,
            alignItems: "center",
            boxShadow: "1px 0.2px gray",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Get Students Information</p>
          {/* Button to open Add Student modal */}
          <Button onClick={handleAddStudent}>Add Student</Button>
        </DialogTitle>

        {/* Dialog body */}
        <DialogContent style={{ minHeight: 100 }}>
          {/* Instruction text */}
          <DialogContentText style={{ marginTop: 20 }}>
            Please Choose One of the following options
          </DialogContentText>

          {/* Row of operation buttons */}
          <Stack
            direction="row"
            spacing={1}
            style={{ marginTop: 10, justifyContent: "center" }}
          >
            {/* Average button */}
            <Button
              children="Average"
              variant={operation === "Average" ? "contained" : "outlined"} // Highlight if selected
              onClick={() => {
                setOperation("Average"); // Set selected operation
                setClickButton(false);   // Reset click state
              }}
            />

            {/* Sort button */}
            <Button
              children="Sort"
              variant={operation === "Sort" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Sort");
                setClickButton(false);
              }}
            />

            {/* Max button */}
            <Button
              children="Max"
              variant={operation === "Max" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Max");
                setClickButton(false);
              }}
            />

            {/* Min button */}
            <Button
              children="Min"
              variant={operation === "Min" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Min");
                setClickButton(false);
              }}
            />
          </Stack>
        </DialogContent>

        {/* Dialog footer with "Get Result" button */}
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={!operation} // Disabled until an operation is selected
            onClick={() => {
              setClickButton(true);     // Mark that button was clicked
              socket.emit(operation);   // Emit selected operation to server
              socket.on(`${operation}-result`, (message) => {
                // Update corresponding state when server returns results
                switch (operation) {
                  case "Average":
                    setAvgRes(message);
                    break;
                  case "Min":
                    setMinRes(message);
                    break;
                  case "Max":
                    setMaxRes(message);
                    break;
                  case "Sort":
                    setSortRes(message);
                    break;
                  default:
                    break;
                }
              });
            }}
          >
            Get Result
          </Button>
        </DialogActions>

        {/* Conditionally render results table after operation is selected and button clicked */}
        {!!operation && clickButton && (
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            {operation === "Average" ? (
              <Average students={avgRes} />
            ) : operation === "Min" ? (
              <Min students={minRes} />
            ) : operation === "Max" ? (
              <Max students={maxRes} />
            ) : operation === "Sort" ? (
              <Sort students={sortRes} />
            ) : null}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

// Export the component for use in other parts of the app
export default InformationModal;
