// Import the core React library for building components
import React from "react";

// Import styled function from Material UI for customizing components with styles
import { styled } from "@mui/material/styles";

// Import Material UI Table components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";  // Paper provides a background container

// Create a styled version of the TableCell component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Styles for table header cells
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black, // Black background
      color: theme.palette.common.white, // White text
    },
    // Styles for table body cells
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14, // Set font size to 14px
    },
}));

// Create a styled version of the TableRow component
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Apply background color to every odd row for striped effect
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover, // Hover-like light gray color
    },
    // Hide the border for the last row
    "&:last-child td, &:last-child th": {
      border: 0,
    },
}));

// Define a functional component called Average that receives "students" as props
const Average = ({students}) => {
  return (
    // TableContainer gives the table a Paper (card-like) background
    <TableContainer component={Paper}>
      {/* The main table with minimum width of 600px */}
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        
        {/* Table Header section */}
        <TableHead>
          <TableRow>
            {/* Column header for National Code */}
            <StyledTableCell align="center">National Code</StyledTableCell>
            {/* Column header for Average Degree */}
            <StyledTableCell align="center">Average Degree</StyledTableCell>
          </TableRow>
        </TableHead>

        {/* Table Body section */}
        <TableBody>
          {/* Map through the students array and create rows */}
          {students?.map((row) => (
            // Each row must have a unique key (Math.random used here, but not best practice)
            <StyledTableRow key={Math.random()}>
              {/* Display student's national code in a centered cell */}
              <StyledTableCell align="center">{row.national_code}</StyledTableCell>
              {/* Display student's grade average in a centered cell */}
              <StyledTableCell align="center">{row.grade_avg}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Export the Average component so it can be imported in other files
export default Average;
