// HelpModalContent.jsx
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import VisibilityIcon from "@mui/icons-material/Visibility";



const HelpModalContent = () => {
  return (
    <Paper style={{ position: 'fixed', zIndex: 999, right: 16, top: 64 }}>
      <div style={{ overflowY: 'auto', maxHeight: '80vh', maxWidth: '40vw'}}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h6">How To Log Out</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">Press this Icon <PersonOutlinedIcon/> at the Top Right Corner and Choose <strong>Log Out</strong> option</Typography>
            </AccordionDetails>
          </Accordion>
          {/* Next */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant="h6">How To View & Edit Children Records</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">Press this Option <StorageOutlinedIcon/> <strong>Children Table</strong> at the Side Bar. You can Individually edit the child's record by clicking the <VisibilityIcon /> icon.</Typography>
              <Typography variant="body2"> You may click <MenuOutlinedIcon/> to expand or compress the side bar.</Typography>            </AccordionDetails>
          </Accordion>
          {/* Next */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant="h6">Record a new Child</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">On the left Side Bar. Look for this <PersonOutlinedIcon/> <strong>Profile Form</strong> option</Typography>
              <Typography variant="body2"> You may click <MenuOutlinedIcon/> to expand or compress the side bar.</Typography>
            </AccordionDetails>
          </Accordion>
          {/* Next */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant="h6">Dark Mode</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">Press this Icon <LightModeOutlinedIcon/> at the Top Right Corner which will set the theme to light or dark. It will show a <DarkModeOutlinedIcon/> when you are already in dark mode</Typography>
            </AccordionDetails>
          </Accordion>
      </div>
    </Paper>
  );
};

export default HelpModalContent;