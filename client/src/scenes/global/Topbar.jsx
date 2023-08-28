import React from "react";
import { Box, IconButton, useTheme, Typography, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import lt_logo from '../../assets/lt_logo.ico'

import {AccountItem, SettingsItem} from "../../components/MenuListComposition";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  // Use a media query to check if the screen size is small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

      {/* SEARCH BAR */}
    

      {/* ICONS */}
      <Box display="flex"  className=" z-10">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <SettingsItem />
        <AccountItem />


      </Box>
    </Box>
  );
};

export default Topbar;
