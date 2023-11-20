import React, { useState, useEffect, useCallback } from "react";

import TextInput from "./formComponents/TextInput";
import DateInput from "./formComponents/DateInput";
import MenuSelect from "./formComponents/MenuSelect";
import MenuInput from "./formComponents/MenuInput";

import ethnicityOptions from "./ethnicityOptions";
import barangayOptions from "./barangayOptions";

import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBirthdate, setSelectedBirthdate] = useState(null);
  // const [selectedVaccinationDate, setSelectedVaccinationDate] = useState(null);
  const [selectedDOW, setSelectedDOW] = useState(null);
  const [selectedDewormingDate1, setselectedDewormingDate1] = useState(null);
  const [selectedDewormingDate2, setselectedDewormingDate2] = useState(null);
  const notify = () => toast.success("Child Data added successfully!");
  const [existingEntries, setExistingEntries] = useState([]);

  const handleDateChange = (name, date, dateType) => {
    const formattedDate = date ? dayjs(date).format("MM/DD/YYYY") : null;
    if (dateType === "birthdate") {
      setSelectedBirthdate(formattedDate);
    }
    // else if (dateType === "vaccination") {
    //   setSelectedVaccinationDate(formattedDate);
    // }
    else if (dateType === "dow") {
      setSelectedDOW(formattedDate);
    } else if (dateType === "deworming") {
      setselectedDewormingDate1(formattedDate);
    } else if (dateType === "deworming2") {
      setselectedDewormingDate2(formattedDate);
    } else if (dateType === "current_date") {
      setSelectedCurrentDate(formattedDate);
    }
    setSelectedDate(formattedDate);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    const isDuplicate = existingEntries.some(
      (entry) =>
        // entry.fullName === values.fullName &&
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
    const formattedDewormingDate1 = selectedDewormingDate1
      ? dayjs(selectedDewormingDate1).format("YYYY-MM-DD")
      : null;
    const formattedDewormingDate2 = selectedDewormingDate2
      ? dayjs(selectedDewormingDate2).format("YYYY-MM-DD")
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
      deworming: formattedDewormingDate1,
      bpe: values.bpe,
      disability: values.disability,
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
        if (response.ok) {
          // Both primary child and quarter data saved successfully
          notify();
          resetForm();
          setSelectedBirthdate(null);
          setSelectedDOW(null);
          // setSelectedVaccinationDate(null);
          setselectedDewormingDate1(null);
          setselectedDewormingDate2(null);
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

      // Show success notivacation
      toast.success("Form cleared successfully!", {
        position: "top-right",
        autoClose: 3000, // Notivacation will automatically close after 3000 milliseconds (3 seconds)
      });
    }
  }, []);

  return (
    <Box m="20px">
      <Header subtitle="Child Information" />
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
              {/*Personal Information*/}
              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Full Name (Surname, Firstname)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                // Add any other props that your TextInput component requires
                // For example, you might need to pass classes like this:
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />

              <DateInput
                label="Birthdate"
                name="birthdate"
                value={selectedBirthdate}
                onChange={(name, date) =>
                  handleDateChange(name, date, "birthdate")
                }
                error={!!touched.birthdate && !!errors.birthdate}
                helperText={touched.birthdate && errors.birthdate}
                className="dateInput" // You can add custom CSS classes if needed
                sx={{ gridColumn: "span 1" }}
                selectedDate={selectedDate} // Pass the selectedDate prop here
                required={true} // Set required to true for this DateInput
              />
              <MenuSelect
                label="Sex"
                name="gender"
                value={values.gender}
                onChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                options={[
                  { value: "", label: "Select", isDisabled: true }, // Add a null option
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                sx={{ gridColumn: "span 1" }}
              />
              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              <MenuInput
                label="Barangay"
                name="barangay"
                value={values.barangay}
                onChange={(name, value) => setFieldValue(name, value)}
                error={!!touched.barangay && !!errors.barangay}
                helperText={touched.barangay && errors.barangay}
                options={barangayOptions}
                sx={{ gridColumn: "span 1" }}
              />
              <MenuSelect
                label="Permanent or Transient"
                name="pt"
                value={values.pt}
                onChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                error={!!touched.pt && !!errors.pt}
                helperText={touched.pt && errors.pt}
                options={[
                  { value: "", label: "Select", isDisabled: true }, // Add a null option
                  { value: "Permanent", label: "Permanent" },
                  { value: "Transient", label: "Transient" },
                ]}
                sx={{ gridColumn: "span 1" }}
              />
              {/* Caregiver/Guradian Information */}
              <Box sx={{ gridColumn: "span 4" }}>
                <Header subtitle="Caregiver Information" />
              </Box>
              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Caregiver Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.parentName}
                name="parentName"
                error={!!touched.parentName && !!errors.parentName}
                helperText={touched.parentName && errors.parentName}
                // Add any other props that your TextInput component requires
                // For example, you might need to pass classes like this:
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              {/* <MenuSelect
                label="Relationship"
                name="relationship"
                value={values.relationship}
                onChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                error={!!touched.relationship && !!errors.relationship}
                helperText={touched.relationship && errors.relationship}
                options={[
                  { value: "", label: "Select", isDisabled: true }, // Add a null option
                  { value: "Mother", label: "Mother" },
                  { value: "Father", label: "Father" },
                  { value: "Guardian", label: "Guardian" },
                ]}
                sx={{ gridColumn: "span 1" }}
              /> */}
              {/* <MenuInput
                label="Ethnicity"
                name="ethnicity"
                value={values.ethnicity}
                onChange={(name, value) => setFieldValue(name, value)}
                error={!!touched.ethnicity && !!errors.ethnicity}
                helperText={touched.ethnicity && errors.ethnicity}
                options={ethnicityOptions}
                sx={{ gridColumn: "span 1" }}
              /> */}
              {/* <MenuInput
                label="Ethnicity"
                name="ethnicity"
                value={values.ethnicity}
                onChange={(name, value) => {
                  // If "Others" is selected, set a different field value
                  if (value === 'Others') {
                    setFieldValue('customEthnicity', ''); // You may want to clear any previous value
                  }
                  setFieldValue(name, value);
                }}
                error={!!touched.ethnicity && !!errors.ethnicity}
                helperText={touched.ethnicity && errors.ethnicity}
                options={ethnicityOptions}
                sx={{ gridColumn: 'span 1' }}
              />

              {values.ethnicity === 'Others' && (
                <TextInput
                  label="Custom Ethnicity"
                  name="customEthnicity"
                  value={values.customEthnicity}
                  onChange={(e) => setFieldValue('customEthnicity', e.target.value)}
                  sx={{ gridColumn: 'span 1' }}
                />
              )}               */}
              <TextInput
                fullWidth
                id="ethnicity"
                name="ethnicity"
                label="Ethnicity"
                value={values.ethnicity}
                onChange={(e) => setFieldValue("ethnicity", e.target.value)}
                error={!!touched.ethnicity && !!errors.ethnicity}
                helperText={touched.ethnicity && errors.ethnicity}
                sx={{ gridColumn: "span 1" }}
                variant="outlined"
              />
              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={!!touched.occupation && !!errors.occupation}
                helperText={touched.occupation && errors.occupation}
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <Header subtitle="Child Health Information" />
              </Box>
              <DateInput
                label="Date of Weighing"
                name="dow"
                value={selectedDOW}
                onChange={(name, date) => handleDateChange(name, date, "dow")}
                error={!!touched.dow && !!errors.dow}
                helperText={touched.dow && errors.dow}
                className="dateInput" // You can add custom CSS classes if needed
                sx={{ gridColumn: "span 1" }}
                selectedDate={selectedDate} // Pass the selectedDate prop here
                required={true} // Set required to true for this DateInput
              />
              <TextInput
                fullWidth
                variant="filled"
                type="number"
                label="Weight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              <TextInput
                fullWidth
                variant="filled"
                type="number"
                label="Height"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.height}
                name="height"
                error={!!touched.height && !!errors.height}
                helperText={touched.height && errors.height}
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              <TextInput
                fullWidth
                variant="filled"
                type="number"
                label="Mid-Upper Arm Circumference"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.muac}
                name="muac"
                error={!!touched.muac && !!errors.muac}
                helperText={touched.muac && errors.muac}
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              <MenuSelect
                label="Bilateral Pitting Edema"
                name="bpe"
                value={values.bpe}
                onChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                error={!!touched.bpe && !!errors.bpe}
                helperText={touched.bpe && errors.bpe}
                options={[
                  { value: "", label: "Select", isDisabled: true }, // Add a null option
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                sx={{ gridColumn: "span 1" }}
              />
              <TextInput
                fullWidth
                variant="filled"
                type="disability"
                label="Disability"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.disability}
                name="disability"
                error={!!touched.disability && !!errors.disability}
                helperText={touched.disability && errors.disability}
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              {/* <DateInput
                label="Vaccination"
                name="vac"
                value={selectedVaccinationDate}
                onChange={(name, date) =>
                  handleDateChange(name, date, "vaccination")
                }
                error={!!touched.vac && !!errors.vac}
                helperText={touched.vac && errors.vac}
                className="dateInput" // You can add custom CSS classes if needed
                sx={{ gridColumn: "span 1" }}
                selectedDate={selectedDate} // Pass the selectedDate prop here
              /> */}
              <MenuSelect
                label="Vaccination"
                name="vac"
                value={values.vac}
                onChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                error={!!touched.vac && !!errors.vac}
                helperText={touched.vac && errors.vac}
                options={[
                  { value: "", label: "Select", isDisabled: true }, // Add a null option
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                sx={{ gridColumn: "span 1" }}
              />
              <MenuSelect
                label="Deworming"
                name="deworming"
                value={values.deworming}
                onChange={(name, value) => {
                  setFieldValue(name, value);
                }}
                error={!!touched.deworming && !!errors.deworming}
                helperText={touched.deworming && errors.deworming}
                options={[
                  { value: "", label: "Select", isDisabled: true }, // Add a null option
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                sx={{ gridColumn: "span 1" }}
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
  fullName: yup
    .string()
    .required("Required")
    .matches(
      /^[A-Za-z\s]{2,16},[A-Za-z\s]{2,16}$/, // Add a comma between two name parts
      "Should be in the format 'Last Name, First Name'"
    ),
  gender: yup.string().required("Sex is required"),
  // relationship: yup.string().required("Relationship is required"),
  ethnicity: yup.string().notRequired(),
  address: yup
  .string()
  .required("required")
  .matches(
    /^[A-Za-z\d\s\-]{2,50}$/, 
    "Should contain only 2-50 letters, numbers, spaces, or dashes"
  ),
  pt: yup.string().required("Required"),
  parentName: yup
    .string()
    .required("Required")
    .matches(
      /^[A-Za-z\s]{2,16}$/,
      "Should contain only 2-16 letters (no special characters)"
    ),
  occupation: yup
    .string()
    .notRequired()
    .matches(
      /^[A-Za-z\s]{2,16}$/,
      "Should contain only 2-16 letters (no special characters)"
    ),
  weight: yup
    .number()
    .required("Required")
    .typeError("Weight must be a number"),
  height: yup
    .number()
    .required("Required")
    .typeError("Height must be a number"),
  muac: yup.number().typeError("MUAC must be a number"),
  bpe: yup.string().notRequired(),
  disability: yup.string().notRequired(),
});

const initialValues = {
  fullName: "",
  gender: "", // Add the "gender" field with an initial empty value
  //     birthdate: null,
  address: "",
  pt: "",
  bpe: "",
  disability: "",
  parentName: "",
  occupation: "",
  // relationship: "",
  ethnicity: "",
  dow: "",
  weight: "",
  height: "",
  muac: "",
  barangay: "",
};

export default Form;
