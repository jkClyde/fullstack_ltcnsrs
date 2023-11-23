import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

const DuplicateTable = () => {
  const [duplicates, setDuplicates] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/duplicateChild/")
      .then((response) => response.json())
      .then((data) => setDuplicates(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleRemove = (id) => {
    //no backend delete
    const updatedDuplicates = duplicates.filter(
      (duplicate) => duplicate.id !== id
    );
    setDuplicates(updatedDuplicates);
    showSnackbar("Child deleted successfully", "success");
  };

  const columns = [
    { field: "full_name", headerName: "Name", flex: 1 },
    { field: "second_barangay", headerName: "Barangay", flex: 1 },
    {
      field: "remove",
      headerName: "Remove",
      flex: 1,
      renderCell: (params) => (
        <Box
          className="centered-cell"
          style={{ cursor: "pointer" }}
          onClick={() => handleRemove(params.row.id)}
        >
          <DeleteIcon color="error" />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        m="5vh 10vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography textAlign="center" variant="body2">
          This is the reference table where the duplicated records are detected
          from the imported excel files. These duplicated records are not saved
          in the database as the system does not accept duplicates. It only
          follows the first recorded child. If the child matched the Name and
          Date of Birth of the record already saved in the database, then the
          system will skip it, and send here in this table, the name and the
          barangay where the duplicated record is located. If you wish to update
          the child's record, go to the <StorageOutlinedIcon />{" "}
          <strong>Children Table</strong> and search for the name listed here.
          If you are done so, or you desire on keeping the current record saved
          on the Children Table, you can remove the listed reference child below
          using the <DeleteIcon color="error"></DeleteIcon>{" "}
          <strong>Remove</strong> button
          <br />
          <Typography textAlign="center" variant="body3">
            Note: By removing the child listed here does not remove the child's
            record on the Children Table
          </Typography>
        </Typography>
      </Box>
      <DataGrid
        rows={duplicates}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        autoHeight
      />
    </Box>
  );
};

export default DuplicateTable;
