import React, { useState, useEffect } from "react";
import ethnicityOptions from "../form/ethnicityOptions";
import { calculateAgeInMonths } from "../Database/Calculations/calculateAgeInMonths";
import lengthForAgeStatus from "../Database/Calculations/lengthForAgeStatus";
import weightForAgeStatus from "../Database/Calculations/weightForAgeStatus";
import weightForLengthStatus from "../Database/Calculations/weightForLengthStatus";
import "./../Database/StatusReference/StatusCellColors/statusColors.css"; 
import { getClassForStatusColorValue } from './getClassForStatusColorValue';
// import ChildInfo from "./ChildInfo";
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


const ChildProfile = ({ child, updateChildData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedChild, setEditedChild] = useState({ 
    ...child,
    weightForAge: weightForAgeStatus(child.birthdate, child.weight, child.gender),
    lengthForAge: lengthForAgeStatus(child.birthdate, child.height, child.gender),
    weightForLength: weightForLengthStatus(child.birthdate, child.height, child.weight, child.gender), 
  });
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedQuarter, setselectedQuarter] = useState("1st Quarter");
  const [selectedView, setSelectedView] = useState("child"); // Default view
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [gridData, setGridData] = useState([]);

  const fetchData = (childId, updatedChild) => {
    // Construct the API endpoint to fetch the data of the selected child
    const quarterEndpoint = calculateQuarter(editedChild.dow);
    const endpoint = `http://127.0.0.1:8000/${quarterEndpoint}`; // Replace 'childs' with your actual endpoint

    // Make a GET request to fetch the data
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error fetching data:", response.statusText);
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        // Update your table data with the fetched data
        setGridData(data);
        if (updatedChild) {
          // Update the updated child data
          setEditedChild(updatedChild);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Recalculate and update aim, weightForAge, lengthForAge, and weightForLength when birthdate changes
    const birthdate = editedChild.birthdate;
    const aim = calculateAgeInMonths(birthdate);
    const weightForAge = weightForAgeStatus(birthdate, editedChild.weight, editedChild.gender);
    const lengthForAge = lengthForAgeStatus(birthdate, editedChild.height, editedChild.gender);
    const weightForLength = weightForLengthStatus(birthdate, editedChild.height, editedChild.weight, editedChild.gender);
  
    setEditedChild((prevChild) => ({
      ...prevChild,
      aim: aim,
      weightForAge: weightForAge,
      lengthForAge: lengthForAge,
      weightForLength: weightForLength,
    }));
  }, [editedChild.birthdate]);
  
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const onUpdateSuccess = (updatedData) => {
    setEditedChild(updatedData);
    setIsSnackbarOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const quarterEndpoint = calculateQuarter(editedChild.dow);

    if (quarterEndpoint === "Unknown Quarter") {
      console.error("Could not determine the quarter endpoint.");
      return;
    }

    // Prepare the data to be sent to the backend
    const updatedChildData = {
      ...editedChild,
      birthdate: format(new Date(editedChild.birthdate), "yyyy-MM-dd"),
      aim: calculateAgeInMonths(editedChild.birthdate),
      // weightForAge: editedChild.weightForAge, // Include the calculated fields
      // lengthForAge: editedChild.lengthForAge,
      // weightForLength: editedChild.weightForLength,
    };

    // Send a PUT request to update the child data
    fetch(`http://127.0.0.1:8000/${quarterEndpoint}/${editedChild.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChildData),
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

        // Fetch the updated data of the selected child immediately
        fetchData(editedChild.id, updatedData); // Pass the child ID and updated child data

        updateChildData(updatedData);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const calculateQuarter = (dow) => {
    if (!dow) {
      return "Unknown Quarter";
    }

    const dateOfWeighing = new Date(dow);
    const month = dateOfWeighing.getMonth() + 1;

    if (month >= 1 && month <= 3) {
      return "firstquarter";
    } else if (month >= 4 && month <= 6) {
      return "secondquarter";
    } else if (month >= 7 && month <= 9) {
      return "thirdquarter";
    } else if (month >= 10 && month <= 12) {
      return "fourthquarter";
    } else {
      return "Unknown Quarter";
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the edited data to the original child data.
    setEditedChild({ ...child });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update the edited child data
    setEditedChild((prevChild) => {
      let updatedChild;
  
      if (name === "birthdate") {
        const birthdate = format(new Date(value), "yyyy-MM-dd");
        const aim = calculateAgeInMonths(birthdate);
        updatedChild = {
          ...prevChild,
          [name]: birthdate,
          aim: aim,
        };
      } else if (name === "weight" || name === "height") {
        updatedChild = {
          ...prevChild,
          [name]: value,
        };
      } else if (name === "dow" || name === "purga" || name === "vac") {
        updatedChild = {
          ...prevChild,
          [name]: value,
        };
      } else {
        updatedChild = {
          ...prevChild,
          [name]: value,
        };
      }
  
      // Calculate weightForAge, lengthForAge, and weightForLength based on updated data
      if (name === "birthdate" || name === "weight" || name === "height" || name === "gender") {
        const weightForAge = weightForAgeStatus(updatedChild.birthdate, updatedChild.weight, updatedChild.gender);
        const lengthForAge = lengthForAgeStatus(updatedChild.birthdate, updatedChild.height, updatedChild.gender);
        const weightForLength = weightForLengthStatus(updatedChild.birthdate, updatedChild.height, updatedChild.weight, updatedChild.gender);
  
        updatedChild = {
          ...updatedChild,
          weightForAge: weightForAge,
          lengthForAge: lengthForAge,
          weightForLength: weightForLength,
        };
      }
  
      return updatedChild;
    });
  };
  

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);

    // Update selectedYear and selectedQuarter based on the conditions
    if (event.target.value === "child") {
      // Find the child with the same first name, middle name, last name, and dow
      const matchingchild = gridData.find(
        (item) =>
          item.firstName === editedChild.firstName &&
          item.middleName === editedChild.middleName &&
          item.lastName === editedChild.lastName &&
          item.dow === editedChild.dow
      );

      // Update selectedYear and selectedQuarter based on the found child
      if (matchingchild) {
        setSelectedYear(matchingchild.year);
        setselectedQuarter(matchingchild.quarter);
      }
    }
  };

  const renderFullName = () => (
    <Box mt="16px">
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Full Name:
      </Typography>
      <Typography variant="body1">
        {editedChild.firstName} {editedChild.middleName}{" "}
        {editedChild.lastName}
      </Typography>
    </Box>
  );

  // const renderNameFields = () => (
  //   <>
      
  // );

  const renderTextField = (label, name, value, unit = "") => (
    <Box mt="10px">
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
            style={{ marginTop: "10px" }}
          />
        )
      ) : (
        <>
          <Grid item xs={12}>
                <Box mb="10px">           
                  <Box padding="10px" borderRadius="5px" border= "1px solid grey" className={getClassForStatusColorValue(value)}
>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {label}   
                      </Typography>
                      <Typography variant="body1">
                        {value} {unit}
                      </Typography>
                    </Box>
                </Box>

          </Grid>
        </>
      )}
    </Box>
  );

  const renderChildProfile = () => (
    <Grid container spacing={2}>
      <Grid item xs={3}>
      {renderTextField("First Name", "firstName", editedChild.firstName)}
      </Grid>
      <Grid item xs={3}>
      {renderTextField(
        "Middle Initial",
        "middleName",
        editedChild.middleName
      )}      
      </Grid>
      <Grid item xs={3}>
      {renderTextField("Last Name", "lastName", editedChild.lastName)}
      </Grid>
      <Grid item xs={3}>
        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="gender-select"
              name="gender"
              label="Gender"
              value={editedChild.gender}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>
        ) : (
          // Display gender information when not editing
          <Grid item xs={12}>
            <Box mt="10px">
              <Box padding="10px" borderRadius="5px" border= "1px solid grey">
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Gender:
                </Typography>
                <Typography variant="body1">{editedChild.gender}</Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid item xs={3}>
        {renderTextField("Date of Birth", "birthdate", editedChild.birthdate)}
        
      </Grid>
      <Grid item xs={3}>
      {!isEditing && renderTextField(
        "Age in Months", 
        "aim", 
        editedChild.aim,
         "Months old",
         )}
      </Grid>
    </Grid>
  );

  const renderHealthInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {renderTextField("Weight", "weight", editedChild.weight, "kg")}
        {renderTextField("Height", "height", editedChild.height, "cm")}
        {renderTextField("Date of Weighing (DOW)", "dow", editedChild.dow)}
      </Grid>
  
      <Grid item xs={3}>
        {renderTextField("Vaccination", "vac", editedChild.vac)}
        {renderTextField("Purga", "purga", editedChild.purga)}
        {renderTextField("Disability", "disability", editedChild.disability)}
      </Grid>
  
      <Grid item xs={3}>
        {!isEditing && renderTextField(
          "Weight For Age",
          "weightForAge",
          editedChild.weightForAge,
        )}
        {!isEditing && renderTextField(
          "Length For Age",
          "lengthForAge",
          editedChild.lengthForAge,
        )}
        {!isEditing && renderTextField(
          "Weight For Length",
          "weightForLength",
          editedChild.weightForLength,
        )}
      </Grid>
    </Grid>
  );
  

  const renderParentInformation = () => (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField("Parent Name", "parentName", editedChild.parentName)}
        {/* Replace the "Parent-Child Relation" TextField with a Select */}
        {isEditing ? (
          <Box mt="16px">
            <Select
              fullWidth
              id="relationship"
              name="relationship"
              label="relationship"
              value={editedChild.relationship}
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
              {editedChild.relationship}
            </Typography>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField("Address", "address", editedChild.address)}
        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="pt"
              name="pt"
              label="pt"
              value={editedChild.pt}
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
            <Typography variant="body1">{editedChild.pt}</Typography>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField(
          "Parent's Occupation",
          "occupation",
          editedChild.occupation
        )}
        {isEditing ? (
          // Render the ethnicity field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="ethnicity"
              name="ethnicity"
              label="Parent's Ethnicity"
              value={editedChild.ethnicity}
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
            <Typography variant="body1">{editedChild.ethnicity}</Typography>
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
          sx={{mb:"10px"}}
        >
          <MenuItem value="child">Child Profile</MenuItem>
          <MenuItem value="parent">Parent Information</MenuItem>
          <MenuItem value="health">Health Info</MenuItem>
        </Select>
        <Typography variant="h3" gutterBottom>
          {selectedView === "child"
            ? "Child Profile"
            : selectedView === "parent"
            ? "Parent Information"
            : "Health Info"}
        </Typography>

        <Box>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            sx={{ marginRight: "10px", mb:"10px" }}
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
            sx={{ marginLeft: "10px", mb:"10px"  }}
          >
            <MenuItem value="1st Quarter">1st Quarter</MenuItem>
            <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
            <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
            <MenuItem value="4th Quarter">4th Quarter</MenuItem>
          </Select>
        </Box>
      </Box>
      <Divider />

      {selectedView === "child"
        ? renderChildProfile()
        : selectedView === "parent"
        ? renderParentInformation()
        : renderHealthInfo()
      }


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

export default ChildProfile;
