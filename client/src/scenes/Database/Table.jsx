import React, { useState, useEffect } from "react";
import ChildProfile from "../Child_Profile/index";
import lengthForAgeStatus from "./Calculations/lengthForAgeStatus";
import weightForAgeStatus from "./Calculations/weightForAgeStatus";
import weightForLengthStatus from "./Calculations/weightForLengthStatus";
import { calculateAgeInMonths } from "./Calculations/calculateAgeInMonths";
import { getCellClassNameWFA } from "./StatusReference/StatusCellColors/getCellClassNameWFA.js";
import { getCellClassNameLFA } from "./StatusReference/StatusCellColors/getCellClassNameLFA.js";
import { getCellClassNameWFL } from "./StatusReference/StatusCellColors/getCellClassNameWFL.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { Box, Typography, useTheme, Button, Dialog, DialogContent, Select, MenuItem, Tab, Tabs } from "@mui/material";
import { DownloadOutlined as DownloadOutlinedIcon, Search, SearchOffOutlined,
} from "@mui/icons-material";
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
  const [selectedChild, setselectedChild] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  // Define a function to handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDeleteRow = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (!confirmed) {
      return;
    }
    fetch(`http://127.0.0.1:8000/primarychild/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          setGridData((prevData) => prevData.filter((row) => row.id !== id));
        } else {
          console.error("Error deleting the record");
        }
      })
      .catch((error) => {
        console.error("Error deleting the record:", error);
      });
  };
  const fetchData = async () => {
    try {
      const primaryChildResponse = await fetch(
        "http://127.0.0.1:8000/primarychild/"
      );
      if (!primaryChildResponse.ok) {
        console.error(
          "Error fetching primarychild data:",
          primaryChildResponse.statusText
        );
        return;
      }
      const primaryChildData = await primaryChildResponse.json();

      // Fetch data from the childhealthinfo endpoint
      const childHealthInfoResponse = await fetch(
        "http://127.0.0.1:8000/childhealthinfo/"
      );
      if (!childHealthInfoResponse.ok) {
        console.error(
          "Error fetching childhealthinfo data:",
          childHealthInfoResponse.statusText
        );
        return;
      }
      const childHealthInfoData = await childHealthInfoResponse.json();
      const mergedData = mergeData(primaryChildData, childHealthInfoData);
      setGridData(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const mergeData = (primaryChildData, childHealthInfoData) => {
    return primaryChildData.map((primaryChild) => {
      const matchingChildHealthInfo = childHealthInfoData.find(
        (childHealthInfo) => childHealthInfo.child === primaryChild.id
      );

      return {
        id: primaryChild.id,
        fullName: primaryChild.fullName,
        birthdate: primaryChild.birthdate,
        address: primaryChild.address,
        pt: primaryChild.pt,
        gender: primaryChild.gender,
        aim: primaryChild.aim,
        parentName: primaryChild.parentName,
        occupation: primaryChild.occupation,
        relationship: primaryChild.relationship,
        ethnicity: primaryChild.ethnicity,
        barangay: primaryChild.barangay,
        dow: matchingChildHealthInfo ? matchingChildHealthInfo.dow : "N/A",
        weight: matchingChildHealthInfo ? matchingChildHealthInfo.weight : 0,
        height: matchingChildHealthInfo ? matchingChildHealthInfo.height : 0,
        muac: matchingChildHealthInfo ? matchingChildHealthInfo.muac : 0,
        purga: matchingChildHealthInfo ? matchingChildHealthInfo.purga : "N/A",
        vac: matchingChildHealthInfo ? matchingChildHealthInfo.vac : "N/A",
        bpe: matchingChildHealthInfo ? matchingChildHealthInfo.bpe : "N/A",
        disability: matchingChildHealthInfo
          ? matchingChildHealthInfo.disability
          : "N/A",
        childHealthInfo: matchingChildHealthInfo,
      };
    });
  };

  const handleRowClick = (params, event) => {
    const isButtonClick = event.target.tagName === "BUTTON";

    if (isButtonClick) {
      setselectedChild(params.row);
      setIsProfileOpen(true);
    }
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const updateChildData = (updatedChild) => {
    setGridData((prevData) =>
      prevData.map((row) => (row.id === updatedChild.id ? updatedChild : row))
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
  const handleProfileButtonClick = (child) => {
    setselectedChild(child);
    setIsProfileOpen(true);
  };

  // Table columns on Master table or Tab 1
  const columnsTab1 = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 2,
      cellClassName: "fname-column--cell",
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
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  // Table columns on EOPT table or Tab 2
  const columnsTab2 = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 2,
      cellClassName: "fname-column--cell",
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
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // Conditionally select the columns based on the current tab index
  const currentColumns = currentTab === 0 ? columnsTab1 : columnsTab2;

const tabs = [
  {
    label: "Master List",
    content: (
      <div>
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
            marginRight: "10px",
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
            marginRight: "10px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Export Data
        </Button>
      </Box>
        <DataGrid
          rows={gridData}
          columns={columnsTab1}
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
      </div>
    ),
  },
  {
    label: "EOPT",
    content: (
      <div>
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
            marginRight: "10px",
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
            marginRight: "10px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Export Data
        </Button>
      </Box>
        <DataGrid
          rows={gridData}
          columns={columnsTab2}
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
      </div>
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
      

      {/* Data Grid */}
      {/* <Box m="10px 0 0 0" height="75vh" minHeight="50vh" sx={{}}>
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
      </Box> */}

      {/* Tabs for Tables */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange} // Add the handleTabChange function
        >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} 
          sx={{
            backgroundColor: currentTab === index ? colors.blueAccent[700] : "initial",
            color: currentTab === index ? colors.grey[100] : colors.grey[100],
            borderRadius: "20px 20px 0 0",
          }}/>
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <div key={index} hidden={currentTab !== index}>
          {tab.content}
        </div>
      ))}

      {/* Profile Dialog */}
      <Dialog
        open={isProfileOpen}
        onClose={handleCloseProfile}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {selectedChild && (
            <ChildProfile
              child={{
                ...selectedChild,
                aim: calculateAgeInMonths(selectedChild.birthdate),
              }}
              updateChildData={updateChildData}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Table;
