import React, { useState, useEffect } from "react";
import { calculateAgeInMonths } from "../Database/Calculations/calculateAgeInMonths";
import lengthForAgeStatus from "../Database/Calculations/lengthForAgeStatus";
import weightForAgeStatus from "../Database/Calculations/weightForAgeStatus";
import weightForLengthStatus from "../Database/Calculations/weightForLengthStatus";
import "./../Database/StatusReference/StatusCellColors/statusColors.css";
import { getClassForStatusColorValue } from "./getClassForStatusColorValue";
import barangayOptions from "../form/barangayOptions.js";
import databaseURL from "../../databaseURL.js";

import ChildInfo from "./modules/ChildInfo";
import HealthInfo from "./modules/HealthInfo";
import CaregiverInfo from "./modules/CaregiverInfo";
import AddressInfo from "./modules/AddressInfo";
import IntakesInfo from "./modules/IntakesInfo";

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
  Assessment,
  Home,
  Vaccines,
} from "@mui/icons-material";
import axios from "axios"; // Import Axios
import * as Yup from "yup";

const ChildProfile = ({ child, updateChildData, selectedChildId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isEditing, setIsEditing] = useState(false);
  // validation------------------------------------------>
  const childProfileSchema = Yup.object().shape({
    dow: Yup.date().required("Date of Weighing is required"),
    surname: Yup.string()
      .required("Required")
      .matches(
        /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
        "Special characters not allowed"
      ),
    firstname: Yup.string()
      .required("Required")
      .matches(
        /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
        "Special characters not allowed"
      ),
    middlename: Yup.string()
      .notRequired()
      .matches(
        /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
        "Special characters not allowed"
      ),
    suffix: Yup.string()
      .matches(
        /^[A-Za-z\s.]{2,16}$/, // Allow letters (upper and lower case), spaces, and period
        "Only letters, spaces, and periods are allowed"
      )
      .notRequired(),
    gender: Yup.string().required("Required"),
    birthWeight: Yup.number()
      .notRequired()
      .typeError("Birth Weight must be a number"),
    birthOrder: Yup.string()
      .notRequired()
      .matches(
        /^[A-Za-z0-9\s]{2,16}$/, // Allow letters (upper and lower case), numbers, and spaces
        "Only letters, numbers, and spaces are allowed"
      ),
    houseNumberAndStreet: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\d\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,50}$/, ""),
    sitio: Yup.string()
      .notRequired()
      .matches(
        /^[A-Za-z\s.]{2,50}$/,
        "Should contain only 2-20 letters (no special characters)"
      ),
    barangay: Yup.string().required("Required"),
    pt: Yup.string().notRequired(),
    lengthOfStay: Yup.number().notRequired(),
    lengthOfStayType: Yup.string().notRequired(),
    fatherSurname: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "no special characters"),
    fatherFirstName: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "no special characters"),
    fatherMiddleName: Yup.string()
      .notRequired()
      .matches(
        /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
        "Special characters not allowed"
      ),
    fatherSuffix: Yup.string()
      .notRequired()
      .matches(
        /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
        "Special characters not allowed"
      ),
    fatherAge: Yup.number().required("Required").typeError("Must be a number"),
    fatherEthnicity: Yup.string().required("Required"),
    fatherOccupation: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    fatherReligion: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    fatherContact: Yup.number()
      .notRequired()
      .test("isElevenDigits", "Must be an 11-digit number", (value) =>
        value ? /^[0-9]{11}$/.test(value) : true
      ),
    motherSurname: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    motherFirstName: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    motherMiddleName: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    motherAge: Yup.number().notRequired().typeError("Must be a number"),
    motherEthnicity: Yup.string().notRequired(),
    motherOccupation: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    motherReligion: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    motherContact: Yup.number()
      .notRequired()
      .test("isElevenDigits", "Must be an 11-digit number", (value) =>
        value ? /^[0-9]{11}$/.test(value) : true
      ),
    caregiverSurname: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    caregiverFirstName: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    caregiverMiddleName: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    caregiverSuffix: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s.]{2,16}$/, "Special characters not allowed"),
    caregiverRelationship: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    caregiverAge: Yup.number().notRequired(),
    caregiverOccupation: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    caregiverReligion: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    caregiverContact: Yup.number()
      .notRequired()
      .test("isElevenDigits", "Must be an 11-digit number", (value) =>
        value ? /^[0-9]{11}$/.test(value) : true
      ),
    muac: Yup.number()
      .min(0, "MUAC must be a non-negative number")
      .required("MUAC is required"),
    weight: Yup.number()
      .nullable()
      .positive("Weight must be a positive number")
      .moreThan(0, "Weight must be greater than 0"),
    height: Yup.number()
      .nullable()
      .positive("Height must be a positive number")
      .moreThan(0, "Height must be greater than 0"),
    bpe: Yup.string().notRequired(),
    disability: Yup.string().notRequired(),
    otherDisability: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    vac: Yup.string().notRequired(),
    vaccinationRemarks: Yup.string()
      .notRequired()
      .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
    pt: Yup.string().required("Status of Residency must not be empty"),
    birthdate: Yup.date().required("Date of Birth is required"),
  });
  const validateForm = async (data) => {
    try {
      await childProfileSchema.validate(data, { abortEarly: false });
      return {}; // No validation errors
    } catch (errors) {
      // Yup validation errors
      const validationErrors = {};
      errors.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return validationErrors;
    }
  };
  const [isValidationError, setIsValidationError] = useState(false);
  // validation----------------------------------------->
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
  const childId = editedChild.id;

  const [selectedView, setSelectedView] = useState("child"); // Default view
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [initialYear, setInitialYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [frequentStatuses, setFrequentStatuses] = useState({});
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
    // Function to fetch most frequent statuses from backend
    const fetchMostFrequentStatuses = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000//get-most-frequent-statuses"
        );
        console.log("Fetched Data:", response.data); // Log fetched data
        setFrequentStatuses(response.data);
      } catch (error) {
        console.error("Error fetching most frequent statuses:", error);
      }
    };

    fetchMostFrequentStatuses();
  }, []);

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

  const handleCreateClick = async () => {
    const validationErrors = await validateForm(editedChild);

    if (Object.keys(validationErrors).length === 0) {
      const dowDate = new Date(editedChild.dow);
      const dowMonth = dowDate.getMonth() + 1;
      const dowYear = dowDate.getFullYear();
      let selectedQuarterValue;
      try {
        await childProfileSchema.validate(editedChild, { abortEarly: false });
      } catch (errors) {
        console.log("Yup validation errors:", errors);
        // You can handle Yup validation errors here if needed
        return;
      }
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
        const weightForAge = weightForAgeStatus(
          editedChild.birthdate,
          editedChild.weight,
          editedChild.gender
        );
        const lengthForAge = lengthForAgeStatus(
          editedChild.birthdate,
          editedChild.height,
          editedChild.gender
        );
        const weightForLength = weightForLengthStatus(
          editedChild.birthdate,
          editedChild.height,
          editedChild.weight,
          editedChild.gender
        );
        const newChildData = {
          child: child.id,
          quarter: selectedQuarter,
          year: selectedYear,
          weight: editedChild.weight || null,
          height: editedChild.height || null,
          muac: editedChild.muac || null,
          disability: editedChild.disability || null,
          dow: editedChild.dow || null,
          vac: editedChild.vac || null,
          bpe: editedChild.bpe || null,
          deworming: editedChild.deworming || null,
          weightForAge: weightForAge,
          lengthForAge: lengthForAge,
          weightForLength: weightForLength,
        };
        axios
          .post(`http://127.0.0.1:8000/childhealthinfo/`, newChildData)
          .then((response) => {
            setIsSnackbarOpen(
              true,
              "success",
              "Successfully Created a New Health Data"
            );
            setIsEditing(false);
          })
          .catch((error) => {
            console.error("Error creating new ChildHealthInfo data:", error);
          });
      } else {
        console.log(
          "Cannot create in another quarter or year:",
          selectedQuarterValue,
          dowYear,
          dowMonth
        );
        setIsErrorSnackbarOpen(true);
        setIsValidationError(false);
      }
    } else {
      console.log("Validation errors:", validationErrors);
      setIsValidationError(true);
      alert(`${JSON.stringify(validationErrors)}`);
      return;
    }
    setButtonLabel("Save");
  };

  const handleUpdateClick = async () => {
    try {
      const validationErrors = await validateForm(editedChild);
      if (Object.keys(validationErrors).length === 0) {
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
        const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
        fetch("http://127.0.0.1:8000/auth/users/me/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken.data.access}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const auditCreatePayload = {
              user: data.first_name + " " + data.last_name, // Assuming you want to send the user data as part of the payload
              action: "Updated a Child Data", // Replace 'your_action_here' with the actual action
            };
            fetch("http://127.0.0.1:8000/audit/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(auditCreatePayload),
            })
              .then((auditResponse) => auditResponse.json())
              .then((auditData) => {
                console.log("Audit creation response:", auditData);
              })
              .catch((auditError) => {
                console.error("Error creating audit:", auditError);
              });
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

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
      } else {
        // Validation errors, handle them (e.g., show an alert)
        console.log("Validation errors:", validationErrors);
        const errorMessage = Object.values(validationErrors).join("\n");
        alert(`Validation errors:\n${errorMessage}`);
        return;
      }
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
      } else {
        // Only update these fields if they have values when editing
        updatedChild = isEditing
          ? { ...prevChild, [name]: value }
          : { ...prevChild };
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
      .get(`${databaseURL}/childhealthinfo/?child=${child.id}`)
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
        name === "vitAOneHTIU" ||
        name === "vitATwoHTIUOneYear" ||
        name === "vitATwoHTIUOneSixYear" ||
        name === "vitATwoHTIUTwoYear" ||
        name === "vitATwoHTIUTwoSixYear" ||
        name === "vitATwoHTIUThreeYear" ||
        name === "vitATwoHTIUThreeSixYear" ||
        name === "vitATwoHTIUFourYear" ||
        name === "vitATwoHTIUFourSixYear" ||
        name === "vitATwoHTIUFiveYear" ||
        name === "dewormingOneYear" ||
        name === "dewormingOneSixYear" ||
        name === "dewormingTwoYear" ||
        name === "dewormingTwoSixYear" ||
        name === "dewormingThreeYear" ||
        name === "dewormingThreeSixYear" ||
        name === "dewormingFourYear" ||
        name === "dewormingFourSixYear" ||
        name === "dewormingFiveYear" ? (
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

  //   <Grid container columnSpacing={2}>
  //     <Grid item xs={4}>
  //       {renderTextField("Name", "fullName", editedChild.fullName)}

  //       {isEditing ? (
  //         // Render the gender field only when editing
  //         <Box mt="10px">
  //           <FormControl fullWidth>
  //             <InputLabel id="gender-select-label">Sex</InputLabel>
  //             <Select
  //               labelId="gender-select-label"
  //               label="Sex"
  //               id="gender-select"
  //               name="gender"
  //               value={editedChild.gender}
  //               onChange={handleInputChange}
  //             >
  //               <MenuItem value="Male">Male</MenuItem>
  //               <MenuItem value="Female">Female</MenuItem>
  //             </Select>
  //           </FormControl>
  //         </Box>
  //       ) : (
  //         // Display gender information when not editing
  //         <Grid item xs={12}>
  //           <Box>
  //             <Box padding="10px" borderRadius="5px" border="1px solid grey">
  //               <Typography variant="h6">Sex</Typography>
  //               <Typography variant="body1" style={{ fontWeight: "bold" }}>
  //                 {editedChild.gender}
  //               </Typography>
  //             </Box>
  //           </Box>
  //         </Grid>
  //       )}
  //     </Grid>
  //     <Grid item xs={4}>
  //       {renderTextField("Date of Birth", "birthdate", editedChild.birthdate)}
  //     </Grid>
  //     <Grid item xs={4}>
  //       {!isEditing &&
  //         renderTextField(
  //           "Age in Months",
  //           "aim",
  //           editedChild.aim,
  //           "Months old"
  //         )}
  //     </Grid>
  //   </Grid>
  // );
  const isChildMoreThan12Months = editedChild.aim > 12;

  // const renderReport = () => {
  //   const selectedChildData = frequentStatuses[childId];

  //   console.log("Frequent Statuses:", frequentStatuses);
  //   console.log("Selected Child Data:", selectedChildData);
  //   console.log("Selected Child ID:", childId);
  //   if (!selectedChildData || Object.keys(selectedChildData).length === 0) {
  //     return (
  //       <div>
  //         <Typography variant="h6">Child {childId}</Typography>
  //         <div>No frequent data available for the selected child</div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div>
  //       <Typography variant="h6">Child {childId}</Typography>
  //       <Grid container spacing={2}>
  //         {Object.entries(selectedChildData).map(([year, statuses]) => (
  //           <Grid item key={`status-${selectedChildId}-${year}`}>
  //             <Grid container direction="column" style={{ marginLeft: "20px" }}>
  //               <Typography variant="subtitle1">{year}</Typography>
  //               <Typography>
  //                 {statuses.weight_for_age
  //                   ? `WFA: ${statuses.weight_for_age}`
  //                   : "No data available"}
  //               </Typography>
  //               <Typography>
  //                 {statuses.length_for_age
  //                   ? `LFA: ${statuses.length_for_age}`
  //                   : "No data available"}
  //               </Typography>
  //               <Typography>
  //                 {statuses.weight_for_length
  //                   ? `WFL: ${statuses.weight_for_length}`
  //                   : "No data available"}
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </div>
  //   );
  // };

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
            icon={<Vaccines />}
            label="Intakes"
            value="intakes"
            sx={(theme) => ({
              backgroundColor:
                selectedView === "intakes"
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
          <Tab
            icon={<Home />}
            label="Address"
            value="address"
            sx={(theme) => ({
              backgroundColor:
                selectedView === "address"
                  ? theme.palette.mode === "light"
                    ? colors.blueAccent[700]
                    : colors.blueAccent[700]
                  : undefined,
              borderRadius: "20px 20px 0 0",
            })}
          />
          {/* <Tab
            icon={<Assessment />}
            label="Report"
            value="report"
            sx={(theme) => ({
              backgroundColor:
                selectedView === "report"
                  ? theme.palette.mode === "light"
                    ? colors.blueAccent[700]
                    : colors.blueAccent[700]
                  : undefined,
              borderRadius: "20px 20px 0 0",
            })}
          /> */}
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

      {selectedView === "child" ? (
        <ChildInfo
          renderTextField={renderTextField}
          isEditing={isEditing}
          editedChild={editedChild}
          handleInputChange={handleInputChange}
        />
      ) : selectedView === "parent" ? (
        <CaregiverInfo
          renderTextField={renderTextField}
          isEditing={isEditing}
          editedChild={editedChild}
          handleInputChange={handleInputChange}
        />
      ) : selectedView === "intakes" ? (
        <IntakesInfo
          renderTextField={renderTextField}
          isEditing={isEditing}
          editedChild={editedChild}
          handleInputChange={handleInputChange}
        />
      ) : selectedView === "health" ? (
        <HealthInfo
          renderTextField={renderTextField}
          isEditing={isEditing}
          editedChild={editedChild}
          handleInputChange={handleInputChange}
        />
      ) : (
        <AddressInfo
          renderTextField={renderTextField}
          isEditing={isEditing}
          editedChild={editedChild}
          handleInputChange={handleInputChange}
        />
      )}

      {/* {selectedView === "child"
        ? renderChildInfo()
        : selectedView === "parent"
        ? renderParentInformation()
        : selectedView === "health"
        ? renderHealthInfo()
        : renderReport()} */}

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
          Inputed Date Doesnt Match the selected Quarter or Year
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ChildProfile;
