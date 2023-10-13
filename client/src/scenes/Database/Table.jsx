import React, { useState, useEffect } from "react";
import PatientProfile from "./../patient_page/index";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";

import {
  DownloadOutlined as DownloadOutlinedIcon,
  Search,
  SearchOffOutlined,
} from "@mui/icons-material"; // Import DownloadOutlinedIcon from @mui/icons-material
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [gridData, setGridData] = useState([]); // Corrected definition here
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for the dialog

  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch("http://127.0.0.1:8000/forms/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setGridData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRowClick = (params) => {
    // params.row contains the data of the clicked row
    setSelectedPatient(params.row);
    setIsProfileOpen(true); // Open the profile dialog
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false); // Close the profile dialog
  };

  const updatePatientData = (updatedPatient) => {
    setGridData((prevData) =>
      prevData.map((row) =>
        row.id === updatedPatient.id ? updatedPatient : row
      )
    );
  };

  const calculateAgeInMonths = (birthdate) => {
    if (!birthdate) {
      return ""; // Handle the case where birthdate is not available
    }

    const today = new Date();
    const birthDate = new Date(birthdate);
    const ageInMonths =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      today.getMonth() -
      birthDate.getMonth();

    return ageInMonths;
  };

  const renderWrappedCell = (params) => (
    <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
      {params.colDef?.field === "aim"
        ? calculateAgeInMonths(params.row.birthdate)
        : params.colDef?.field === "sWeight"
        ? calculateWeightStatus(params.row)
        : params.colDef?.field === "sHeight"
        ? params.value // Assuming sHeight is already a status
        : params.value}
    </Typography>
  );

  const calculateWeightStatus = (patient) => {
    const { weight, height } = patient;
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmi = (1.3 * weight) / Math.pow(heightInMeters, 2.5);

      // Determine the weight status based on the new BMI formula
      if (bmi <= 18.49) {
        return `Underweight / BMI: ${bmi.toFixed(2)}`;
      } else if (bmi <= 24.99) {
        return `Normal weight / BMI: ${bmi.toFixed(2)}`;
      } else if (bmi <= 29.99) {
        return `Overweight / BMI: ${bmi.toFixed(2)}`;
      } else if (bmi <= 39.99) {
        return `Obese / BMI: ${bmi.toFixed(2)}`;
      } else {
        return `Morbidly obese / BMI: ${bmi.toFixed(2)}`;
      }
    }
    return "";
  };

  // const handleDelete = (id) => {
  //   fetch(`http://127.0.0.1:8000/forms/${id}/`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         setGridData((prevData) => prevData.filter((row) => row.id !== id));
  //         if (selectedPatient && selectedPatient.id === id) {
  //           setIsProfileOpen(false);
  //         }
  //       } else {
  //         console.error("Error deleting data:", response.statusText);
  //       }
  //     })
  //     .catch((error) => console.error("Error deleting data:", error));
  // };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 2,
      cellClassName: "fname-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      flex: 1,
      cellClassName: "mname-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 2,
      cellClassName: "lname-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "dow",
      headerName: "DOW",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "aim",
      headerName: "AIM",
      type: "number",
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
    },
    {
      field: "height",
      headerName: "Height",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
    },
    {
      field: "midUpperArmCircumference",
      headerName: "MUAC",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "vac",
      headerName: "VAC",
      type: "number", //need to identify if value is text/number
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "purga",
      headerName: "Purga",
      type: "number", //need to identify if value is text/number
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "sWeight",
      headerName: "Status (Weight)",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "sHeight",
      headerName: "Status (Height)",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       color="error"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         handleDelete(params.row.id);
    //       }}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
  ];
  return (
    <Box
      m="0px 10px"
      sx={{
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
      }}
    >
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
          }}
        >
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
        sx={
          {
            // Styles for the data grid
          }
        }
      >
        <Box height="100%" overflow="auto">
          <DataGrid
            rows={gridData}
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
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {/* Display the patient profile */}
          {selectedPatient && (
            <PatientProfile
              patient={{
                ...selectedPatient,
                aim: calculateAgeInMonths(selectedPatient.birthdate),
              }}
              updatePatientData={updatePatientData}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Table;
