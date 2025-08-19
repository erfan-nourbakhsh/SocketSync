// Import the entire React library (needed for hooks like useState, useEffect)
import * as React from "react";

// Import Material-UI styled utility for custom styling components
import { styled } from "@mui/material/styles";

// Import Material-UI table components
import Table from "@mui/material/Table"; // Main table wrapper
import TableBody from "@mui/material/TableBody"; // Table body section
import TableCell, { tableCellClasses } from "@mui/material/TableCell"; // Table cell component and classes
import TableContainer from "@mui/material/TableContainer"; // Container for table with scroll and Paper background
import TableHead from "@mui/material/TableHead"; // Table header section
import TableRow from "@mui/material/TableRow"; // Table row component
import Paper from "@mui/material/Paper"; // Paper provides card-like background for table

// Create a styled version of TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Styles for table header cells
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black, // Black background for header
    color: theme.palette.common.white,           // White text for header
  },
  // Styles for table body cells
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, // Set font size for table body
  },
}));

// Create a styled version of TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover, // Alternate row color for odd rows
  },
  // Remove bottom border for the last row
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Define the CustomizedTables functional component
// Accepts a 'socket' prop for real-time data updates
export default function CustomizedTables({ socket }) {
  
  // State to store the list of students
  const [students, setStudents] = React.useState([]);

  // useEffect hook to handle socket events
  React.useEffect(() => {
    // Define a listener function for 'students' messages from the server
    const messageListener = (deliveredStudents) => {
      setStudents(deliveredStudents); // Update the students state
      console.log(deliveredStudents);  // Log the students to console
    };

    // Register the listener if socket exists
    socket && socket.on("students", messageListener);

    // Emit request to get students from server
    socket && socket.emit("getStudents");

    // Cleanup function: remove listener when component unmounts or socket changes
    return () => {
      socket && socket.off("students", messageListener);
    };
  }, [socket]); // Re-run effect whenever socket changes

  // Render the table UI
  return (
    <>
      {
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, zIndex: 999999999, background: "red" }} // Set min width, zIndex, and background color
            aria-label="customized table" // Accessibility label
          >
            {/* Table header */}
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">First name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">National Code</StyledTableCell>
                <StyledTableCell align="center">Id Number</StyledTableCell>
              </TableRow>
            </TableHead>

            {/* Table body */}
            <TableBody>
              {/* Map through students array and render a row for each student */}
              {students?.map((row) => (
                // Each row should have a unique key (Math.random used here, but not recommended)
                <StyledTableRow key={Math.random()}>
                  <StyledTableCell align="center">
                    {row.first_name} {/* Display first name */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.last_name} {/* Display last name */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.national_code} {/* Display national code */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.id_number} {/* Display ID number */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}
