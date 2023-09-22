import React, { useState } from "react";
import { Box, Typography, Divider, TextField, Button, Grid, Select, MenuItem } from "@mui/material";

const PatientPage = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [selectedYear, setSelectedYear] = useState(2022); // Default selected year
  const [selectedQuarter, setselectedQuarter] = useState('1st Quarter'); // Default selected year


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // You can implement logic here to save the edited data, e.g., send it to an API.
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the edited data to the original patient data.
    setEditedPatient({ ...patient });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const renderTextField = (label, name, value) => (
    <Box mt="16px">
      {isEditing ? (
        <TextField
          fullWidth
          name={name}
          label={label}
          variant="outlined"
          value={value}
          onChange={handleInputChange}
        />
      ) : (
        <>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            {label}:
          </Typography>
          <Typography variant="body1">{value}</Typography>
        </>
      )}
    </Box>
  );

  return (
    <Box p="16px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        marginBottom='5px'
      >
      <Typography variant="h3" gutterBottom>
        Patient Profile
      </Typography>
      <Box>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={2018 + i}>
                {2018 + i}
              </MenuItem>
            ))}
          </Select>

          <Select
  labelId="quarter-select-label"
  id="quarter-select"
  value={selectedQuarter}
  onChange={(event) => setselectedQuarter(event.target.value)}
  sx={{ marginLeft: '10px' }} // Add styling if needed
>
  <MenuItem value="1st Quarter">1st Quarter</MenuItem>
  <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
  <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
</Select>

        </Box>
      </Box>
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {renderTextField("Name", "name", editedPatient.name)}
          {renderTextField("Date of Birth", "birthdate", editedPatient.birthdate)}
          {renderTextField("DOW", "dow", editedPatient.dateOfWeighing)}
          {renderTextField("Age in Months", "ageInMonths", editedPatient.ageInMonths)}
          {renderTextField("P/T", "permanentOrTransient", editedPatient.permanentOrTransient)}
        </Grid>

        <Grid item xs={6}>
          {renderTextField("Weight", "weight", editedPatient.weight)}
          {renderTextField("Height", "height", editedPatient.height)}
          {renderTextField("Address", "address", editedPatient.address)}
          {renderTextField("Gender", "sex", editedPatient.sex)}
         
        </Grid>
      </Grid>

      {isEditing ? (
        <Box mt="16px">
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box mt="16px">
          <Button variant="outlined" onClick={handleEditClick}>
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PatientPage;