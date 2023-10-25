import React, { useState, useEffect } from "react";
import PatientProfile from "./../patient_page/index";
import lengthForAgeStatus from "./Calculations/lengthForAgeStatus";
import weightForAgeStatus from "./Calculations/weightForAgeStatus";
import weightForLengthStatus from "./Calculations/weightForLengthStatus";
import { calculateAgeInMonths } from "./Calculations/calculateAgeInMonths";
import { getCellClassNameWFA } from "./StatusReference/StatusCellColors/getCellClassNameWFA.js";
import { getCellClassNameLFA } from "./StatusReference/StatusCellColors/getCellClassNameLFA.js";
import { getCellClassNameWFL } from "./StatusReference/StatusCellColors/getCellClassNameWFL.js";
import VisibilityIcon from "@mui/icons-material/Visibility"; // install this if needed
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

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
  const handleDeleteRow = (id) => {
    // Ask the user for confirmation before deleting
    const confirmed = window.confirm("Are you sure you want to delete this row?");
    
    if (!confirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
    // Make an API request to delete the record
    fetch(`http://127.0.0.1:8000/fourthquarter/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          // Deletion in the database was successful, now update the frontend state
          setGridData((prevData) => prevData.filter((row) => row.id !== id));
        } else {
          // Handle errors here
          console.error("Error deleting the record");
        }
      })
      .catch((error) => {
        console.error("Error deleting the record:", error);
      });
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
        const selectedQuarters =
          selectedQuarter === "All Quarter"
            ? ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
            : [selectedQuarter];
        const allQuarterData = [];

        // Fetch data for each selected quarter
        for (const quarter of selectedQuarters) {
          let endpoint;

          // Determine the API endpoint based on the selected quarter
          switch (quarter) {
            case "1st Quarter":
              endpoint = "firstquarter";
              break;
            case "2nd Quarter":
              endpoint = "secondquarter";
              break;
            case "3rd Quarter":
              endpoint = "thirdquarter";
              break;
            case "4th Quarter":
              endpoint = "fourthquarter";
              break;
            default:
              console.error("Invalid quarter:", quarter);
              continue;
          }

          const response = await fetch(
            `http://127.0.0.1:8000/${endpoint}/?year=${selectedYear}`
          );
          const data = await response.json();
          allQuarterData.push(...data);
        }

        const filteredData = filterDataByQuarter(allQuarterData);
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
        ? `${calculateAgeInMonths(params.row.birthdate)}`
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

  const columns = [
    {
      field: "firstName",
      headerName: "F. Name",
      flex: 2,
      cellClassName: "fname-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "middleName",
      headerName: "M.I.",
      flex: 1,
      cellClassName: "mname-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "lastName",
      headerName: "L. Name",
      flex: 2,
      cellClassName: "lname-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "dow",
      headerName: "DOW",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "aim",
      headerName: "AIM",
      type: "number",
      flex: 1,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "weight",
      headerName: "Wt.",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "height",
      headerName: "Ht.",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "muac",
      headerName: "MUAC",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "vac",
      headerName: "VAC",
      type: "number", //need to identify if value is text/number
      flex: 3,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "purga",
      headerName: "Purga",
      type: "number", //need to identify if value is text/number
      flex: 3,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "weightForAge",
      headerName: "WFA",
      flex: 3,
      cellClassName: getCellClassNameWFA,
      renderCell: renderWrappedCell,
      headerAlign: "center",
    },
    {
      field: "lengthForAge",
      headerName: "LFA",
      flex: 3,
      cellClassName: getCellClassNameLFA,
      renderCell: renderWrappedCell,
      headerAlign: "center",
    },
    {
      field: "weightForLength",
      headerName: "WFL",
      flex: 3,
      cellClassName: getCellClassNameWFL,
      renderCell: renderWrappedCell,
      headerAlign: "center",
    },
    {
      field: "profile",
      headerName: "View",
      headerAlign: "center",
      flex: 2,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          color={theme.palette.secondary.main} 
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
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      flex: 2,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          color="error"
          onClick={() => handleDeleteRow(params.row.id)}
        >
          <DeleteIcon/>
        </IconButton>
      ),
    },
  ];
  return (
    <Box
      m="0px 10px"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          border: "1px solid",
          borderColor: colors.blueAccent[700],
          justifyContent: "center",
        },
        "& .centered-cell": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
