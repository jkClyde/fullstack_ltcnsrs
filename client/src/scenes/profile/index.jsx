import React, { useState, useEffect } from 'react';
import profileImage from '../../assets/nurse_1.jpg';
import { tokens } from '../../theme';
import { useStateContext } from '../../contexts/ContextProvider';
import { Box, Typography, useTheme, Input, Select, MenuItem, Button } from '@mui/material';

const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token } = useStateContext(); // Get the token from your context

  const [editedUser, setEditedUser] = useState({});


  const [user, setUser] = useState({});
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = () => {
    const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
    // Replace with your actual API endpoint
    fetch('http://127.0.0.1:8000/auth/users/me/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedToken.data.access}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEditedUser(data);
        setUser(data);
       
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setUser(editedUser);
    // You can also send a PUT request to update the user data on the server here if needed
  };

  const jobTitles = [
    'Administrator',
    'Assistant Nutritionist',
    'Nurse',
    'Intern',
    // Add more job titles as needed
  ];

  return (
    <Box className="flex m-3 justify-center" color={colors.grey[500]}>
      <Box className="flex w-full">
        {/* Left Block */}
        <Box
          className="w-1/3 bg-customGray shadow-md rounded-md p-6 mr-4 md:block hidden"
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h4" color={colors.grey[100]} sx={{ marginBottom: 3 }} className="text-center">
            PERSONEL INFORMATION
          </Typography>
          <img
            className="w-48 h-48 mx-auto rounded-full mb-4 border-4 border-customGreen"
            src={profileImage}
            alt="Profile"
          />
           <Typography variant="h4" color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-4 text-center text-primary">
            {user.first_name}  {user.last_name}
          </Typography>
         
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Job Title:</strong> <span>{user.job_description}</span>
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Address:</strong> <span>{user.barangay}</span>
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Email:</strong> <span>{user.email}</span>
          </Typography>
          <Typography color={colors.grey[100]} sx={{ marginBottom: 1 }} className="mb-1">
            <strong>Phone Number:</strong> <span>{user.phone_number}</span>
          </Typography>
        </Box>

        {/* Right Block */}
        <Box
          className="w-full md:w-2/3 bg-customGray shadow-md rounded-md p-6"
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography color={colors.grey[100]} variant="h3" className="text-center" sx={{ marginBottom: "15px" }}>
            Edit Information
          </Typography>
          <Box className="grid grid-cols-2 gap-4 mb-4">
            <Box className="flex flex-col">
              <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">
                First Name
              </Typography>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                value={user.first_name}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </Box>
            <Box className="flex flex-col">
              <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">
                Last Name
              </Typography>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                value={user.last_name}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </Box>
          </Box>
          {/* <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="col-span-3 font-bold mb-2">
              Job Title
            </Typography>
            <select
              className="w-full p-2 border rounded-md"
              value={user.job_description}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            >
              <option value="" disabled>
                Select a job title
              </option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </Box> */}
          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">
              Job Desciption
            </Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              value={user.job_description}
              onChange={(e) => handleChange('job_description', e.target.value)}
            />
          </Box>

          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">
              Barangay
            </Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              value={user.barangay}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </Box>
          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">
              Email Address
            </Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="email"
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled // Add the 'disabled' attribute here

            />
          </Box>
          <Box className="mb-4">
            <Typography color={colors.grey[100]} variant="h6" className="mb-1 font-bold">
              Phone Number
            </Typography>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              value={user.phone_number}
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
              marginRight: "10px",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
