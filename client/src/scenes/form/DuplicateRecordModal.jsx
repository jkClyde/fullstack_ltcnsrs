// DuplicateRecordModal.js
import React from "react";
import Modal from "react-modal";
import { Button, Box } from "@mui/material";

const modalStyle = {
  content: {
    height: "200px",
    width: "300px", // Adjust the width as needed
    margin: "auto",
  },
};

const DuplicateRecordModal = ({
  isOpen,
  onConfirm,
  onCancel,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Duplicate Record Warning"
    style={modalStyle}
  >
    <Box p={2}>
      <p>This record already exists. Do you want to add it again?</p>
      <Box display="flex" justifyContent="space-between">
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
        <Button onClick={onCancel} variant="contained" color="secondary">
          Cancel
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default DuplicateRecordModal;
