// Import necessary React and MUI components
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2"; // For pop-up alerts

// Define TeenagerModal component with props: socket, open, handleClose, handleSubmit
const TeenagerModal = ({ socket, open, handleClose, handleSubmit }) => {
  // State variables for student personal information
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [nationalCode, setNationalCode] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");

  // State variables for 5 courses and their grades
  const [courseName1, setCourseName1] = React.useState("");
  const [courseGrade1, setCourseGrade1] = React.useState("");
  const [courseName2, setCourseName2] = React.useState("");
  const [courseGrade2, setCourseGrade2] = React.useState("");
  const [courseName3, setCourseName3] = React.useState("");
  const [courseGrade3] = React.useState("");
  const [courseName4, setCourseName4] = React.useState("");
  const [courseGrade4, setCourseGrade4] = React.useState("");
  const [courseName5, setCourseName5] = React.useState("");
  const [courseGrade5, setCourseGrade5] = React.useState("");

  // Create a FileReader instance for reading CSV files
  const fileReader = new FileReader();

  // Handle CSV file input change
  const handleOnChange = (e) => {
    handleOnSubmit(e.target.files[0]); // Pass the selected file to submit handler
  };

  // Process CSV file and emit student data to the server
  const handleOnSubmit = (val) => {
    if (val) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result; // Get CSV content as text
        socket.emit("sendStudentsCSV", csvOutput); // Send CSV data via socket
      };
      fileReader.readAsText(val); // Read file as text
      handleClose(); // Close modal
      Swal.fire({ // Show success message
        title: "success",
        text: "Students Imported Successfully",
        icon: "success",
      });
    }
  };

  return (
    <Dialog
      open={open} // Control modal visibility
      onClose={() => { // Reset all fields on modal close
        handleClose();
        setFirstName("");
        setLastName("");
        setNationalCode("");
        setIdNumber("");
        setCourseName1("");
        setCourseGrade1("");
        setCourseName2("");
        setCourseGrade2("");
        setCourseName3("");
        setCourseGrade3("");
        setCourseName4("");
        setCourseGrade4("");
        setCourseName5("");
        setCourseGrade5("");
      }}
      sx={{ // Styling for dialog and scrollbar
        ".MuiDialog-paper": { minWidth: 750 },
        "*::-webkit-scrollbar": { width: "0.5rem" },
        "*::-webkit-scrollbar-thumb": { backgroundColor: "#A1A6B0", borderRadius: "20px" },
      }}
    >
      {/* Dialog header */}
      <DialogTitle style={{
        display: "flex",
        justifyContent: "space-between",
        height: 50,
        alignItems: "center",
        boxShadow: "1px 0.2px gray",
      }}>
        <p style={{ fontWeight: "bold" }}>Add Student</p>
        {/* CSV Import button */}
        <Button variant="contained" component="label">
          <input
            id="csvInput"
            name="file"
            type="File"
            hidden
            onChange={handleOnChange} // Handle CSV file selection
            accept={".csv"} // Only CSV files
          />
          Import Students
        </Button>
      </DialogTitle>

      {/* Dialog body for entering student info */}
      <DialogContent>
        <DialogContentText style={{ marginTop: 5 }}>
          Please Enter the details for teenager you want to add
        </DialogContentText>

        {/* First & Last Name */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 15 }}>
          <TextField
            style={{ marginTop: 25 }}
            label="First Name"
            autoFocus
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* National Code & Id Number */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 15 }}>
          <TextField
            style={{ marginTop: 25 }}
            label="National Code"
            fullWidth
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Id Number"
            fullWidth
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 0.2, background: "gray", marginTop: 20 }} />

        {/* Courses section */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ fontSize: 18, fontWeight: "bold" }}>Courses</p>
        </div>

        {/* Course Name & Grade inputs */}
        {[1,2,3,4,5].map((i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 15 }}>
            <TextField
              style={{ marginTop: 25 }}
              label="Course Name"
              fullWidth
              value={eval(`courseName${i}`)}
              onChange={(e) => eval(`setCourseName${i}`)(e.target.value)}
            />
            <TextField
              style={{ marginTop: 25 }}
              label="Course Grade"
              fullWidth
              value={eval(`courseGrade${i}`)}
              onChange={(e) => eval(`setCourseGrade${i}`)(e.target.value)}
            />
          </div>
        ))}

      </DialogContent>

      {/* Dialog actions: Cancel & Submit */}
      <DialogActions style={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* Cancel button */}
        <Button
          style={{ paddingInline: 20, color: "red", minWidth: 150 }}
          onClick={() => { // Reset all fields
            handleClose();
            setFirstName(""); setLastName(""); setNationalCode(""); setIdNumber("");
            setCourseName1(""); setCourseGrade1(""); setCourseName2(""); setCourseGrade2("");
            setCourseName3(""); setCourseGrade3(""); setCourseName4(""); setCourseGrade4("");
            setCourseName5(""); setCourseGrade5("");
          }}
        >
          Cancel
        </Button>

        {/* Submit button */}
        <Button
          style={{ paddingInline: 20, color: "green", minWidth: 150 }}
          sx={{
            "&:hover": { color: "green" },
            "&:disabled": { color: "#ddd !important" },
          }}
          // Disable submit unless all fields are filled
          disabled={!(firstName && lastName && nationalCode && idNumber &&
                      courseName1 && courseGrade1 && courseName2 && courseGrade2 &&
                      courseName3 && courseGrade3 && courseName4 && courseGrade4 &&
                      courseName5 && courseGrade5)}
          onClick={() => {
            // Prepare student object to submit
            handleSubmit({
              first_name: firstName,
              last_name: lastName,
              national_code: nationalCode,
              id_number: idNumber,
              courses: [
                { course_name: courseName1, course_grade: courseGrade1 },
                { course_name: courseName2, course_grade: courseGrade2 },
                { course_name: courseName3, course_grade: courseGrade3 },
                { course_name: courseName4, course_grade: courseGrade4 },
                { course_name: courseName5, course_grade: courseGrade5 },
              ],
            });

            // Show success popup
            Swal.fire({
              title: "success",
              text: "Student Added Successfully",
              icon: "success",
            });

            // Reset all input fields
            setFirstName(""); setLastName(""); setNationalCode(""); setIdNumber("");
            setCourseName1(""); setCourseGrade1(""); setCourseName2(""); setCourseGrade2("");
            setCourseName3(""); setCourseGrade3(""); setCourseName4(""); setCourseGrade4("");
            setCourseName5(""); setCourseGrade5("");
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Export component for use in other files
export default TeenagerModal;
