import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ethnicityOptions = [
  "Aggay",
  "Akeanon/Aklanon",
  "Apayao/Yapayao",
  "Ayangan",
  "Balangao/Baliwon",
  "Bikol/Bicol",
  "Bisaya/Binisaya",
  "Bontok/Binontok",
  "Cebuano",
  "Hamtikanon",
  "Hiligaynon,Ilonggo",
  "Ibaloi/Inibaloi",
  "Ibanag",
  "Ibontoc",
  "Ifugao",
  "Kalanguya/Ikalahan",
  "Ilocano",
  "Iranon",
  "Itneg",
  "Kalinga",
  "Kankanai/Kankanaey",
  "Kapampangan",
  "Karao",
  "Kinalinga",
  "Kiniray-a",
  "Maranao",
  "Masbateno/Masbatean",
  "Pangasinan/Panggalato",
  "Surigaonon",
  "Tagalog",
  "Tausug",
  "Waray",
  "Other Local Ethnicity",
  "Chinese",
  "American/English",
  "Other Foreign Ethnicity",
  "Not Reported",
];

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
    fetchData();
  }, []);

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

    // Prepare the data to be sent to the backend
    const updatedPatientData = {
      ...editedPatient,
      aim: calculateAgeInMonths(editedPatient.birthdate),
    };

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
      const updatedPatient = {
        ...prevPatient,
        [name]: value,
        aim:
          name === "birthdate" ? calculateAgeInMonths(value) : prevPatient.aim,
      };

      console.log("Updated Patient Data:", updatedPatient);

      return updatedPatient;
    });
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
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
      {console.log("Rendering TextField:", name, value)}{" "}
      {/* Add this line for debugging */}
      {isEditing ? (
        name === "birthdate" ||
        name === "dow" ||
        name === "vacc" ||
        name === "purga" ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {console.log("Rendering DatePicker:", name, value)}{" "}
            {/* Add this line for debugging */}
            <DatePicker
              label={label}
              value={value ? new Date(value) : null}
              onChange={(newValue) => {
                console.log("New Value:", newValue);
                handleInputChange({
                  target: { name, value: newValue },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  value={value ? new Date(value).toLocaleDateString() : ""}
                />
              )}
            />
          </LocalizationProvider>
        ) : name === "aim" ? null : (
          <TextField
            fullWidth
            name={name}
            label={label}
            variant="outlined"
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
        {renderTextField("Age in Months", "aim", editedPatient.aim, "Months")}
      </Grid>

      <Grid item xs={3}>
        {renderTextField("DOW", "dow", editedPatient.dow)}
        {renderTextField("Vaccination", "vacc", editedPatient.vac)}
        {renderTextField("Purga", "purga", editedPatient.purga)}
      </Grid>

      <Grid item xs={3}>
        {renderTextField("Status (Weight)", "status", editedPatient.sWeight)}
        {renderTextField("Status (Height)", "status", editedPatient.sHeight)}
        {renderTextField("Disability", "disability", editedPatient.disability)}
      </Grid>
    </Grid>
  );

  const renderParentInformation = () => (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField(
          "Parent Name",
          "parent_name",
          editedPatient.parent_name
        )}
        {/* Replace the "Parent-Child Relation" TextField with a Select */}
        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="parent_relation"
              name="parent_relation"
              label="parent_relation"
              value={editedPatient.parent_relation}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Father">Father</MenuItem>
              <MenuItem value="Mother">Mother</MenuItem>
              <MenuItem value="Guardian">Guardian</MenuItem>
            </Select>
          </Box>
        ) : (
          // Display gender information when not editing
          <Box mt="16px">
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Parent-Child Relation
            </Typography>
            <Typography variant="body1">
              {editedPatient.parent_relation}
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
              id="temporary"
              name="temporary"
              label="temporary"
              value={editedPatient.temporary}
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
              Perma/Transient
            </Typography>
            <Typography variant="body1">{editedPatient.temporary}</Typography>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField(
          "Parent's Occupation",
          "parent_occupation",
          editedPatient.parent_occupation
        )}
        {isEditing ? (
          // Render the ethnicity field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="parent_ethnicity"
              name="parent_ethnicity"
              label="Parent's Ethnicity"
              value={editedPatient.parent_ethnicity}
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
              Parent's Ethnicity
            </Typography>
            <Typography variant="body1">
              {editedPatient.parent_ethnicity}
            </Typography>
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
