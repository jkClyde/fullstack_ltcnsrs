import React, { useState, useEffect } from "react";
import ethnicityOptions from "../form/ethnicityOptions";
import { calculateAgeInMonths } from "../Database/Calculations/calculateAgeInMonths";
import lengthForAgeStatus from "../Database/Calculations/lengthForAgeStatus";
import weightForAgeStatus from "../Database/Calculations/weightForAgeStatus";
import weightForLengthStatus from "../Database/Calculations/weightForLengthStatus";
import "./../Database/StatusReference/StatusCellColors/statusColors.css";
import { getClassForStatusColorValue } from "./getClassForStatusColorValue";
import barangayOptions from "./../form/barangayOptions.js";

// import ChildInfo from "./ChildInfo";
import {
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  Grid,
  Select,
  MenuItem,
  Snackbar,
  OutlinedInput,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import MuiAlert from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import {
  ChildCareOutlined,
  MedicationLiquidOutlined,
  EscalatorWarningOutlined,
  ModeEditOutline,
} from "@mui/icons-material";
import axios from "axios"; // Import Axios

const ChildProfile = ({ child, updateChildData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isEditing, setIsEditing] = useState(false);

  const [editedChild, setEditedChild] = useState({
    ...child,
    weightForAge: weightForAgeStatus(
      child.birthdate,
      child.weight,
      child.gender
    ),
    lengthForAge: lengthForAgeStatus(
      child.birthdate,
      child.height,
      child.gender
    ),
    weightForLength: weightForLengthStatus(
      child.birthdate,
      child.height,
      child.weight,
      child.gender
    ),
    quarter: "",
  });
  const [selectedView, setSelectedView] = useState("child"); // Default view
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [initialYear, setInitialYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [dataExists, setDataExists] = useState(false);
  const birthYear = editedChild.birthdate
    ? new Date(editedChild.birthdate).getFullYear()
    : new Date().getFullYear();
  const startYear = birthYear;
  const endYear = birthYear + 5;

  // Generate an array of years within the range
  const yearRange = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  useEffect(() => {
    // Recalculate and update aim, weightForAge, lengthForAge, and weightForLength when birthdate changes
    const birthdate = editedChild.birthdate;
    const aim = calculateAgeInMonths(birthdate);
    const weightForAge = weightForAgeStatus(
      birthdate,
      editedChild.weight,
      editedChild.gender
    );
    const lengthForAge = lengthForAgeStatus(
      birthdate,
      editedChild.height,
      editedChild.gender
    );
    const weightForLength = weightForLengthStatus(
      birthdate,
      editedChild.height,
      editedChild.weight,
      editedChild.gender
    );

    setEditedChild((prevChild) => ({
      ...prevChild,
      aim: aim,
      weightForAge: weightForAge,
      lengthForAge: lengthForAge,
      weightForLength: weightForLength,
    }));
    const birthYear = editedChild.birthdate
      ? new Date(editedChild.birthdate).getFullYear()
      : new Date().getFullYear();
    const startYear = birthYear;
    const endYear = birthYear + 5;

    const yearRange = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );

    setInitialYear(birthYear);
    setSelectedYear(birthYear);

    axios
      .get(`http://127.0.0.1:8000/childhealthinfo/?child=${child.id}`)
      .then((response) => {
        const childHealthInfo = response.data.find(
          (info) => info.child === child.id
        );
        if (childHealthInfo) {
          setSelectedQuarter(childHealthInfo.quarter);
          setDataExists(!!childHealthInfo);

          // Set initialYear to the year of the data
          setInitialYear(childHealthInfo.getYear);
          console.log("Dropdown Year: ", childHealthInfo.getYear);
        }
      })
      .catch((error) => {
        console.error("Error fetching ChildHealthInfo record:", error);
      });
  }, [editedChild.birthdate, child.id]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };
  const [buttonLabel, setButtonLabel] = useState(
    dataExists ? "Save" : "Create"
  );
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);

  const handleCreateClick = () => {
    if (!dataExists) {
      // Determine the quarter based on the 'dow' (Date of Weighing) value
      const dowDate = new Date(editedChild.dow);
      const dowMonth = dowDate.getMonth() + 1; // Get the month (1-12)
      const dowYear = dowDate.getFullYear(); // Get the year

      // Get the numeric value for the selected quarter
      let selectedQuarterValue;
      switch (selectedQuarter) {
        case "1st Quarter":
          selectedQuarterValue = 1;
          break;
        case "2nd Quarter":
          selectedQuarterValue = 4;
          break;
        case "3rd Quarter":
          selectedQuarterValue = 7;
          break;
        case "4th Quarter":
          selectedQuarterValue = 10;
          break;
        default:
          selectedQuarterValue = 0;
      }

      // Check if the 'dow' corresponds to the selected quarter and year
      if (
        (selectedQuarterValue === 1 &&
          dowMonth >= 1 &&
          dowMonth <= 3 &&
          dowYear === selectedYear) ||
        (selectedQuarterValue === 4 &&
          dowMonth >= 4 &&
          dowMonth <= 6 &&
          dowYear === selectedYear) ||
        (selectedQuarterValue === 7 &&
          dowMonth >= 7 &&
          dowMonth <= 9 &&
          dowYear === selectedYear) ||
        (selectedQuarterValue === 10 &&
          dowMonth >= 10 &&
          dowMonth <= 12 &&
          dowYear === selectedYear)
      ) {
        // Calculate weightForAge, lengthForAge, and weightForLength
        const weightForAge = weightForAgeStatus(
          editedChild.birthdate,
          editedChild.weight,
          editedChild.gender
        );
        const lengthForAge = lengthForAgeStatus(
          editedChild.birthdate,
          editedChild.length,
          editedChild.gender
        );
        const weightForLength = weightForLengthStatus(
          editedChild.birthdate,
          editedChild.length,
          editedChild.weight,
          editedChild.gender
        );
        // Create new child data
        const newChildData = {
          child: child.id,
          quarter: selectedQuarter, // Use the selected quarter
          year: selectedYear, // Use the selected year
          weight: editedChild.weight || null,
          height: editedChild.height || null,
          muac: editedChild.muac || null,
          disability: editedChild.disability || null,
          dow: editedChild.dow || null,
          vac: editedChild.vac || null,
          deworming: editedChild.deworming || null,
          weightForAge: weightForAge,
          lengthForAge: lengthForAge,
          weightForLength: weightForLength,
        };

        // Now, send a POST request to create the new child data
        axios
          .post(`http://127.0.0.1:8000/childhealthinfo/`, newChildData)
          .then((response) => {
            setIsSnackbarOpen(
              true,
              "success",
              "Successfully Created a New Health Data"
            );
            setIsEditing(false);
            // You may want to do something here after the data is successfully created.
            // For example, you could update your local state or display a success message.
          })
          .catch((error) => {
            console.error("Error creating new ChildHealthInfo data:", error);
          });
      } else {
        // 'dow' does not match the selected quarter and year, log an error message
        console.log(
          "Cannot create in another quarter or year:",
          selectedQuarterValue,
          dowYear,
          dowMonth
        );
        setIsErrorSnackbarOpen(true);
      }
    } else {
      // Handle the case when dataExists is true (data for the selected quarter already exists).
      // You might want to display a message or implement your desired logic.
      console.log("Data already exists for the selected quarter and year.");
    }
    setButtonLabel("Save");
  };

  //{Update Button}//
  const handleUpdateClick = async () => {
    try {
      // Update the primary child data
      const updatedPrimaryChildData = {
        fullName: editedChild.fullName,
        address: editedChild.address,
        pt: editedChild.pt,
        muac: editedChild.muac,
        gender: editedChild.gender,
        birthdate: editedChild.birthdate,
        aim: editedChild.aim,
        parentName: editedChild.parentName,
        occupation: editedChild.occupation,
        relationship: editedChild.relationship,
        ethnicity: editedChild.ethnicity,
        barangay: editedChild.barangay,
      };

      const primaryChildResponse = await axios.put(
        `http://127.0.0.1:8000/primarychild/${child.id}/`,
        updatedPrimaryChildData
      );

      console.log("Primarychild data updated:", primaryChildResponse.data);

      // Fetch all ChildHealthInfo records for the selected child
      const childHealthInfoResponse = await axios.get(
        `http://127.0.0.1:8000/childhealthinfo/?child=${child.id}&quarter=${selectedQuarter}`
      );

      const childHealthInfo = childHealthInfoResponse.data.find(
        (info) => info.quarter === selectedQuarter && info.child === child.id
      );

      // Loop through each quarter's ChildHealthInfo entry and update
      if (childHealthInfo) {
        // Update the child health information for each quarter
        const updatedChildData = {
          weight: editedChild.weight,
          height: editedChild.height,
          muac: editedChild.muac,
          disability: editedChild.disability,
          dow: editedChild.dow,
          vac: editedChild.vac,
          purga: editedChild.purga,
          weightForAge: editedChild.weightForAge,
          lengthForAge: editedChild.lengthForAge,
          weightForLength: editedChild.weightForLength,
          child: child.id,
        };

        const updateChildHealthInfoResponse = await axios.put(
          `http://127.0.0.1:8000/childhealthinfo/${childHealthInfo.childHealth_id}/`,
          updatedChildData
        );

        console.log(
          `Childhealthinfo data updated for quarter ${childHealthInfo.quarter}:`,
          updateChildHealthInfoResponse.data
        );
      }

      setIsEditing(false);
      setIsSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    const buttonLabel = dataExists ? "Save" : "Create";
    setButtonLabel(buttonLabel);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedChild({
      ...child,
      weightForAge: weightForAgeStatus(
        child.birthdate,
        child.weight,
        child.gender
      ),
      lengthForAge: lengthForAgeStatus(
        child.birthdate,
        child.height,
        child.gender
      ),
      weightForLength: weightForLengthStatus(
        child.birthdate,
        child.height,
        child.weight,
        child.gender
      ),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

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
      } else if (
        name === "dow" ||
        name === "deworming1" ||
        name === "deworming2"
      ) {
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
      if (
        name === "birthdate" ||
        name === "weight" ||
        name === "height" ||
        name === "gender"
      ) {
        const weightForAge = weightForAgeStatus(
          updatedChild.birthdate,
          updatedChild.weight,
          updatedChild.gender
        );
        const lengthForAge = lengthForAgeStatus(
          updatedChild.birthdate,
          updatedChild.height,
          updatedChild.gender
        );
        const weightForLength = weightForLengthStatus(
          updatedChild.birthdate,
          updatedChild.height,
          updatedChild.weight,
          updatedChild.gender
        );

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
    const newYear = event.target.value;
    setSelectedYear(newYear); // Update the selectedYear state

    // Use both the new quarter and the selected year
    fetchData(selectedQuarter, newYear);
  };

  const handleQuarterChange = (event) => {
    const newQuarter = event.target.value;
    setSelectedQuarter(newQuarter); // Update the selectedQuarter state

    // When the quarter changes, also get the selected year
    fetchData(newQuarter, selectedYear);
  };

  const fetchData = (quarter, getYear) => {
    axios
      .get(`http://127.0.0.1:8000/childhealthinfo/?child=${child.id}`)
      .then((response) => {
        // Filter the data based on both quarter and year
        const childHealthInfo = response.data.find(
          (info) =>
            info.quarter === quarter &&
            info.getYear === getYear &&
            info.child === child.id
        );

        if (childHealthInfo) {
          // Data with the same child ID, selected quarter, and year exists
          console.log(
            "Data found for the selected quarter and year:",
            childHealthInfo
          );
          setDataExists(true); // Set dataExists to true
          // Populate the health-related fields in the editedChild state with data
          setEditedChild((prevChild) => ({
            ...prevChild,
            weight: childHealthInfo.weight || "",
            height: childHealthInfo.height || "",
            muac: childHealthInfo.muac || "",
            disability: childHealthInfo.disability || "",
            dow: childHealthInfo.dow || "",
            vac: childHealthInfo.vac,
            deworming: childHealthInfo.deworming || "",
            weightForAge: childHealthInfo.weightForAge || "",
            lengthForAge: childHealthInfo.lengthForAge || "",
            weightForLength: childHealthInfo.weightForLength || "",
            weightForAge:
              childHealthInfo.weightForAge ||
              weightForAgeStatus(
                prevChild.birthdate,
                childHealthInfo.weight,
                prevChild.gender
              ),
            lengthForAge:
              childHealthInfo.lengthForAge ||
              lengthForAgeStatus(
                prevChild.birthdate,
                childHealthInfo.height,
                prevChild.gender
              ),
            weightForLength:
              childHealthInfo.weightForLength ||
              weightForLengthStatus(
                prevChild.birthdate,
                childHealthInfo.height,
                childHealthInfo.weight,
                prevChild.gender
              ),
          }));
        } else {
          // No data found for the selected quarter and year
          console.log(
            "No data found for the selected quarter and year",
            quarter,
            getYear
          );
          setDataExists(false); // Set dataExists to false
          // Clear the health-related fields in the editedChild state
          setEditedChild((prevChild) => ({
            ...prevChild,
            weight: "N/A",
            height: "N/A",
            muac: "N/A",
            disability: "N/A",
            dow: "N/A",
            vac: "N/A",
            deworming: "N/A",
            weightForAge: "N/A",
            lengthForAge: "N/A",
            weightForLength: "N/A",
          }));
        }
      })
      .catch((error) => {
        console.error("Error checking data:", error);
      });
  };

  const handleViewChange = (event, newValue) => {
    setSelectedView(newValue);

    if (event.target.value === "child") {
      const matchingChild = gridData.find(
        (item) =>
          item.fullName === editedChild.fullName && item.dow === editedChild.dow
      );

      if (matchingChild) {
        setSelectedYear(matchingChild.year);
        setSelectedQuarter(matchingChild.quarter); // Set the selectedQuarter based on the found ChildHealthInfo record
      }
    }
  };

  const renderTextField = (label, name, value, unit = "") => (
    <Box mt="10px">
      {/* Add this line for debugging */}
      {isEditing ? (
        name === "birthdate" ||
        name === "dow" ||
        name === "deworming1" ||
        name === "deworming2" ? (
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
          <TextField
            fullWidth
            variant="outlined"
            name={name}
            label={label}
            value={value || ""} // Handle undefined or empty values
            onChange={handleInputChange}
            required={name !== "deworming1" && name !== "deworming2"} // Add this line
          />
        )
      ) : (
        // Show the updated value from editedChild when not editing
        <>
          <Grid item xs={12}>
            <Box mb="10px">
              <Box
                padding="10px"
                borderRadius="5px"
                border="1px solid grey"
                className={getClassForStatusColorValue(value)}
              >
                <Typography variant="h6">{label}</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild[name] !== undefined ? editedChild[name] : "N/A"}{" "}
                  {unit}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </Box>
  );

  const renderChildProfile = () => (
    <Grid container columnSpacing={2}>
      <Grid item xs={4}>
        {renderTextField("First Name", "fullName", editedChild.fullName)}

        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">Sex</InputLabel>
              <Select
                labelId="gender-select-label"
                label="Sex"
                id="gender-select"
                name="gender"
                value={editedChild.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          // Display gender information when not editing
          <Grid item xs={12}>
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Sex</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.gender}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField("Date of Birth", "birthdate", editedChild.birthdate)}
      </Grid>
      <Grid item xs={4}>
        {!isEditing &&
          renderTextField(
            "Age in Months",
            "aim",
            editedChild.aim,
            "Months old"
          )}
      </Grid>
    </Grid>
  );
  const isChildMoreThan12Months = editedChild.aim > 12;

  const renderHealthInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField("Weight", "weight", editedChild.weight, "kg")}
        {renderTextField("Height", "height", editedChild.height, "cm")}
        {renderTextField("MUAC", "muac", editedChild.muac, "cm")}
        {renderTextField("Disability", "disability", editedChild.disability)}
        {isEditing ? (
          // Render the bpe field only when editing
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="bpe-select-label">
                Bilateral Pitting Edema
              </InputLabel>
              <Select
                labelId="bpe-select-label"
                label="Bilateral Pitting Edema"
                id="bpe-select"
                name="bpe"
                value={editedChild.bpe}
                onChange={handleInputChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          // Display bpe information when not editing
          <Grid item xs={12}>
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Bilateral Pitting Edema:</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.bpe}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField("Date of Weighing (DOW)", "dow", editedChild.dow)}
        {isEditing ? (
          // Render the vac field only when editing
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="vac-select-label">Vaccination</InputLabel>
              <Select
                labelId="vac-select-label"
                label="Vaccination"
                id="vac-select"
                name="vac"
                value={editedChild.vac}
                onChange={handleInputChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          // Display vac information when not editing
          <Grid item xs={12}>
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Vaccination</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.vac}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
        {isEditing ? (
          // Render the deworming field only when editing
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="deworming-select-label">Deworming</InputLabel>
              <Select
                labelId="deworming-select-label"
                label="Deworming"
                id="deworming-select"
                name="deworming"
                value={editedChild.deworming}
                onChange={handleInputChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          // Display deworming information when not editing
          <Grid item xs={12}>
            <Box mt="10px">
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Deworming</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.deworming}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        style={{ margin: "0px 20px 0px 40px" }}
      />

      <Grid item xs={3}>
        {!isEditing &&
          renderTextField(
            "Weight For Age",
            "weightForAge",
            editedChild.weightForAge
          )}
        {!isEditing &&
          renderTextField(
            "Length For Age",
            "lengthForAge",
            editedChild.lengthForAge
          )}
        {!isEditing &&
          renderTextField(
            "Weight For Length",
            "weightForLength",
            editedChild.weightForLength
          )}
      </Grid>
    </Grid>
  );

  const renderParentInformation = () => (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField(
          "Caregiver Name",
          "parentName",
          editedChild.parentName
        )}
        {/* Replace the "Parent-Child Relation" TextField with a Select */}
        {/* {isEditing ? (
          <Box mt="16px">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="relationship-select-label">
                Relationship
              </InputLabel>
              <Select
                fullWidth
                id="relationship"
                name="relationship"
                label="Relationship"
                labelId="relationship-select-label"
                value={editedChild.relationship}
                onChange={handleInputChange}
                variant="outlined"
              >
                <MenuItem value="Father">Father</MenuItem>
                <MenuItem value="Mother">Mother</MenuItem>
                <MenuItem value="Guardian">Guardian</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box>
            <Box padding="10px" borderRadius="5px" border="1px solid grey">
              <Typography variant="h6">Relationship</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.relationship}
              </Typography>
            </Box>
          </Box>
        )} */}
        {/* {isEditing ? (
          // Render the ethnicity field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="ethnicity"
              name="ethnicity"
              label="Ethnicity"
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
          <Box>
            <Box
              mt="10px"
              padding="10px"
              borderRadius="5px"
              border="1px solid grey"
            >
              <Typography variant="h6">Ethnicity:</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.ethnicity}
              </Typography>
            </Box>
          </Box>
        )} */}
        {isEditing ? (
          // Render the ethnicity field as TextField when editing
          <Box mt="16px">
            <TextField
              fullWidth
              id="ethnicity"
              name="ethnicity"
              label="Ethnicity"
              value={editedChild.ethnicity}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        ) : (
          // Display ethnicity information when not editing
          <Box>
            <Box
              mt="10px"
              padding="10px"
              borderRadius="5px"
              border="1px solid grey"
            >
              <Typography variant="h6">Ethnicity:</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.ethnicity}
              </Typography>
            </Box>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        {renderTextField("Address", "address", editedChild.address)}

        {isEditing ? (
          // Render the field only when editing
          <Box mt="16px">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="pt-select-label">Permanent/Transient</InputLabel>
              <Select
                fullWidth
                id="pt"
                name="pt"
                labelId="pt-select-label"
                label="Permanent/Transient"
                value={editedChild.pt}
                onChange={handleInputChange}
                variant="outlined"
              >
                <MenuItem value="Permanent">Permanent</MenuItem>
                <MenuItem value="Temporary">Temporary</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          // Display information when not editing
          <Box>
            <Box padding="10px" borderRadius="5px" border="1px solid grey">
              <Typography variant="h6">Permanent/Transient</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.pt}
              </Typography>
            </Box>
          </Box>
        )}
      </Grid>

      <Grid item xs={4}>
        <Box mt="10px">
          {isEditing ? (
            // Render the barangay field only when editing
            <Box mt="10px">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="barangay-select-label">Barangay</InputLabel>
                <Select
                  labelId="barangay-select-label"
                  label="Barangay"
                  id="barangay-select"
                  name="barangay"
                  value={editedChild.barangay}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  {barangayOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            // Display barangay information when not editing
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Barangay:</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.barangay}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box mt="10px">
          {renderTextField(
            "Caregiver's Occupation",
            "occupation",
            editedChild.occupation
          )}
        </Box>
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
        <Tabs
          value={selectedView}
          onChange={handleViewChange}
          variant="fullWidth"
          sx={{ mb: "10px" }}
        >
          <Tab
            icon={<ChildCareOutlined />}
            label="Profile"
            value="child"
            sx={(theme) => ({
              backgroundColor:
                selectedView === "child"
                  ? theme.palette.mode === "light"
                    ? colors.blueAccent[700]
                    : colors.blueAccent[700]
                  : undefined,
              borderRadius: "20px 20px 0 0",
            })}
          />
          <Tab
            icon={<MedicationLiquidOutlined />}
            label="Health"
            value="health"
            sx={(theme) => ({
              backgroundColor:
                selectedView === "health"
                  ? theme.palette.mode === "light"
                    ? colors.blueAccent[700]
                    : colors.blueAccent[700]
                  : undefined,
              borderRadius: "20px 20px 0 0",
            })}
          />
          <Tab
            icon={<EscalatorWarningOutlined />}
            label="Caregiver"
            value="parent"
            sx={(theme) => ({
              backgroundColor:
                selectedView === "parent"
                  ? theme.palette.mode === "light"
                    ? colors.blueAccent[700]
                    : colors.blueAccent[700]
                  : undefined,
              borderRadius: "20px 20px 0 0",
            })}
          />
        </Tabs>

        {selectedView === "health" ? (
          <Box>
            <Select
              labelId="year-select-label"
              id="year-select"
              onChange={handleYearChange}
              sx={{ marginRight: "10px", mb: "10px" }}
              value={selectedYear || initialYear}
            >
              {yearRange.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>

            <Select
              labelId="quarter-select-label"
              id="quarter-select"
              sx={{ marginLeft: "10px", mb: "10px" }}
              value={selectedQuarter} // Use the selectedQuarter state as the value
              onChange={handleQuarterChange}
            >
              <MenuItem value="1st Quarter">1st Quarter</MenuItem>
              <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
              <MenuItem value="3rd Quarter">3rd Quarter</MenuItem>
              <MenuItem value="4th Quarter">4th Quarter</MenuItem>
            </Select>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {selectedView === "child"
        ? renderChildProfile()
        : selectedView === "parent"
        ? renderParentInformation()
        : renderHealthInfo()}

      {isEditing ? (
        <Box mt="16px" sx={{ display: "flex", justifyContent: "flex-end" }}>
          {dataExists ? (
            <Button
              variant="contained"
              color="info"
              onClick={handleUpdateClick}
            >
              {buttonLabel}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleCreateClick}
            >
              Create
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelClick}
            sx={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box mt="16px" sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="info" onClick={handleEditClick}>
            <ModeEditOutline sx={{ paddingRight: "5px" }} />
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
          severity={dataExists ? "info" : "success"} // Use "info" for updates, "success" for new creations
          sx={{ width: "100%" }}
        >
          {
            dataExists
              ? "Information Updated" // Display this message for updates
              : "Successfully Created a New Health Data" // Display this message for new creations
          }
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={() => setIsErrorSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          You have inputed the wrong Date Of Weighing
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ChildProfile;
