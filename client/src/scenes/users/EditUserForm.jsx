import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';

const EditUserForm = ({ open, onClose, onSave, user }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleOpenSuccess = () => {
    setSuccessOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editedUser.first_name.trim()) {
      newErrors.first_name = 'First Name is required';
    }
    if (!editedUser.last_name.trim()) {
      newErrors.last_name = 'Last Name is required';
    }
    if (!editedUser.barangay.trim()) {
      newErrors.barangay = 'Barangay is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    handleOpenConfirmation();
  };

  const confirmSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/6/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        console.error('Error updating user:', response.statusText);
        return;
      }

      handleCloseConfirmation();
      handleOpenSuccess();
      onSave();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel shrink={!!editedUser.first_name} htmlFor="first-name">
                  First Name
                </InputLabel>
                <TextField
                  id="first-name"
                  name="first_name"
                  value={editedUser.first_name}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel shrink={!!editedUser.last_name} htmlFor="last-name">
                  Last Name
                </InputLabel>
                <TextField
                  id="last-name"
                  name="last_name"
                  value={editedUser.last_name}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel shrink={!!editedUser.barangay} htmlFor="barangay">
                  Barangay
                </InputLabel>
                <TextField
                  id="barangay"
                  name="barangay"
                  value={editedUser.barangay}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.barangay}
                  helperText={errors.barangay}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel shrink={!!editedUser.phone_number} htmlFor="phone-number">
                  Phone Number
                </InputLabel>
                <TextField
                  id="phone-number"
                  name="phone_number"
                  value={editedUser.phone_number}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.phone_number}
                  helperText={errors.phone_number}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!editedUser.email} htmlFor="email">
                  Email Address
                </InputLabel>
                <TextField
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isConfirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>Are you sure you want to save the changes?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={confirmSave}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isSuccessOpen} onClose={handleCloseSuccess}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Changes have been saved successfully.</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserForm;
