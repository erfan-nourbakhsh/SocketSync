// Import the React library to define and use components
import React from "react";

// Import styled utility from Material UI for custom-styled components
import { styled } from "@mui/material/styles";

// Import necessary Material UI table components
import Table from "@mui/material/Table";              // The main table wrapper
import TableBody from "@mui/material/TableBody";      // Table body section
import TableCell, { tableCellClasses } from "@mui/material/TableCell"; // Table cell component
import TableContainer from "@mui/material/TableContainer"; // Container for table with scroll support
import TableHead from "@mui/material/TableHead";      // Table header section
import TableRow from "@mui/material/TableRow";        // Table row component
import Paper from "@mui/material/Paper";              // Paper provides background/card styling

// Define a styled version of TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Apply styles for header cells
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black, // Black background
      color: theme.palette.common.white,           // White text
    },
    // Apply styles for body cells
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,                                // Set body cell text size
    },
}));

// Define a styled version of TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Alternate row coloring (striped table)
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // Remove bottom border for the last row
    "&:last-child td, &:last-child th": {
      border: 0,
    },
}));

// Define functional component "Sort", which accepts "students" as a prop
const Sort = ({students}) => {
  return (
    // TableContainer wraps the table with Paper (gives a background)
    <TableContainer component={Paper}>
      {/* Main Table with minimum width of 600px */}
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        
        {/* Table Header Section */}
        <TableHead>
          <TableRow>
            {/* Column header for student ID Number */}
            <StyledTableCell align="center">Id Number</StyledTableCell>
            {/* Column header for Average Degree */}
            <StyledTableCell align="center">Average Degree</StyledTableCell>
          </TableRow>
        </TableHead>

        {/* Table Body Section */}
        <TableBody>
          {/* Iterate over students array and generate a row for each */}
          {students?.map((row) => (
            // Each row should have a unique key (Math.random used here, but not recommended)
            <StyledTableRow key={Math.random()}>
              {/* Display student's ID Number */}
              <StyledTableCell align="center">{row.id_number}</StyledTableCell>
              {/* Display student's Average Degree */}
              <StyledTableCell align="center">{row.avg_deg}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Export the Sort component for use in other parts of the app
export default Sort;
