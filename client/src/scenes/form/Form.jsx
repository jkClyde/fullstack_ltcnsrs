import React, { useState, useEffect, useCallback } from "react";

import lengthForAgeStatus from "../Database/Calculations/lengthForAgeStatus";
import weightForAgeStatus from "../Database/Calculations/weightForAgeStatus";
import weightForLengthStatus from "../Database/Calculations/weightForLengthStatus";
import { calculateAgeInMonths } from "../Database/Calculations/calculateAgeInMonths";

import ChildInformation from "./formModules/ChildInformation";
import CaregiverInformation from "./formModules/CaregiverInformation";
import ChildHealthInformation from "./formModules/ChildHealthInformation";

import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard_components/Header";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import databaseURL from "../../databaseURL";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBirthdate, setSelectedBirthdate] = useState(null);
  const [selectedDOW, setSelectedDOW] = useState(null);
  const [selectedVitAOneHTIU, setSelectedVitAOneHTIU] = useState(null);
  const [selectedVitATwoHTIUOneYear, setSelectedVitATwoHTIUOneYear] =
    useState(null);
  const [selectedVitATwoHTIUOneSixYear, setSelectedVitATwoHTIUOneSixYear] =
    useState(null);
  const [selectedVitATwoHTIUTwoYear, setSelectedVitATwoHTIUTwoYear] =
    useState(null);
  const [selectedVitATwoHTIUTwoSixYear, setSelectedVitATwoHTIUTwoSixYear] =
    useState(null);
  const [selectedVitATwoHTIUThreeYear, setSelectedVitATwoHTIUThreeYear] =
    useState(null);
  const [selectedVitATwoHTIUThreeSixYear, setSelectedVitATwoHTIUThreeSixYear] =
    useState(null);
  const [selectedVitATwoHTIUFourYear, setSelectedVitATwoHTIUFourYear] =
    useState(null);
  const [selectedVitATwoHTIUFourSixYear, setSelectedVitATwoHTIUFourSixYear] =
    useState(null);
  const [selectedVitATwoHTIUFiveYear, setSelectedVitATwoHTIUFiveYear] =
    useState(null);

  const [selectedDewormingOneYear, setSelectedDewormingOneYear] =
    useState(null);
  const [selectedDewormingOneSixYear, setSelectedDewormingOneSixYear] =
    useState(null);
  const [selectedDewormingTwoYear, setSelectedDewormingTwoYear] =
    useState(null);
  const [selectedDewormingTwoSixYear, setSelectedDewormingTwoSixYear] =
    useState(null);
  const [selectedDewormingThreeYear, setSelectedDewormingThreeYear] =
    useState(null);
  const [selectedDewormingThreeSixYear, setSelectedDewormingThreeSixYear] =
    useState(null);
  const [selectedDewormingFourYear, setSelectedDewormingFourYear] =
    useState(null);
  const [selectedDewormingFourSixYear, setSelectedDewormingFourSixYear] =
    useState(null);
  const [selectedDewormingFiveYear, setSelectedDewormingFiveYear] =
    useState(null);

  const notify = () => toast.success("Child Data added successfully!");
  const [existingEntries, setExistingEntries] = useState([]);
  const [ageInMonths, setAgeInMonths] = useState(null);
  useEffect(() => {
    // Calculate age in months when the birthdate changes
    if (selectedBirthdate) {
      const calculatedAge = calculateAgeInMonths(selectedBirthdate);
      setAgeInMonths(calculatedAge);
    }
  }, [selectedBirthdate]);

  const handleDateChange = (name, date, dateType) => {
    const formattedDate = date ? dayjs(date).format("MM/DD/YYYY") : null;
    if (dateType === "birthdate") {
      setSelectedBirthdate(formattedDate);
    } else if (dateType === "dow") {
      setSelectedDOW(formattedDate);
    } else if (dateType === "vitAOneHTIU") {
      setSelectedVitAOneHTIU(formattedDate);
    } else if (dateType === "vitATwoHTIUOneYear") {
      setSelectedVitATwoHTIUOneYear(formattedDate);
    } else if (dateType === "vitATwoHTIUOneSixYear") {
      setSelectedVitATwoHTIUOneSixYear(formattedDate);
    } else if (dateType === "vitATwoHTIUTwoYear") {
      setSelectedVitATwoHTIUTwoYear(formattedDate);
    } else if (dateType === "vitATwoHTIUTwoSixYear") {
      setSelectedVitATwoHTIUTwoSixYear(formattedDate);
    } else if (dateType === "vitATwoHTIUThreeYear") {
      setSelectedVitATwoHTIUThreeYear(formattedDate);
    } else if (dateType === "vitATwoHTIUThreeSixYear") {
      setSelectedVitATwoHTIUThreeSixYear(formattedDate);
    } else if (dateType === "vitATwoHTIUFourYear") {
      setSelectedVitATwoHTIUFourYear(formattedDate);
    } else if (dateType === "vitATwoHTIUFourSixYear") {
      setSelectedVitATwoHTIUFourSixYear(formattedDate);
    } else if (dateType === "vitATwoHTIUFiveYear") {
      setSelectedVitATwoHTIUFiveYear(formattedDate);
    } else if (dateType === "dewormingOneYear") {
      setSelectedDewormingOneYear(formattedDate);
    } else if (dateType === "dewormingOneSixYear") {
      setSelectedDewormingOneSixYear(formattedDate);
    } else if (dateType === "dewormingTwoYear") {
      setSelectedDewormingTwoYear(formattedDate);
    } else if (dateType === "dewormingTwoSixYear") {
      setSelectedDewormingTwoSixYear(formattedDate);
    } else if (dateType === "dewormingThreeYear") {
      setSelectedDewormingThreeYear(formattedDate);
    } else if (dateType === "dewormingThreeSixYear") {
      setSelectedDewormingThreeSixYear(formattedDate);
    } else if (dateType === "dewormingFourYear") {
      setSelectedDewormingFourYear(formattedDate);
    } else if (dateType === "dewormingFourSixYear") {
      setSelectedDewormingFourSixYear(formattedDate);
    } else if (dateType === "dewormingFiveYear") {
      setSelectedDewormingFiveYear(formattedDate);
    }
  };

  const handleFormSubmit = (values, { resetForm }) => {
    const isDuplicate = existingEntries.some(
      (entry) =>
        dayjs(entry.birthdate).format("YYYY-MM-DD") ===
        dayjs(selectedBirthdate).format("YYYY-MM-DD")
    );

    if (isDuplicate) {
      alert("Duplicate entry found: This child already exists.");
      return;
    }

    if (!selectedBirthdate || !selectedDOW) {
      alert("Birthdate and Date of Weighing are required");
      return;
    }
    const formattedBirthdate = dayjs(selectedBirthdate).format("YYYY-MM-DD");
    const formattedDOW = selectedDOW
      ? dayjs(selectedDOW).format("YYYY-MM-DD")
      : null;

    const dowDate = new Date(selectedDOW);
    let quarter;

    if (dowDate.getMonth() >= 0 && dowDate.getMonth() <= 2) {
      // First quarter (January to March)
      quarter = "first";
    } else if (dowDate.getMonth() >= 3 && dowDate.getMonth() <= 5) {
      // Second quarter (April to June)
      quarter = "second";
    } else if (dowDate.getMonth() >= 6 && dowDate.getMonth() <= 8) {
      // Third quarter (July to September)
      quarter = "third";
    } else {
      // Fourth quarter (October to December)
      quarter = "fourth";
    }

    setExistingEntries([
      ...existingEntries,
      {
        fullName: values.fullName,
        birthdate: formattedBirthdate,
      },
    ]);
    // Create a data object to send to your Django backend for saving in the appropriate quarter table
    const quarterData = {
      dow: formattedDOW,
      weight: values.weight,
      height: values.height,
      muac: values.muac,
      vac: values.vac,
      deworming: values.deworming,
      bpe: values.bpe,
      disability: values.disability,
      weightForAge: weightForAgeStatus(
        formattedBirthdate,
        values.weight,
        values.gender
      ),
      lengthForAge: lengthForAgeStatus(
        formattedBirthdate,
        values.height,
        values.gender
      ),
      weightForLength: weightForLengthStatus(
        formattedBirthdate,
        values.height,
        values.weight,
        values.gender
      ),
    };

    // Create a data object for saving in the PrimaryChild table
    const primaryChildData = {
      fullName: values.fullName,
      address: values.address,
      pt: values.pt,
      gender: values.gender,
      birthdate: formattedBirthdate,
      parentName: values.parentName,
      occupation: values.occupation,
      // relationship: values.relationship,
      ethnicity: values.ethnicity,
      barangay: values.barangay,
    };

    // Make an API call to your Django backend to save data in the PrimaryChild table
    fetch("http://127.0.0.1:8000/primarychild/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(primaryChildData),
    })
      .then((response) => response.json()) // Parse the response to get the new PrimaryChild instance
      .then((primaryChildResponse) => {
        if (!primaryChildResponse.id) {
          throw new Error("Failed to save primary child data.");
        }

        const childId = primaryChildResponse.id; // Get the generated child_id

        // Update the quarterData object to include the child_id
        const updatedQuarterData = {
          ...quarterData,
          child: childId,
        };

        // Make an API call to save data in the appropriate quarter table
        return fetch(`http://127.0.0.1:8000/childhealthinfo/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuarterData),
        });
      })
      .then((response) => {
        //------------------------------------------------------------------------------------------
        const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
        fetch(`${databaseURL}/auth/users/me/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken.data.access}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const auditCreatePayload = {
              user: data.first_name + " " + data.last_name, // Assuming you want to send the user data as part of the payload
              action: "Create a new Data using forms ", // Replace 'your_action_here' with the actual action
            };
            fetch(`${databaseURL}/audit/`, {
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

        if (response.ok) {
          // Both primary child and quarter data saved successfully
          notify();
          resetForm();
          setSelectedBirthdate(null);
          setSelectedDOW(null);
          setSelectedDate(null);
        } else {
          alert("Failed to save quarter data.");
        }
      })
      .catch((error) => {
        console.error("Error while making the API call:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const handleClearForm = useCallback((resetForm, values, setFieldValue) => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the form?"
    );
    if (confirmed) {
      resetForm();
      setSelectedDate(null);
      setSelectedBirthdate(null);
      // setSelectedVaccinationDate(null);
      setSelectedDOW(null);
      setselectedDewormingDate1(null);
      setselectedDewormingDate2(null);

      // Show success notification
      toast.success("Form cleared successfully!", {
        position: "top-right",
        autoClose: 3000, // Notification will automatically close after 3000 milliseconds (3 seconds)
      });
    }
  }, []);

  return (
    <Box m="20px">
      <Header title="Child Information" />
      <Formik
        onSubmit={(values, { resetForm }) =>
          handleFormSubmit(values, { resetForm }, true)
        } // Pass required as true
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
          setFieldValue, // Access the resetForm function from Formik context
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <ChildInformation
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                isNonMobile={isNonMobile}
                handleDateChange={handleDateChange}
                selectedBirthdate={selectedBirthdate}
                selectedDate={selectedDate}
              />
              {/* Caregiver/Guradian Information */}
              <Box sx={{ gridColumn: "span 4" }}>
                <Header title="Caregiver Information" />
              </Box>
              <CaregiverInformation
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                isNonMobile={isNonMobile}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <Header title="Child Health Information" />
              </Box>
              <ChildHealthInformation
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                isNonMobile={isNonMobile}
                handleDateChange={handleDateChange}
                selectedDOW={selectedDOW}
                selectedDate={selectedDate}
                ageInMonths={ageInMonths}
                selectedVitAOneHTIU={selectedVitAOneHTIU}
                selectedVitATwoHTIUOneYear={selectedVitATwoHTIUOneYear}
                selectedVitATwoHTIUOneSixYear={selectedVitATwoHTIUOneSixYear}
                selectedVitATwoHTIUTwoYear={selectedVitATwoHTIUTwoYear}
                selectedVitATwoHTIUTwoSixYear={selectedVitATwoHTIUTwoSixYear}
                selectedVitATwoHTIUThreeYear={selectedVitATwoHTIUThreeYear}
                selectedVitATwoHTIUThreeSixYear={
                  selectedVitATwoHTIUThreeSixYear
                }
                selectedVitATwoHTIUFourYear={selectedVitATwoHTIUFourYear}
                selectedVitATwoHTIUFourSixYear={selectedVitATwoHTIUFourSixYear}
                selectedVitATwoHTIUFiveYear={selectedVitATwoHTIUFiveYear}
                selectedDewormingOneYear={selectedDewormingOneYear}
                selectedDewormingOneSixYear={selectedDewormingOneSixYear}
                selectedDewormingTwoYear={selectedDewormingTwoYear}
                selectedDewormingTwoSixYear={selectedDewormingTwoSixYear}
                selectedDewormingThreeYear={selectedDewormingThreeYear}
                selectedDewormingThreeSixYear={selectedDewormingThreeSixYear}
                selectedDewormingFourYear={selectedDewormingFourYear}
                selectedDewormingFourSixYear={selectedDewormingFourSixYear}
                selectedDewormingFiveYear={selectedDewormingFiveYear}
              />
            </Box>

            {/* Buttons  */}
            <Box display="flex" justifyContent="center" mt="20px" mb="200px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Child
              </Button>
              <Button
                type="button"
                color="warning"
                variant="contained"
                sx={{ ml: "10px" }}
                onClick={() =>
                  handleClearForm(resetForm, values, setFieldValue)
                }
              >
                Clear Form
              </Button>
            </Box>
            <ToastContainer position="top-right" autoClose={3000} />
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  surname: yup
    .string()
    .required("Required")
    .matches(
      /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
      "Special characters not allowed"
    ),
  firstname: yup
    .string()
    .required("Required")
    .matches(
      /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
      "Special characters not allowed"
    ),
  middlename: yup
    .string()
    .notRequired()
    .matches(
      /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
      "Special characters not allowed"
    ),
  suffix: yup
    .string()
    .matches(
      /^[A-Za-z\s.]{2,16}$/, // Allow letters (upper and lower case), spaces, and period
      "Only letters, spaces, and periods are allowed"
    )
    .notRequired(),
  gender: yup.string().required("Required"),
  birthWeight: yup
    .number()
    .notRequired()
    .typeError("Birth Weight must be a number"),
  birthOrder: yup.number("Birth Order must be a Number").notRequired(),
  houseNumberAndStreet: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\d\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,50}$/, ""),
  sitio: yup
    .string()
    .notRequired()
    .matches(
      /^[A-Za-z\s.]{2,50}$/,
      "Should contain only 2-20 letters (no special characters)"
    ),
  barangay: yup.string().required("Required"),
  pt: yup.string().notRequired(),
  lengthOfStay: yup.number().notRequired(),
  lengthOfStayType: yup.string().notRequired(),
  fatherSurname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "no special characters"),
  fatherFirstName: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "no special characters"),
  fatherMiddleName: yup
    .string()
    .notRequired()
    .matches(
      /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
      "Special characters not allowed"
    ),
  fatherSuffix: yup
    .string()
    .notRequired()
    .matches(
      /^[A-Za-z\s]{2,16}$/, // Only allow letters (upper and lower case) and spaces
      "Special characters not allowed"
    ),
  fatherAge: yup.number().required("Required").typeError("Must be a number"),
  fatherEthnicity: yup.string().required("Required"),
  fatherOccupation: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  fatherReligion: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  fatherContact: yup
    .number()
    .notRequired()
    .test("isTwelveDigits", "Must be an 12-digit number", (value) =>
      value ? /^[0-9]{12}$/.test(value) : true
    ),
  motherSurname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  motherFirstName: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  motherMiddleName: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  motherAge: yup.number().notRequired().typeError("Must be a number"),
  motherEthnicity: yup.string().notRequired(),
  motherOccupation: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  motherReligion: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  motherContact: yup
    .number()
    .notRequired()
    .test("isTwelveDigits", "Must be an 12-digit number", (value) =>
      value ? /^[0-9]{12}$/.test(value) : true
    ),
  caregiverSurname: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  caregiverFirstName: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  caregiverMiddleName: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  caregiverSuffix: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s.]{2,16}$/, "Special characters not allowed"),
  caregiverRelationship: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  caregiverAge: yup.number().notRequired(),
  caregiverOccupation: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  caregiverReligion: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  caregiverContact: yup
    .number()
    .notRequired()
    .test("isTwelveDigits", "Must be an 12-digit number", (value) =>
      value ? /^[0-9]{12}$/.test(value) : true
    ),

  weight: yup.number().required("Required").typeError("Must be a number"),
  height: yup.number().required("Required").typeError("Must be a number"),
  muac: yup.number().notRequired().typeError("Must be a number"),
  bpe: yup.string().notRequired(),
  disability: yup.string().notRequired(),
  otherDisability: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
  vac: yup.string().notRequired(),
  vaccinationRemarks: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z\s]{2,16}$/, "Special characters not allowed"),
});

const initialValues = {
  surname: "",
  firstname: "",
  middlename: "",
  suffix: "",
  gender: "",
  birthWeight: "",
  birthOrder: "",
  houseNumberAndStreet: "",
  sitio: "",
  barangay: "",
  pt: "",
  lengthOfStay: "",
  lengthOfStayType: "",
  fatherSurname: "",
  fatherFirstName: "",
  fatherMiddleName: "",
  fatherSuffix: "",
  fatherAge: "",
  fatherEthnicity: "",
  fatherOccupation: "",
  fatherReligion: "",
  fatherContact: "",
  motherSurname: "",
  motherFirstName: "",
  motherMiddleName: "",
  motherAge: "",
  motherEthnicity: "",
  motherOccupation: "",
  motherReligion: "",
  motherContact: "",
  caregiverSurname: "",
  caregiverFirstName: "",
  caregiverMiddleName: "",
  caregiverSuffix: "",
  caregiverRelationship: "",
  caregiverAge: "",
  caregiverOccupation: "",
  caregiverReligion: "",
  motherContact: "",
  weight: "",
  height: "",
  muac: "",
  bpe: "",
  disability: "",
  otherDisability: "",
  vac: "",
  vaccinationRemarks: "",
};

export default Form;
