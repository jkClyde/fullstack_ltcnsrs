import React, { useState, useEffect } from "react";
import ethnicityOptions from "../form/ethnicityOptions";
import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Select,
  MenuItem,
  Snackbar,
  OutlinedInput,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

import lengthForAgeStatus from "../Database/Calculations/calculateAgeInMonths";
import weightForAgeStatus from "../Database/Calculations/weightForAgeStatus";
import weightForLengthStatus from "../Database/Calculations/weightForLengthStatus";
// Function to calculate age in months
const calculateAgeInMonths = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12;
  ageInMonths -= birthDate.getMonth();
  ageInMonths += today.getMonth();

  return ageInMonths;
};

const PatientProfile = ({ patient, updatePatientData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedQuarter, setselectedQuarter] = useState("1st Quarter");
  const [selectedView, setSelectedView] = useState("patient"); // Default view
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [gridData, setGridData] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/forms/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setGridData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Recalculate and update aim when birthdate changes
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      aim: calculateAgeInMonths(prevPatient.birthdate),
    }));
  }, [editedPatient.birthdate]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const onUpdateSuccess = (updatedData) => {
    setEditedPatient(updatedData);
    setIsSnackbarOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
    };
    // Prepare the data to be sent to the backend
    const updatedPatientData = {
      ...editedPatient,
      birthdate: format(new Date(editedPatient.birthdate), "yyyy-MM-dd"), // Format birthdate
      aim: calculateAgeInMonths(editedPatient.birthdate), // Recalculate age in months
    };

    console.log("Updated patient data before API call:", updatedPatientData);

    // Send a PUT request to update the patient data
    fetch(`http://127.0.0.1:8000/forms/${editedPatient.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPatientData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error updating data:", response.statusText);
          throw new Error("Error updating data");
        }
      })
      .then((updatedData) => {
        console.log("Updated data from API:", updatedData);
        onUpdateSuccess(updatedData);
        // After saving, fetch the updated data
        fetchData();
        updatePatientData(updatedData);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the edited data to the original patient data.
    setEditedPatient({ ...patient });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the edited patient data
    setEditedPatient((prevPatient) => {
      let updatedPatient;

      if (name === "birthdate") {
        const birthdate = format(new Date(value), "yyyy-MM-dd");
        const aim = calculateAgeInMonths(birthdate);

        updatedPatient = {
          ...prevPatient,
          [name]: birthdate,
          aim: aim,
        };
      } else if (name === "dow" || name === "purga" || name === "vac") {
        updatedPatient = {
          ...prevPatient,
          [name]: value,
        };
      } else {
        updatedPatient = {
          ...prevPatient,
          [name]: value,
        };
      }

      console.log("Updated Patient Data:", updatedPatient);

      return updatedPatient;
    });
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);

    // Update selectedYear and selectedQuarter based on the conditions
    if (event.target.value === "patient") {
      // Find the patient with the same first name, middle name, last name, and dow
      const matchingPatient = gridData.find(
        (item) =>
          item.firstName === editedPatient.firstName &&
          item.middleName === editedPatient.middleName &&
          item.lastName === editedPatient.lastName &&
          item.dow === editedPatient.dow
      );

      // Update selectedYear and selectedQuarter based on the found patient
      if (matchingPatient) {
        setSelectedYear(matchingPatient.year);
        setselectedQuarter(matchingPatient.quarter);
      }
    }
  };

  const renderFullName = () => (
    <Box mt="16px">
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Full Name:
      </Typography>
      <Typography variant="body1">
        {editedPatient.firstName} {editedPatient.middleName}{" "}
        {editedPatient.lastName}
      </Typography>
    </Box>
  );

  const renderNameFields = () => (
    <>
      {renderTextField("First Name", "firstName", editedPatient.firstName)}
      {renderTextField(
        "Middle Initial",
        "middleName",
        editedPatient.middleName
      )}
      {renderTextField("Last Name", "lastName", editedPatient.lastName)}
    </>
  );

  const renderTextField = (label, name, value, unit = "") => (
    <Box mt="16px">
      {console.log("Rendering TextField:", name, value)}
      {/* Add this line for debugging */}
      {isEditing ? (
        name === "birthdate" ||
        name === "dow" ||
        name === "vac" ||
        name === "purga" ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={label}
              value={value ? new Date(value) : null}
              onChange={(newValue) => {
                const formattedDate = newValue
                  ? format(newValue, "yyyy-MM-dd")
                  : "";
                const fakeEvent = { target: { name, value: formattedDate } };
                handleInputChange(fakeEvent);
              }}
              renderInput={(params) => (
                <OutlinedInput {...params} fullWidth label={label} />
              )}
            />
          </LocalizationProvider>
        ) : (
          <OutlinedInput
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={handleInputChange}
          />
        )
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

  const renderPatientProfile = () => (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {renderNameFields()}
        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="gender-select"
              name="gender"
              label="Gender"
              value={editedPatient.gender}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>
        ) : (
          // Display gender information when not editing
          <Box mt="16px">
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Gender:
            </Typography>
            <Typography variant="body1">{editedPatient.gender}</Typography>
          </Box>
        )}
      </Grid>

      <Grid item xs={3}>
        {renderTextField("Weight", "weight", editedPatient.weight, "kg")}
        {renderTextField("Height", "height", editedPatient.height, "cm")}
        {renderTextField("Date of Birth", "birthdate", editedPatient.birthdate)}
        {!isEditing &&
          renderTextField("Age in Months", "aim", editedPatient.aim, "Months")}
      </Grid>

      <Grid item xs={3}>
        {renderTextField("DOW", "dow", editedPatient.dow)}
        {renderTextField("Vaccination", "vac", editedPatient.vac)}
        {renderTextField("Purga", "purga", editedPatient.purga)}
      </Grid>

      <Grid item xs={3}>
        {renderTextField(
          "Weight For Age",
          "status",
          weightForAgeStatus(editedPatient)
        )}
        {renderTextField(
          "Length For Age",
          "status",
          lengthForAgeStatus(editedPatient)
        )}
        {renderTextField(
          "Weight For Length",
          "status",
          weightForLengthStatus(editedPatient)
        )}

        {renderTextField("Disability", "disability", editedPatient.disability)}
      </Grid>
    </Grid>
  );

  const renderParentInformation = () => (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField("Parent Name", "parentName", editedPatient.parentName)}
        {/* Replace the "Parent-Child Relation" TextField with a Select */}
        {isEditing ? (
          <Box mt="16px">
            <Select
              fullWidth
              id="relationship"
              name="relationship"
              label="relationship"
              value={editedPatient.relationship}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Father">Father</MenuItem>
              <MenuItem value="Mother">Mother</MenuItem>
              <MenuItem value="Guardian">Guardian</MenuItem>
            </Select>
          </Box>
        ) : (
          <Box mt="16px">
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Parent-Child Relation:
            </Typography>
            <Typography variant="body1">
              {editedPatient.relationship}
            </Typography>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField("Address", "address", editedPatient.address)}
        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="pt"
              name="pt"
              label="pt"
              value={editedPatient.pt}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Permanent">Permanent</MenuItem>
              <MenuItem value="Temporary">Temporary</MenuItem>
            </Select>
          </Box>
        ) : (
          // Display gender information when not editing
          <Box mt="16px">
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Perma/Transient:
            </Typography>
            <Typography variant="body1">{editedPatient.pt}</Typography>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField(
          "Parent's Occupation",
          "occupation",
          editedPatient.occupation
        )}
        {isEditing ? (
          // Render the ethnicity field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="ethnicity"
              name="ethnicity"
              label="Parent's Ethnicity"
              value={editedPatient.ethnicity}
              onChange={handleInputChange}
              variant="outlined"
            >
              {ethnicityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : (
          // Display ethnicity information when not editing
          <Box mt="16px">
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Parent's Ethnicity:
            </Typography>
            <Typography variant="body1">{editedPatient.ethnicity}</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
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
        <Select
          labelId="view-select-label"
          id="view-select"
          value={selectedView}
          onChange={handleViewChange}
        >
          <MenuItem value="patient">Child Profile</MenuItem>
          <MenuItem value="parent">Parent Information</MenuItem>
        </Select>
        <Typography variant="h3" gutterBottom>
          {selectedView === "patient" ? "Child Profile" : "Parent Information"}
        </Typography>
        <Box>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            sx={{ marginRight: "10px" }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
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

      {selectedView === "patient"
        ? renderPatientProfile()
        : renderParentInformation()}

      {isEditing ? (
        <Box mt="16px">
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelClick}
            sx={{ marginLeft: "10px" }}
          >
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
      {/* Snackbar for displaying information updated message */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Information Updated
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default PatientProfile;
