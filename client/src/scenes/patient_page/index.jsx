import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

const PatientPage = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedQuarter, setselectedQuarter] = useState("1st Quarter");

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

  const renderFullName = () => (
    <Box mt="16px">
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Full Name:
      </Typography>
      <Typography variant="body1">
        {patient.fname} {patient.mname} {patient.lname}
      </Typography>
    </Box>
  );

  const renderNameFields = () => (
    <>
      {renderTextField("First Name", "fname", editedPatient.fname)}
      {isEditing && renderTextField("Middle Initial", "mname", editedPatient.mname)}
      {renderTextField("Last Name", "lname", editedPatient.lname)}
    </>
  );

  const renderTextField = (label, name, value, unit = "") => (
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
          <Typography variant="body1">
            {value} {unit}
          </Typography>
        </>
      )}
    </Box>
  );

  return (
    <Box p="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        marginBottom="5px"
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
            sx={{ marginLeft: "10px" }}
          >
            <MenuItem value="1st Quarter">1st Quarter</MenuItem>
            <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
            <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
            <MenuItem value="4th Quarter">4th Quarter</MenuItem>
          </Select>
        </Box>
      </Box>
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          {isEditing ? renderNameFields() : renderFullName()}
          {renderTextField("Perma/Transient", "permanentOrTransient", editedPatient.permanentOrTransient)}
          {renderTextField("Barangay", "barangay", editedPatient.barangay)}
        </Grid>

        <Grid item xs={3}>
          {renderTextField("Weight", "weight", editedPatient.weight, "kg")}
          {renderTextField("Height", "height", editedPatient.height, "cm")}
          {renderTextField("Age in Months", "ageInMonths", editedPatient.ageInMonths)}
          {renderTextField("Ethnicity", "ethnicity", `${editedPatient.fathersEthnicity}, ${editedPatient.mothersEthnicity}`)} 
          {renderTextField("Gender", "sex", editedPatient.sex)}
        </Grid>

        <Grid item xs={3}>
          {renderTextField("Date of Birth", "birthdate", editedPatient.birthdate)}
          {renderTextField("DOW", "dow", editedPatient.dateOfWeighing)}
          {renderTextField("Vaccination", "vacc", editedPatient.vac)}
          {renderTextField("Purga", "purga", editedPatient.purga)}
        </Grid>

        <Grid item xs={3}>
          {renderTextField("Status (Weight)", "status", editedPatient.sWeight)}
          {renderTextField("Status (Height)", "status", editedPatient.sHeight)}
          {renderTextField("Disability", "disability", editedPatient.disability)}
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
