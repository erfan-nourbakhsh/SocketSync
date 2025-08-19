// Import the core React library for building UI components
import React from "react";

// Import styled utility from Material UI for creating custom-styled components
import { styled } from "@mui/material/styles";

// Import necessary Material UI table components
import Table from "@mui/material/Table"; // The main table element
import TableBody from "@mui/material/TableBody"; // Table body (rows with data)
import TableCell, { tableCellClasses } from "@mui/material/TableCell"; // Table cell and class references
import TableContainer from "@mui/material/TableContainer"; // Container wrapper for table
import TableHead from "@mui/material/TableHead"; // Table header section
import TableRow from "@mui/material/TableRow"; // Row component
import Paper from "@mui/material/Paper"; // Paper provides a background "card" style

// Create a styled version of the TableCell component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Styles for table header cells
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black, // Black background color
      color: theme.palette.common.white, // White text color
    },
    // Styles for table body cells
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14, // Set font size for table body cells
    },
}));

// Create a styled version of the TableRow component
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Alternate background color for odd rows (striped table effect)
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // Remove the bottom border from the last row
    "&:last-child td, &:last-child th": {
      border: 0,
    },
}));

// Define functional component "Min" that receives "students" as a prop
const Min = ({students}) => {
  return (
    // TableContainer provides scroll and Paper background
    <TableContainer component={Paper}>
      {/* Main Table with minimum width 600px */}
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        
        {/* Table Header Section */}
        <TableHead>
          <TableRow>
            {/* Column header for First Name */}
            <StyledTableCell align="center">First name</StyledTableCell>
            {/* Column header for Last Name */}
            <StyledTableCell align="center">Last Name</StyledTableCell>
            {/* Column header for Minimum Average Degree */}
            <StyledTableCell align="center">Minimum Average Degree</StyledTableCell>
          </TableRow>
        </TableHead>

        {/* Table Body Section */}
        <TableBody>
          {/* Iterate through students array and create table rows */}
          {students?.map((row) => (
            // Each row should have a unique key (Math.random used here, but not recommended)
            <StyledTableRow key={Math.random()}>
              {/* Cell showing student's first name */}
              <StyledTableCell align="center">{row.first_name}</StyledTableCell>
              {/* Cell showing student's last name */}
              <StyledTableCell align="center">{row.last_name}</StyledTableCell>
              {/* Cell showing student's minimum average degree */}
              <StyledTableCell align="center">
                {row.avg_deg}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Export the Min component so it can be used elsewhere
export default Min;
