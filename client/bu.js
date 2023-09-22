import React, { useState } from "react";

import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";

import { DownloadOutlined as DownloadOutlinedIcon, Search, SearchOffOutlined } from "@mui/icons-material"; // Import DownloadOutlinedIcon from @mui/icons-material
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { number } from "yup";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import PatientPage from "../patient_page";


const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for the dialog


  const handleRowClick = (params) => {
    // params.row contains the data of the clicked row
    setSelectedPatient(params.row);
    setIsProfileOpen(true); // Open the profile dialog

  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false); // Close the profile dialog
  };

  // This wraps the texts on each column
  const renderWrappedCell = (params) => (
    <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
      {params.value}
    </Typography>
  );

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      cellClassName: "name-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "dateOfWeighing",
      headerName: "DOW",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "ageInMonths",
      headerName: "AIM",
      type: "number",
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
      renderCell: renderWrappedCell,
    },
    {
      field: "height",
      headerName: "Height",
      type: "number",
      renderCell: renderWrappedCell,
    },
    {
      field: "address",
      flex: 2,
      headerName: "Address",
      renderCell: renderWrappedCell,
    },
    {
      field: "permanentOrTransient",
      flex: 1,
      headerName: "P/T",
      renderCell: renderWrappedCell,
    },
    {
      field: "sex",
      headerName: "Sex",
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "mothersName",
      headerName: "Mother",
      flex: 3,
      cellClassName: "name-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "fathersName",
      headerName: "Father",
      flex: 3,
      cellClassName: "name-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "parentsOccupation",
      headerName: "P. Occupation",
      flex: 3,
      renderCell: (params) => (
        <div>
          {/* Mother Occupation */}
          {renderWrappedCell({ value: `${params.row.mothersOccupation}` })}

          {/* Father Occupation */}
          {renderWrappedCell({ value: `${params.row.fathersOccupation}` })}
        </div>
      ),
    },
    {
      field: "parentsEthnicity",
      headerName: "P. Ethnicity",
      flex: 3,
      renderCell: (params) => (
        <div>
          {renderWrappedCell({ value: `${params.row.mothersEthnicity}` })}
          {renderWrappedCell({ value: `${params.row.fathersEthnicity}` })}
        </div>
      ),
    },
    {
      field: "givenVAC",
      headerName: "VAC",
      type: "number", //need to identify if value is text/number
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "givenPurga",
      headerName: "Purga",
      type: "number", //need to identify if value is text/number
      flex: 1,
      renderCell: renderWrappedCell,
    },
  ];

  return (
    <Box m="0px 10px" sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.blueAccent[700],
      },
      "& .MuiCheckbox-root": {
        color: `${colors.greenAccent[200]} !important`,
      },
    }}>
      {/* Button Export Data */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p="10px"

        
      >
          <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginRight: "10px", // Add margin to create space
          }}>
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Import Data
        </Button>

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginRight: "10px", // Add margin to create space
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Export Data
        </Button>
          
      </Box>

      {/* Data Grid */}
      <Box
        m="10px 0 0 0"
        height="75vh"
        minHeight="50vh"
        sx={{
          // Styles for the data grid
        }}
      >
        <Box height="100%" overflow="auto">
          <DataGrid
            rows={mockDataTeam}
            columns={columns}
            onRowClick={handleRowClick}
            components={{
              Toolbar: () => (
                <div>
                  <GridToolbarColumnsButton />
                  <GridToolbarFilterButton />
                </div>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Profile Dialog */}
    <Dialog
      open={isProfileOpen}
      onClose={handleCloseProfile}
      maxWidth="md" // Adjust the size as needed
      fullWidth
    >
      <DialogContent>
        {/* Display the patient profile */}
        {selectedPatient && <PatientPage patient={selectedPatient} />}
      </DialogContent>
    </Dialog>

    </Box>
  );
};

export default Table;