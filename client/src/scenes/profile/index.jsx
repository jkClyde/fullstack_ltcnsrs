import React, { useState } from 'react';
import profileImage from '../../assets/nurse_1.jpg';
import { ColorModeContext, useMode } from '../../theme';
import { Box, Typography, useTheme, Input, Select, MenuItem, Button } from '@mui/material';
import { tokens } from '../../theme';

const jobTitles = [
  'Head Nutritionist',
  'Assistant Nutritionist',
  'Nurse',
  'Intern',
  // Add more job titles as needed
];

const initialUser = {
  firstName: 'Jemica',
  middleInitial: 'O',
  lastName: 'Aluyod',
  email: 'NutrinidadNurse_jemima.com',
  jobTitle: 'Head Nutritionist',
  phoneNumber: '123-456-7890',
  address: '123 Main St, City, Country',
};

const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [editedUser, setEditedUser] = useState(initialUser);
  const [user, setUser] = useState(initialUser);

  const handleChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setUser(editedUser);
  };

  return (
    <Box className=" flex m-3 justify-center" color={colors.grey[500]}>
      <Box className="flex w-full">
        {/* Left Block */}
        <Box className="w-1/3 bg-customGray shadow-md rounded-md p-6 mr-4 md:block hidden"
             sx={{
                backgroundColor: colors.primary[400],
             }}>
          <Typography variant="h4" color={colors.grey[100]} sx={{ marginBottom: 3 }} className="text-center">PERSONEL INFORMATION</Typography>
          <img
            className="w-48 h-48 mx-auto rounded-full mb-4 border-4 border-customGreen"
            src={profileImage}
            alt="Profile"
          />
          <Typography variant="h5" color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-4 text-primary">
            {user.firstName} {user.middleInitial} {user.lastName}
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Job Title:</strong> <span>{user.jobTitle}</span>
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Address:</strong> <span>{user.address}</span>
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Email:</strong> <span>{user.email}</span>
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Phone Number:</strong> <span>{user.phoneNumber}</span>
          </Typography>
        </Box>

        {/* Right Block */}
        <Box className="w-full md:w-2/3 bg-customGray shadow-md rounded-md p-6"
         sx={{
            backgroundColor: colors.primary[400],
         }}>
          <Typography color={colors.grey[100]} variant="h3" className="text-center" sx={{marginBottom: "15px"}}> 
            Edit Information
          </Typography>
          <Box className="grid grid-cols-3 gap-4 mb-4">
            <Box className="flex flex-col">
              <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">First Name</Typography>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                value={editedUser.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)} 
              />
            </Box>
            <Box className="flex flex-col">
              <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">Middle Initial</Typography>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                value={editedUser.middleInitial}
                onChange={(e) => handleChange('middleInitial', e.target.value)}
              />
            </Box>
            <Box className="flex flex-col">
              <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">Last Name</Typography>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                value={editedUser.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </Box>
          </Box>
          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="col-span-3 font-bold mb-2">Job Title</Typography>
            <select
              className="w-full p-2 border rounded-md"
              value={editedUser.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            >
              <option value="" disabled>Select a job title</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </Box>
          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">Address</Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              value={editedUser.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </Box>
          <Box className="mb-4">
            <Typography color={colors.grey[100]}variant="h6" className="mb-1 font-bold">Email</Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="email"
              value={editedUser.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Box>
          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">Phone Number</Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="tel"
              value={editedUser.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </Box>

          <Button
          sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 30px",
              marginRight: "10px"
              }}>
              Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
