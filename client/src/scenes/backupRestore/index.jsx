// App.js

import React from 'react';
import './backupRestore.css';
import {
    Box,
  } from "@mui/material";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import RestoreIcon from '@mui/icons-material/Restore';

const BackupRestore = () => {
  // Placeholder functions for backup and restore
  const handleBackup = () => {
    console.log('Backup functionality goes here');
    // Add your backup logic here
  };

  const handleRestore = () => {
    console.log('Restore functionality goes here');
    // Add your restore logic here
  };

 
    return (
      <div className="BackupRestore">
        <div className="center-container">
          <Box backgroundColor="Black" color="White" borderRadius="10px">
            <button onClick={handleBackup}>
            <Box m="5px">
                <CloudDownloadOutlinedIcon/>
            </Box>
            Backup
            </button>
        </Box>
          <Box backgroundColor="Red" color="White" borderRadius="10px"><button onClick={handleRestore}><Box m="5px">
                <RestoreIcon/>
            </Box>Restore</button></Box>
        </div>
      </div>
    );
}

export default BackupRestore;
