import TextInput from "./formComponents/TextInput";
import DateInput from "./formComponents/DateInput";
import MenuSelect from "./formComponents/MenuSelect";
import MenuInput from "./formComponents/MenuInput";

import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"; // Import Axios
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ethnicityOptions from "./ethnicityOptions"; // Adjust the path as needed
import barangayOptions from "./barangayOptions";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBirthdate, setSelectedBirthdate] = useState(null);
  const [selectedVaccinationDate, setSelectedVaccinationDate] = useState(null);
  const [selectedCurrentDate, setSelectedCurrentDate] = useState(null);
  const [selectedDOW, setSelectedDOW] = useState(null);
  const [selectedPurgaDate, setSelectedPurgaDate] = useState(null);
  const notify = () => toast.success("Data added successfully!");

  const handleDateChange = (name, date, dateType) => {
    const formattedDate = date ? dayjs(date).format("MM/DD/YYYY") : null;
    if (dateType === "birthdate") {
      setSelectedBirthdate(formattedDate);
    } else if (dateType === "vaccination") {
      setSelectedVaccinationDate(formattedDate);
    } else if (dateType === "dow") {
      setSelectedDOW(formattedDate);
    } else if (dateType === "purga") {
      setSelectedPurgaDate(formattedDate);
    } else if (dateType === "current_date") {
      setSelectedCurrentDate(formattedDate);
    }
    setSelectedDate(formattedDate);
  };
  const [names, setNames] = useState([]);
  const fetchNames = () => {
    axios
      .get("http://127.0.0.1:8000/forms/") // Replace with your API endpoint
      .then((response) => {
        // Assuming the API response is an array of objects with 'first_name', 'middle_name', and 'last_name' fields
        const retrievedNames = response.data.map((item) => {
          return {
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            address: item.address,
            pt: item.pt,
            gender: item.gender,
            birthdate: item.birthdate,
            bpe: item.bpe,
            disability: item.disability,
            parentName: item.parentName,
            relationship: item.relationship,
            occupation: item.occupation,
            ethnicity: item.ethnicity,
            dow: item.dow,
            weight: item.weight,
            height: item.height,
            muac: item.muac,
            purga: item.purga,
            vac: item.vac,
            current_date: item.current_date,
            barangay: item.barangay,
          };
        });
        setNames(retrievedNames);
      })
      .catch((error) => {
        console.error("Error fetching names data:", error);
      });
  };

  useEffect(() => {
    fetchNames();
  }, []);
  const handleChange = (field, value) => {
    // For other fields, use setFieldValue normally
    setFieldValue(field, value);
    // }
  };
  const handleFormSubmit = (values, { resetForm }, required) => {
    // Format the birthdate using dayjs
    // Check if the date field is empty
    // Check if the birthdate field is empty (required)
    if (!selectedBirthdate && required) {
      alert("Birthdate is required");
      return;
    }
    if (!selectedDOW && required) {
      alert("Date of Weighing is required");
      return;
    }

    // Set the vaccination field to null if selectedVaccinationDate is null, let the database accept null value since its optional
    const vaccinationDate = selectedVaccinationDate
      ? dayjs(selectedVaccinationDate).format("YYYY-MM-DD")
      : null;
    const purgaDate = selectedPurgaDate
      ? dayjs(selectedPurgaDate).format("YYYY-MM-DD")
      : null;
    const formattedBirthdate = dayjs(selectedDate).format("YYYY-MM-DD");

    const formattedDow = dayjs(selectedDOW).format("YYYY-MM-DD");
    // const formattedPurga = dayjs(values.purga).format('YYYY-MM-DD');
    // const formattedVac = dayjs(values.vac).format('YYYY-MM-DD');
    const confirmed = window.confirm("Are you sure you want to submit?");
    if (confirmed) {
      axios
        .post("http://127.0.0.1:8000/forms/", {
          ...values,
          birthdate: formattedBirthdate,
          dow: formattedDow,
          purga: purgaDate,
          vac: vaccinationDate,
        })
        .then((response) => {
          console.log(
            "Data successfully added to the database:",
            response.data
          );
          // Optionally, you can reset the form after successful submission
          resetForm();

          setSelectedBirthdate(null);
          setSelectedDOW(null);
          setSelectedPurgaDate(null);
          setSelectedVaccinationDate(null);
          setSelectedDate(null);
          // Show notification
          notify();
          // Additional notification for child added
          toast.success("Child added successfully!");
        })
        .catch((error) => {
          console.error("Error adding data to the database:", error);
          console.log("Full error response:", error.response);
        });
    }
  };
  const handleClearForm = useCallback((resetForm, values, setFieldValue) => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the form?"
    );
    if (confirmed) {
      resetForm();
      setSelectedDate(null); // Clear the selected date
      setSelectedBirthdate(null); // Clear the selected birthdate
      setSelectedVaccinationDate(null); // Clear the selected vaccination date
      setSelectedDOW(null); // Clear the selected vaccination date
      setSelectedPurgaDate(null);

      // Show success notification
      toast.success("Form cleared successfully!", {
        position: "top-right",
        autoClose: 3000, // Notification will automatically close after 3000 milliseconds (3 seconds)
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                // Add any other props that your TextInput component requires
                // For example, you might need to pass classes like this:
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />
              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                // Add any other props that your TextInput component requires
                // For example, you might need to pass classes like this:
                className="textInput"
                sx={{ gridColumn: "span 1" }}
              />

              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
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
                label="Gender"
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
              {/* Parent/Guradian Information */}
              <Box sx={{ gridColumn: "span 4" }}>
                <Header subtitle="Parent/Guradian Information" />
              </Box>
              <TextInput
                fullWidth
                variant="filled"
                type="text"
                label="Parent Name"
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
              <MenuSelect
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
              />
              <MenuInput
                label="Ethnicity"
                name="ethnicity"
                value={values.ethnicity}
                onChange={(name, value) => setFieldValue(name, value)}
                error={!!touched.ethnicity && !!errors.ethnicity}
                helperText={touched.ethnicity && errors.ethnicity}
                options={ethnicityOptions}
                sx={{ gridColumn: "span 1" }}
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
              <DateInput
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
              />
              <DateInput
                label="Purga"
                name="purga"
                value={selectedPurgaDate}
                onChange={(name, date) => handleDateChange(name, date, "purga")}
                error={!!touched.purga && !!errors.purga}
                helperText={touched.purga && errors.purga}
                className="dateInput" // You can add custom CSS classes if needed
                sx={{ gridColumn: "span 1" }}
                selectedDate={selectedDate} // Pass the selectedDate prop here
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
  firstName: yup
    .string()
    .required("Required")
    .matches(
      /^[A-Za-z\s]{2,16}$/,
      "Should contain only 2-16 letters (no special characters)"
    ),
  middleName: yup
    .string()
    .required("required")
    .matches(
      /^[A-Za-z\s]{1,16}$/,
      "Should contain only 1-16 letters (no special characters)"
    ),
  lastName: yup
    .string()
    .required("required")
    .matches(
      /^[A-Za-z\s]{2,16}$/,
      "Should contain only 2-16 letters (no special characters)"
    ),
  gender: yup.string().required("Gender is required"),
  relationship: yup.string().required("Relationship is required"),
  ethnicity: yup.string().required("Ethnicity is required"),
  address: yup
    .string()
    .required("required")
    .matches(
      /^[A-Za-z\s0-9]{2,50}$/,
      "Should contain only 2-20 letters (no special characters)"
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
    .required("Required")
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
  muac: yup.number().required("Required").typeError("MUAC must be a number"),
  bpe: yup.string().required("BPE is required"),
  disability: yup.string().notRequired(),
});

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "", // Add the "gender" field with an initial empty value
  //     birthdate: null,
  address: "",
  pt: "",
  bpe: "",
  disability: "",
  parentName: "",
  occupation: "",
  relationship: "",
  ethnicity: "",
  dow: "",
  weight: "",
  height: "",
  muac: "",
  //     vac: null,
  //     purga: null,
};

export default Form;
