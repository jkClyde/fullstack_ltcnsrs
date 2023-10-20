import React, { useState, useEffect } from "react";
import PatientProfile from "./../patient_page/index";
import lengthForAgeStatus from "./Calculations/lengthForAgeStatus";
import weightForAgeStatus from "./Calculations/weightForAgeStatus";
import weightForLengthStatus from "./Calculations/weightForLengthStatus";
import { calculateAgeInMonths } from "./Calculations/calculateAgeInMonths";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogContent,
  Select, // Add this import statement
  MenuItem, // Add this import statement
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
  const [gridData, setGridData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState("All Quarter");

  const getQuarterOptions = () => {
    // Add an "ALL QUARTER" option to the list of quarters
    return [
      "All Quarter",
      "1st Quarter",
      "2nd Quarter",
      "3rd Quarter",
      "4th Quarter",
    ];
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Add logic to handle the change, if needed
  };
  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
  };
  useEffect(() => {
    // Fetch data from Django API endpoint based on selected year and quarter
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/forms/?year=${selectedYear}&quarter=${selectedQuarter}`
        );
        const data = await response.json();
        const filteredData = filterDataByQuarter(data);
        console.log("Fetched data:", filteredData);
        setGridData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedQuarter]);

  const filterDataByQuarter = (data) => {
    return data.filter((item) => {
      const itemMonth = new Date(item.dow).getMonth() + 1; // January is 0
      const itemYear = new Date(item.dow).getFullYear();

      if (selectedQuarter === "All Quarter") {
        // If "ALL QUARTER" is selected, only filter by year
        return itemYear.toString() === selectedYear.toString();
      } else {
        // If a specific quarter is selected, filter by both year and quarter
        const selectedPhase = selectedQuarter;
        return (
          itemYear.toString() === selectedYear.toString() &&
          getQuarter(itemMonth) === selectedPhase
        );
      }
    });
  };
  const getQuarter = (month) => {
    if (month >= 1 && month <= 3) {
      return "1st Quarter";
    } else if (month >= 4 && month <= 6) {
      return "2nd Quarter";
    } else if (month >= 7 && month <= 9) {
      return "3rd Quarter";
    } else {
      return "4th Quarter";
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/forms/?year=${selectedYear}&quarter=${selectedQuarter}`
      );
      const data = await response.json();
      const filteredData = filterDataByQuarter(data, selectedQuarter);
      console.log("Fetched data:", filteredData);
      setGridData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowClick = (params, event) => {
    // Check if the click occurred on the profile button
    const isButtonClick = event.target.tagName === "BUTTON";

    if (isButtonClick) {
      // Click occurred on the button, show the profile
      setSelectedPatient(params.row);
      setIsProfileOpen(true);
    }
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

  const renderWrappedCell = (params) => (
    <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
      {params.colDef?.field === "aim"
        ? `${calculateAgeInMonths(params.row.birthdate)} ${
            calculateAgeInMonths(params.row.birthdate) === 1
              ? "month"
              : "months"
          } old`
        : params.colDef?.field === "weightForAge"
        ? `${weightForAgeStatus(
            params.row.birthdate,
            params.row.weight,
            params.row.gender
          )}`
        : params.colDef?.field === "lengthForAge"
        ? `${lengthForAgeStatus(
            params.row.birthdate,
            params.row.height,
            params.row.gender
          )}`
        : params.colDef?.field === "weightForLength"
        ? `${weightForLengthStatus(
            params.row.birthdate,
            params.row.height,
            params.row.weight,
            params.row.gender
          )}`
        : params.value}
    </Typography>
  );
  const handleProfileButtonClick = (patient) => {
    setSelectedPatient(patient);
    setIsProfileOpen(true);
  };

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
            weightForAge: selectedPatient.weightForAge,
            lengthForAge: selectedPatient.lengthForAge,
            weightForLength: selectedPatient.weightForLength,
          }}
          updatePatientData={updatePatientData}
        />
      )}
    </DialogContent>
  </Dialog>;

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
      headerName: "MI",
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
      flex: 2,
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
      field: "muac",
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
      field: "weightForAge",
      headerName: "Weight For Age",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "lengthForAge",
      headerName: "Length For Age",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "weightForLength",
      headerName: "Weight For Length",
      flex: 2,
      renderCell: renderWrappedCell,
    },
    {
      field: "profile",
      headerName: "Child Profile",
      flex: 2,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary" // Set the color of the button (you can use any valid color)
          sx={
            {
              // Add additional styling here if needed
            }
          }
          onClick={(e) => {
            e.stopPropagation(); // Stop the event from propagating to the row
            handleProfileButtonClick(params.row);
          }}
        >
          View
        </Button>
      ),
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
        {/* Year and Quarter Selects */}
        <Box display="flex" alignItems="center">
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            sx={{ marginRight: "10px" }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </MenuItem>
            ))}
          </Select>

          <Select
            labelId="quarter-select-label"
            id="quarter-select"
            value={selectedQuarter}
            onChange={handleQuarterChange}
            sx={{ marginRight: "10px" }}
          >
            {getQuarterOptions().map((quarter) => (
              <MenuItem key={quarter} value={quarter}>
                {quarter}
              </MenuItem>
            ))}
          </Select>
        </Box>

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
            onRowClick={(params, event) => handleRowClick(params, event)}
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
