import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Drawer from "./scenes/global/Drawer";
import Table from "./scenes/team/Table";
import Hello from "./scenes/Hello";

import BarChart from "./scenes/charts/BarChart/index";
import Pie from "./scenes/Charts/PieChart";
import Line from "./scenes/charts/Line/index";

import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Form from "./scenes/form/Form";
import Calendar from "./scenes/calendar/Calendar";
import Geography from "./scenes/Charts/Geography";
import Dashboard from "./scenes/Dashboard/index";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
             <Drawer isSidebar={isSidebar} />
          
        
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
             <Box width="99%">
             <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/database" element={<Table />} />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/bar" element={<BarChart />} />
                <Route path="/pie" element={<Pie />} /> 
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
             </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;