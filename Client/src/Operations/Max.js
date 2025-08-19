// Import the core React library for building UI components
import React from "react";

// Import styled utility from Material UI for creating custom-styled components
import { styled } from "@mui/material/styles";

// Import necessary Material UI table components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper"; // Paper gives the table a card-like background

// Create a styled version of the TableCell component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Style for header cells (table head)
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black, // Black background
      color: theme.palette.common.white, // White text
    },
    // Style for body cells (table rows)
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14, // Font size set to 14px
    },
}));

// Create a styled version of the TableRow component
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Apply alternate background color on odd rows (striped effect)
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // Remove border from the last row for cleaner look
    "&:last-child td, &:last-child th": {
      border: 0,
    },
}));

// Define functional component "Max" which receives a list of students as props
const Max = ({students}) => {
  return (
    // TableContainer wraps the table inside a Paper component (card background)
    <TableContainer component={Paper}>
      {/* The main table element, with minimum width set */}
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        
        {/* Table Header Section */}
        <TableHead>
          <TableRow>
            {/* Column header for First Name */}
            <StyledTableCell align="center">First name</StyledTableCell>
            {/* Column header for Last Name */}
            <StyledTableCell align="center">Last Name</StyledTableCell>
            {/* Column header for Maximum Average Degree */}
            <StyledTableCell align="center">Maximum Average Degree</StyledTableCell>
          </TableRow>
        </TableHead>

        {/* Table Body Section */}
        <TableBody>
          {/* Iterate over students array and generate table rows */}
          {students?.map((row) => (
            // Each row should have a unique key (Math.random used here, but not ideal)
            <StyledTableRow key={Math.random()}>
              {/* Cell displaying student's first name */}
              <StyledTableCell align="center">{row.first_name}</StyledTableCell>
              {/* Cell displaying student's last name */}
              <StyledTableCell align="center">{row.last_name}</StyledTableCell>
              {/* Cell displaying student's maximum average degree */}
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

// Export the Max component so it can be imported and used in other files
export default Max;
