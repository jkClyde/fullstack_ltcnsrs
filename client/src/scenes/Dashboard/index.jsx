import { Box, Button,Select, MenuItem, IconButton, Typography, useTheme } from "@mui/material";
import React, {useEffect, useState} from 'react';
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import EventsList from './../../components/Upcoming Events';
import { useStateContext } from "../../contexts/ContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from 'jwt-decode';
import Statistics from "../Database/Calculations/Statistics";





const Dashboard = () => {
  const { token } = useStateContext(); // Get the token from your context
  const [user, setUser] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const statsData = Statistics();


    // Categories and corresponding subtitles and progress values
    const data = {
      "Length for Age": [
        {name: 'Severly Stunted', progress:  Math.round((statsData.lfa_severe / statsData.population) * 100), number: statsData.lfa_severe},
        {name: 'Stunted', progress:  Math.round((statsData.lfa_stunted / statsData.population) * 100), number: statsData.lfa_stunted},
        {name: 'Normal', progress: Math.round((statsData.lfa_normal / statsData.population) * 100), number: statsData.lfa_normal},
        {name: 'Tall', progress: Math.round((statsData.lfa_tall / statsData.population) * 100), number: statsData.lfa_tall}
      ],
      "Weight for Length": [
        {name: 'Severly Wasted', progress: Math.round((statsData.wfl_severe / statsData.population) * 100), number: statsData.wfl_severe},
        {name: 'Wasted', progress: Math.round((statsData.wfl_wasted / statsData.population) * 100), number: statsData.wfl_wasted},
        {name: 'Normal', progress: Math.round((statsData.wfl_normal / statsData.population) * 100), number: statsData.wfl_normal},
        {name: 'Overweight', progress: Math.round((statsData.wfl_overweight / statsData.population) * 100), number: statsData.wfl_overweight},
        {name: 'Obese', progress: Math.round((statsData.wfl_obese / statsData.population) * 100), number: statsData.wfl_obese}
      ],
      "Weight for Age": [
        {name: 'Severly Underweight', progress: Math.round((statsData.wfa_severe / statsData.population) * 100), number: statsData.wfa_severe},
        {name: 'Underweight', progress: Math.round((statsData.wfa_underweight / statsData.population) * 100), number: statsData.wfa_underweight},
        {name: 'Normal', progress: Math.round((statsData.wfa_normal / statsData.population) * 100), number: statsData.wfa_normal},
        {name: 'Overweight', progress: Math.round((statsData.wfa_overweight / statsData.population) * 100), number: statsData.wfa_overweight}
      ],
    };

    const colorsOption = [
      { background: "linear-gradient(to bottom right, #F56545, #99201C)" },
      { background: "linear-gradient(to bottom right, #D7816A, #BD4F6C)" },
      { background: "linear-gradient(to bottom right, #3EADCF, #44B09E)" },
      { background: "linear-gradient(to bottom right, #B621FE, #1FD1F9)" }
    ];

  /* State for selected category */
  const [selectedCategory, setSelectedCategory] = React.useState("Length for Age");

  /* Function to be executed when a category is selected */
  const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
  };


  
  
 


 

 
 



  return (
    
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Children Nutrional Status Reporting System" subtitle="Welcome to your dashboard" />


      {/* DropDown */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ color: colors.redAccent[100], marginRight: '10px' }}>
          📅 {statsData.latestQuarter.year} - {statsData.latestQuarter.quarter}  
          </Typography>

            <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={{
              backgroundColor: colors.blueAccent[800],
              color: colors.grey[100],
              fontSize: "17px",
              fontWeight: "bold",
              padding: "0px 10px",
              }}
            >
            {Object.keys(data).map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>


      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {data[selectedCategory].map((item, index) => (
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          sx={colorsOption[index % colorsOption.length]} // looping through the colors array
        >   
          <StatBox
            key={index}
            title={item.name}
            subtitle={item.subtitle}
            progress={item.progress}
            number = {item.number}
          />
        </Box>
        ))}



        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Child Nutrition and Health Statistics by Barangay
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

           {/* EVENTS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden" /* Hide the scrollbar for the container */
        >
          <Box
            display="flex"
            flexDirection="column" /* Ensure the children stack vertically */
            colors={colors.grey[100]}
            p="15px"
            height="100%" /* Make sure the container takes up the full height */
          >
            <Box
              borderBottom={`4px solid ${colors.primary[500]}`}
              paddingBottom="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Upcoming Events
              </Typography>
            </Box>
            <Box
              overflow="auto" /* Allow only the EventsList component to scroll */
              flex="1" /* Make the EventsList take up remaining vertical space */
            >
              <EventsList />
            </Box>
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Monitoring
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {statsData.population} total children monitored
            </Typography>
            <Typography>For the 16 Barangays of La Trinidad</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Nutrition Statistics
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Population per Barangay
          </Typography>
          <Box height="200px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};


export default Dashboard;
