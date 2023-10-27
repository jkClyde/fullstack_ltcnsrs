import { useState } from "react";
import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { Outlet } from 'react-router-dom'
import Topbar from "./../scenes/global/Topbar";
import Drawer from "./../scenes/global/Drawer";
import UserDrawer from "../scenes/global/UserDrawer";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./../theme";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {
  const { user, token, is_admin } = useStateContext();
  const location = useLocation();

  // const is_admin = false;
  if (!token) {
    return <Navigate to='/login' />;
  }

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
 
  // Check if the user is an admin
  if (is_admin) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <section className="flex app overflow-hidden">
            <Drawer isSidebar={isSidebar} />
            <div className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <div className="h-screen overflow-scroll">
                <Box width="99%">
                  <Outlet />
                </Box>
              </div>
            </div>
          </section>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  } else {
    // Render a different layout for non-admin users
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <section className="flex app overflow-hidden">
           <UserDrawer isSidebar={isSidebar} />
            <div className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <div className="h-screen overflow-scroll">
                <Box width="99%">
                <Outlet>
                {location.pathname === '/users' && (
                  <>
                    {console.log('Redirecting to /dashboard')}
                    <Navigate to="/dashboard" />
                  </>
                )}
              </Outlet>

                </Box>
              </div>
            </div>
          </section>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
}

export default DefaultLayout;
