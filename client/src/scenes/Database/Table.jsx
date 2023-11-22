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
import barangayOptions from "./../form/barangayOptions.js";
import DuplicateTable from "./DuplicatesTable.jsx";
import { connect } from 'react-redux';
import {mapState} from "./../../redux/global_variables";
import {  useSelector  } from 'react-redux';


import ExcelToJSON from "../Import/index.jsx";
import ExportToExcel from "../export/index.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogContent,
  Select,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  DownloadOutlined as DownloadOutlinedIcon,
  Search,
  SearchOffOutlined,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";


const Table = () => {
  const success = useSelector((state) => state.refresher.success); 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [gridData, setGridData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [initialYear, setInitialYear] = useState(null);
  const [selectedChild, setselectedChild] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState("All Quarter"); // Provide an initial value based on your requirements
  const [selectedBarangay, setSelectedBarangay] = useState("All Barangay");
  const [yearInput, setYearInput] = useState("");
  const [isYearInputValid, setIsYearInputValid] = useState(true);

  useEffect(() => {
    console.log("HERE AGAIN", success)
    setIsDialogOpen(closed);
    // console.log("HHHEEEEEEEERE", closeImport)
  }, [closed]);

  const validateYear = (year) => {
    const yearPattern = /^\d{4}$/;
    return yearPattern.test(year);
  };
  const handleYearInputChange = (e) => {
    const year = e.target.value;
    setYearInput(year);
    setIsYearInputValid(validateYear(year));
  };

  const [gridDataTab1, setGridDataTab1] = useState([]);
  const [gridDataTab2, setGridDataTab2] = useState([]);
  const [gridDataTab3, setGridDataTab3] = useState([]);
  const [gridDataTab4, setGridDataTab4] = useState([]);

  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    fetchTab1Data();
    fetchTab2Data();
    fetchTab3Data();
    // fetchTab4Data();
  }, []);



  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };



  // Function to show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    const currentData = activeTab === 0 ? gridData : gridData;
    setGridData(currentData);
  }, [activeTab]);

  const handleBarangayChange = (event) => {
    setSelectedBarangay(event.target.value);
    console.log("Selected Barangay:", event.target.value);
  };
  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
    console.log("Selected Quarter:", event.target.value);
  };

  useEffect(() => {
    console.log(
      "Fetching data for Barangay:",
      selectedBarangay,
      "and Quarter:",
      selectedQuarter
    );
    fetchTab1Data();
    fetchTab2Data();
  }, [selectedBarangay, selectedQuarter, success]);

  const fetchTab1Data = async () => {
    try {
      // Fetch primary child data
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

      // Filter out children with archive set to true
      const filteredPrimaryChildData = primaryChildData.filter(
        (child) => !child.archive
      );

      // Fetch child health info data
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

      // Merge data
      const mergedData = mergeData(
        filteredPrimaryChildData,
        childHealthInfoData
      );

      // Filter data based on selected barangay and entered year
      console.log("Entered Year:", parseInt(yearInput)); // Add this line to log the entered year
      let filteredData = mergedData.filter((child) => {
        const isAllQuartersSelected =
          selectedQuarter === "All Quarter" || selectedQuarter === "";
        const isAllBarangaySelected =
          selectedBarangay === "All Barangay" || selectedBarangay === "";

        return (
          (isAllBarangaySelected || child.barangay === selectedBarangay) &&
          (!yearInput ||
            child.childHealthInfo.getYear === parseInt(yearInput)) &&
          (isAllQuartersSelected ||
            (selectedQuarter !== "All Quarter" &&
              child.childHealthInfo.quarter === selectedQuarter))
        );
      });

      setGridDataTab1(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTab2Data = async () => {
    try {
      // Fetch primary child data
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

      // Merge data
      const mergedData = mergeData(primaryChildData, childHealthInfoData);

      // Filter data based on selected barangay and entered year
      let filteredData = mergedData.filter((child) => {
        const isAllQuartersSelected =
          selectedQuarter === "All Quarter" || selectedQuarter === "";
        const isAllBarangaySelected =
          selectedBarangay === "All Barangay" || selectedBarangay === "";

        return (
          (isAllBarangaySelected || child.barangay === selectedBarangay) &&
          (!yearInput ||
            child.childHealthInfo.getYear === parseInt(yearInput)) &&
          (isAllQuartersSelected ||
            (selectedQuarter !== "All Quarter" &&
              child.childHealthInfo.quarter === selectedQuarter))
        );
      });

      setGridDataTab2(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTab3Data = async () => {
    try {
      // Fetch primary child data
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

      // Filter out children with archive set to false
      const filteredPrimaryChildData = primaryChildData.filter(
        (child) => child.archive !== false
      );

      // Fetch child health info data
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

      // Merge data
      const mergedData = mergeData(
        filteredPrimaryChildData,
        childHealthInfoData
      );

      // Filter data based on selected barangay and entered year
      console.log("Entered Year:", parseInt(yearInput)); // Add this line to log the entered year
      let filteredData = mergedData.filter((child) => {
        const isAllQuartersSelected =
          selectedQuarter === "All Quarter" || selectedQuarter === "";
        const isAllBarangaySelected =
          selectedBarangay === "All Barangay" || selectedBarangay === "";

        return (
          (isAllBarangaySelected || child.barangay === selectedBarangay) &&
          (!yearInput ||
            child.childHealthInfo.getYear === parseInt(yearInput)) &&
          (isAllQuartersSelected ||
            (selectedQuarter !== "All Quarter" &&
              child.childHealthInfo.quarter === selectedQuarter))
        );
      });

      setGridDataTab3(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/primarychild/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 204) {
        // Filter out the deleted row from the state
        setGridDataTab1((prevData) => prevData.filter((row) => row.id !== id));
        setGridDataTab2((prevData) => prevData.filter((row) => row.id !== id));
        setGridDataTab3((prevData) => prevData.filter((row) => row.id !== id));
        showSnackbar("Child deleted successfully", "success");
        setGridDataTab3((prevData) => prevData.filter((row) => row.id !== id));
      } else {
        console.error("Error deleting the record");
        showSnackbar("Failed to delete child", "error");
      }
    } catch (error) {
      console.error("Error deleting the record:", error);
      showSnackbar("Failed to delete child", "error");
    }
  };

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
        // relationship: primaryChild.relationship,
        ethnicity: primaryChild.ethnicity,
        barangay: primaryChild.barangay,
        dow: matchingChildHealthInfo ? matchingChildHealthInfo.dow : "N/A",
        weight: matchingChildHealthInfo ? matchingChildHealthInfo.weight : 0,
        height: matchingChildHealthInfo ? matchingChildHealthInfo.height : 0,
        muac: matchingChildHealthInfo ? matchingChildHealthInfo.muac : 0,
        deworming: matchingChildHealthInfo ? matchingChildHealthInfo.deworming : "N/A",
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const openDialog2 = () => {
    setIsDialogOpen2(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsDialogOpen2(false);
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
      flex: 3,
      cellClassName: "fname-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 3,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
    },
    {
      field: "dow",
      headerName: "DOW",
      flex: 3,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
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
      headerName: "Sex",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "vac",
      headerName: "Vaccination",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "deworming",
      headerName: "Deworming",
      flex: 2,
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
      field: "address",
      headerName: "Address",
      flex: 2,
      cellClassName: "address-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "parentName",
      headerName: "Caregiver",
      flex: 2,
      cellClassName: "parentName-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
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
      field: "ethnicity",
      headerName: "IP",
      flex: 1,
      cellClassName: "ethnicity-column--cell",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.value === "None" || params.value === "N/A") {
          return "No";
        } else {
          return "Yes";
        }
      },
      cellClassName: "centered-cell",
    },
    {
      field: "gender",
      headerName: "Sex",
      flex: 1,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        // only shows the first letter in Uppercase (M or F rather than Male or Female)
        if (params.value) {
          return params.value.charAt(0).toUpperCase(); // Return the first letter in uppercase
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 2,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
    },
    {
      field: "dow",
      headerName: "DOW",
      flex: 2,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
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
      field: "weight",
      headerName: "Wt.",
      type: "number",
      flex: 1.5,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
  ];
  const columnsTab3 = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 3,
      cellClassName: "fname-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 3,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
    },
    {
      field: "dow",
      headerName: "DOW",
      flex: 3,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
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
      headerName: "Sex",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "vac",
      headerName: "Vaccination",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "deworming",
      headerName: "Deworming",
      flex: 2,
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
  const columnsTab4 = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 3,
      cellClassName: "fname-column--cell",
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell", 
    },
    {
      field: "birthdate",
      headerName: "DOB",
      flex: 3,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
    },
    {
      field: "dow",
      headerName: "DOW",
      flex: 3,
      headerAlign: "center",
      cellClassName: "centered-cell",
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const year = date.getFullYear().toString();
          return `${month}/${day}/${year}`;
        } else {
          return ""; // Return an empty string if there's no value
        }
      },
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
      headerName: "Sex",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "vac",
      headerName: "Vaccination",
      flex: 2,
      renderCell: renderWrappedCell,
      headerAlign: "center",
      cellClassName: "centered-cell",
    },
    {
      field: "deworming",
      headerName: "Deworming",
      flex: 2,
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

  // Define separate DataGrid components for each tab
  const dataGridTab1 = (
    <Box>
      <Box></Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p="10px"
      >
        {/* Barangay Dropdown*/}
        <Box width="10rem">
          <FormControl fullWidth>
            <InputLabel id="barangay-select-label">Barangay</InputLabel>
            <Select
              label="Barangay"
              labelId="barangay-select-label"
              id="barangay-select"
              sx={{ m: "0 10px 10px 0" }}
              value={selectedBarangay}
              onChange={handleBarangayChange}
            >
              {/* Use an empty string as the value for "All Barangay" */}
              <MenuItem key="All Barangay" value="All Barangay">
                All Barangay
              </MenuItem>
              {/* Render other barangay options */}
              {barangayOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Year and Quarter */}
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          sx={{ m: "0 10px 10px 0", width: "5rem" }}
          value={yearInput}
          onChange={handleYearInputChange}
          error={!isYearInputValid} // Use isYearInputValid to handle errors
          helperText={!isYearInputValid ? "4-digit" : ""}
        />

        <FormControl>
          <InputLabel id="quarter-select-label">Quarter</InputLabel>
          <Select
            label="Quarter"
            labelId="quarter-select-label"
            id="quarter-select"
            sx={{ m: "0 10px 10px 0", width: "10rem" }}
            value={selectedQuarter}
            onChange={handleQuarterChange}
          >
            <MenuItem value="All Quarter">All Quarter</MenuItem>
            <MenuItem value="1st Quarter">1st Quarter</MenuItem>
            <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
            <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
            <MenuItem value="4th Quarter">4th Quarter</MenuItem>
          </Select>
        </FormControl>
        {/* Button Export and Import Data */}

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginRight: "10px",
          }}
          onClick={openDialog2}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Export Data
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
          onClick={openDialog}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Import Data
        </Button>
      </Box>

      <DataGrid
        rows={gridDataTab1}
        columns={columnsTab1}
        sx={{height: '70vh'}}
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
  );

  const dataGridTab2 = (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p="10px"
      >
        {/* Barangay Dropdown*/}
        <Box width="10rem">
          <FormControl fullWidth>
            <InputLabel id="barangay-select-label">Barangay</InputLabel>
            <Select
              label="Barangay"
              labelId="barangay-select-label"
              id="barangay-select"
              sx={{ m: "0 10px 10px 0" }}
              value={selectedBarangay}
              onChange={handleBarangayChange}
            >
              {/* Use an empty string as the value for "All Barangay" */}
              <MenuItem key="All Barangay" value="All Barangay">
                All Barangay
              </MenuItem>
              {/* Render other barangay options */}
              {barangayOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Year and Quarter */}
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          sx={{ m: "0 10px 10px 0", width: "5rem" }}
          value={yearInput}
          onChange={handleYearInputChange}
          error={!isYearInputValid} // Use isYearInputValid to handle errors
          helperText={!isYearInputValid ? "4-digit" : ""}
        />

        <FormControl>
          <InputLabel id="quarter-select-label">Quarter</InputLabel>
          <Select
            label="Quarter"
            labelId="quarter-select-label"
            id="quarter-select"
            sx={{ m: "0 10px 10px 0", width: "10rem" }}
            value={selectedQuarter}
            onChange={handleQuarterChange}
          >
            <MenuItem value="All Quarter">All Quarter</MenuItem>
            <MenuItem value="1st Quarter">1st Quarter</MenuItem>
            <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
            <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
            <MenuItem value="4th Quarter">4th Quarter</MenuItem>
          </Select>
        </FormControl>
        {/* Button Export and Import Data */}

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginRight: "10px",
          }}
          onClick={openDialog2}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Export Data
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
          onClick={openDialog}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Import Data
        </Button>
      </Box>
      <DataGrid
        rows={gridDataTab2}
        columns={columnsTab2}
        sx={{height: '70vh'}}
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
  );
  const dataGridTab3 = (
    <Box>
      <Box></Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p="10px"
      >
        {/* Barangay Dropdown*/}
        <Box width="10rem">
          <FormControl fullWidth>
            <InputLabel id="barangay-select-label">Barangay</InputLabel>
            <Select
              label="Barangay"
              labelId="barangay-select-label"
              id="barangay-select"
              sx={{ m: "0 10px 10px 0" }}
              value={selectedBarangay}
              onChange={handleBarangayChange}
            >
              {/* Use an empty string as the value for "All Barangay" */}
              <MenuItem key="All Barangay" value="All Barangay">
                All Barangay
              </MenuItem>
              {/* Render other barangay options */}
              {barangayOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Year and Quarter */}
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          sx={{ m: "0 10px 10px 0", width: "5rem" }}
          value={yearInput}
          onChange={handleYearInputChange}
          error={!isYearInputValid} // Use isYearInputValid to handle errors
          helperText={!isYearInputValid ? "4-digit" : ""}
        />

        <FormControl>
          <InputLabel id="quarter-select-label">Quarter</InputLabel>
          <Select
            label="Quarter"
            labelId="quarter-select-label"
            id="quarter-select"
            sx={{ m: "0 10px 10px 0", width: "10rem" }}
            value={selectedQuarter}
            onChange={handleQuarterChange}
          >
            <MenuItem value="All Quarter">All Quarter</MenuItem>
            <MenuItem value="1st Quarter">1st Quarter</MenuItem>
            <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
            <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
            <MenuItem value="4th Quarter">4th Quarter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        rows={gridDataTab3}
        columns={columnsTab3}
        sx={{height: '70vh'}}
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
  );
  const dataGridTab4 = (
    <Box>

      <DataGrid
        rows={gridDataTab4}
        columns={columnsTab4}
        sx={{height: '70vh'}}
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
  );

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

      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab
          key={0}
          label="Master List"
          sx={{
            backgroundColor:
              activeTab === 0 ? colors.blueAccent[700] : "initial",
            color: activeTab === 0 ? colors.grey[100] : colors.grey[100],
            borderRadius: "20px 20px 0 0", 
          }}
        />
        <Tab
          key={1}
          label="EOPT"
          sx={{
            backgroundColor:
              activeTab === 1 ? colors.blueAccent[700] : "initial",
            color: activeTab === 1 ? colors.grey[100] : colors.grey[100],
            borderRadius: "20px 20px 0 0",
          }}
        />
        <Tab
          key={2}
          label="Archived"
          sx={{
            backgroundColor:
              activeTab === 2 ? colors.blueAccent[700] : "initial",
            color: activeTab === 2 ? colors.grey[100] : colors.grey[100],
            borderRadius: "20px 20px 0 0",
          }}
        />
        <Tab
          key={3}
          label="Duplicate"
          sx={{
            backgroundColor:
              activeTab === 3 ? colors.blueAccent[700] : "initial",
            color: activeTab === 3 ? colors.grey[100] : colors.grey[100],
            borderRadius: "20px 20px 0 0",
          }}
        />
      </Tabs>
      {activeTab === 0
        ? dataGridTab1
        : activeTab === 1
        ? dataGridTab2
        : activeTab === 2
        ? dataGridTab3 
        : dataGridTab4}

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

      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth>
        <ExcelToJSON closeDialog={closeDialog} />
      </Dialog>

      <Dialog
        open={isDialogOpen2}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
      >
        <ExportToExcel closeDialog={closeDialog} />
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default connect(mapState)(Table);
