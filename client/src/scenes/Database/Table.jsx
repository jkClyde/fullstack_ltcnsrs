import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Table = () => {

    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      flex: 1,
      headerName: "Address",
    },
    {
      field: "birthdate",
      headerName: "Birthdate",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
    },
    {
      field: "fathersName",
      headerName: "Father",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: renderWrappedCell,
    },
    {
      field: "fathersEthnicity",
      headerName: "Father's Ethnicity",
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "fathersOccupation",
      headerName: "Father's Occupation",
      flex: 1,
      renderCell: renderWrappedCell,
    },
    {
      field: "mothersName",
      headerName: "Mother",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
     
    },
    {
      field: "height",
      headerName: "Height",
      type: "number",
   
    },
    {
      field: "bmi",
      headerName: "BMI",
      type: "number",
  
    }
  ];

  return (
    <Box m="0px 10px"  >
      {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
      <Box
        m="10px 0 0 0"
        height="85vh" // Change height to "auto" to make it flexible
        minHeight="50vh" // Optionally set a minimum height
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
         <Box height= "100%"  overflow= "auto" >
          <DataGrid rows={mockDataTeam} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

export default Table;