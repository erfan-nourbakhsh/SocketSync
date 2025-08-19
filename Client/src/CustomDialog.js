// Import the entire React library (needed for hooks like useState)
import * as React from "react";

// Import the Button component from Material-UI
import Button from "@mui/material/Button";

// Import the TextField (input box) component from Material-UI
import TextField from "@mui/material/TextField";

// Import the Dialog (popup modal) component from Material-UI
import Dialog from "@mui/material/Dialog";

// Import the DialogActions section (footer area of dialog for buttons)
import DialogActions from "@mui/material/DialogActions";

// Import the DialogContent section (main body area of dialog)
import DialogContent from "@mui/material/DialogContent";

// Import DialogContentText (for descriptive text inside the dialog)
import DialogContentText from "@mui/material/DialogContentText";

// Import DialogTitle (header/title of dialog)
import DialogTitle from "@mui/material/DialogTitle";

// Define and export the FormDialog component
// It accepts props: open (boolean), handleClose (function), handleSubmit (function)
export default function FormDialog({ open, handleClose, handleSubmit }) {
  
  // useState hook to store the current input value
  const [value, setValue] = React.useState("");

  // Component returns JSX (UI structure)
  return (
    <div>
      {/* Main Dialog (popup modal) */}
      <Dialog
        open={open} // Determines if the dialog is open or closed
        onClose={handleClose} // Callback function when user closes the dialog
        sx={{ ".MuiDialog-paper": { minWidth: 500 } }} // Set minimum width for dialog box
      >
        {/* Title section of the dialog */}
        <DialogTitle style={{ fontWeight: "bold" }}>Faculty Name</DialogTitle>
        
        {/* Main content section of the dialog */}
        <DialogContent>
          {/* Helper text/instructions for the user */}
          <DialogContentText>
            Please Enter the name of your faculty
          </DialogContentText>

          {/* Input field for faculty name */}
          <TextField
            style={{ marginTop: 25 }} // Add top margin for spacing
            autoFocus // Auto-focus the input field when dialog opens
            label="Faculty Name" // Placeholder label text
            fullWidth // Makes input take full width
            value={value} // Controlled component (input value from state)
            onChange={(e) => setValue(e.target.value)} // Update state when typing
          />
        </DialogContent>

        {/* Footer section of the dialog (for action buttons) */}
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          {/* Submit button */}
          <Button
            style={{ width: 180 }} // Set fixed width
            onClick={() => {
              // Call the handleSubmit function with the current input value
              handleSubmit(value);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
