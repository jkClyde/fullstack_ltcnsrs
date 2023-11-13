import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { styled } from '@mui/system';
import ExportToExcel from "../export/index.jsx";

const ExportButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ExportDialog = ({ open, onClose, childData }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <ExportButton
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          onClick={() => {
            exportToExcel(childData);
            onClose(); // Close the dialog after exporting
          }}
        >
          Upload file as Excel
        </ExportButton>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
