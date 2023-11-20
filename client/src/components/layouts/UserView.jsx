import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Box } from "@mui/material";

import { ColorModeContext, useMode } from "../../theme";
import { useStateContext } from "../../contexts/ContextProvider"; 
import Topbar from "../../scenes/global/Topbar"
import UserDrawer from "../../scenes/global/UserDrawer";

function UserLayout() {
  const {user, token} = useStateContext();
  
  if (!token){
    return <Navigate to='/login'/>
  }

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  return (
     <ColorModeContext.Provider value={colorMode}> 
       <ThemeProvider theme={theme}>
          <CssBaseline />
            <section className="flex app overflow-hidden">
                <UserDrawer isSidebar={isSidebar} />
                <div className="content">
                     <Topbar setIsSidebar={setIsSidebar}  />
                <div className=" h-screen    overflow-scroll ">
                   <Box width="99%">
                        <Outlet/>
                    </Box>
                </div>
                </div>
            </section>
       </ThemeProvider>
     </ColorModeContext.Provider>
  )
}

export default UserLayout