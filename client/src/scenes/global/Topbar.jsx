// TopBar.jsx
import React, { useState, useContext } from "react";
import { Box, IconButton, useTheme, Typography, useMediaQuery } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import lt_logo from "../../assets/lt_logo.ico";
import { AccountItem } from "../../components/dashboard_components/MenuListComposition";
import HelpModalContent from "./HelpModalContent";
import { ColorModeContext, tokens } from "../../theme";



const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const handleHelpButtonClick = () => {
    setHelpModalOpen(!helpModalOpen);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} pl={2} pr={2}>
      {/* Branding Section */}
      {!isSmallScreen && (
        <Box display="flex" alignItems="center">
          <img src={lt_logo} alt="LT-NMS Logo" style={{ height: "30px", marginRight: "8px" }} />
          <Typography variant="h6" component="span" fontWeight="bold">
            LT-CNSRS
          </Typography>
        </Box>
      )}

      {/* ICONS */}
      <Box display="flex" className="z-10">
        {/* Help IconButton */}
        <IconButton onClick={handleHelpButtonClick}>
          <HelpOutlineIcon />
        </IconButton>

        {/* Help Modal */}
        {helpModalOpen && <HelpModalContent />}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <AccountItem />
      </Box>
    </Box>
  );
};

export default Topbar;