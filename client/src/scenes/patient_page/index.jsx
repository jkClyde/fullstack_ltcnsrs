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
          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={editedPatient.name}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Name:</Typography>
                <Typography variant="body1">{editedPatient.name}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="birthdate"
                label="Date of Birth"
                variant="outlined"
                value={editedPatient.birthdate}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Date of Birth:</Typography>
                <Typography variant="body1">{editedPatient.birthdate}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="dow"
                label="DOW"
                variant="outlined"
                value={editedPatient.dateOfWeighing}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>DOW:</Typography>
                <Typography variant="body1">{editedPatient.dateOfWeighing}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="ageInMonths"
                label="Age in Months"
                variant="outlined"
                value={editedPatient.ageInMonths}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Age in Months:</Typography>
                <Typography variant="body1">{editedPatient.ageInMonths}</Typography>
              </>
            )}
          </Box>
        </Grid>

        <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="permanentOrTransient"
                label="P/T"
                variant="outlined"
                value={editedPatient.permanentOrTransient}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>P/T:</Typography>
                <Typography variant="body1">{editedPatient.permanentOrTransient}</Typography>
              </>
            )}
          </Box>

        <Grid item xs={6}>
          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="weight"
                label="Weight"
                variant="outlined"
                value={editedPatient.weight}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Weight:</Typography>
                <Typography variant="h4">{editedPatient.weight}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="height"
                label="Height"
                variant="outlined"
                value={editedPatient.height}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Height:</Typography>
                <Typography variant="body1">{editedPatient.height}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="address"
                label="Address"
                variant="outlined"
                value={editedPatient.address}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Address:</Typography>
                <Typography variant="body1">{editedPatient.address}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="sex"
                label="Gender"
                variant="outlined"
                value={editedPatient.sex}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Gender:</Typography>
                <Typography variant="body1">{editedPatient.sex}</Typography>
              </>
            )}
          </Box>

          <Box mt="16px">
            {isEditing ? (
              <TextField
                fullWidth
                name="sex"
                label="Gender"
                variant="outlined"
                value={editedPatient.sex}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>Gender:</Typography>
                <Typography variant="body1">{editedPatient.sex}</Typography>
              </>
            )}
          </Box>


          
        </Grid>
      </Grid>

      {isEditing ? (
        <Box mt="16px">
          <Button variant="contained" color="primary" onClick={handleSaveClick} >
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
