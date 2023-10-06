
/* this is for date picker */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
/* this is for date picker */

import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik  } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"; // Import Axios
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [names, setNames] = useState([]);

  const fetchNames = () => {
    axios
      .get("http://127.0.0.1:8000/forms/")  // Replace with your API endpoint
      .then((response) => {
        // Assuming the API response is an array of objects with 'first_name', 'middle_name', and 'last_name' fields
        const retrievedNames = response.data.map((item) => {
          return {
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            address: item.address,
            temporary: item.temporary,
            gender: item.gender,
            birthdate: item.birthdate,
            bpe: item.bpe,
            disability: item.disability,
            father_name: item.father_name,
            father_occupation: item.father_occupation,
            father_ethnicity: item.father_ethnicity,
            mother_name: item.mother_name,
            mother_occupation: item.mother_occupation,
            mother_ethnicity: item.mother_ethnicity,
            dow: item.dow,
            weight: item.weight,
            height: item.height,
            midUpperArmCircumference: item.midUpperArmCircumference,
            purga: item.purga,
            vac: item.vac

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
    // Handle date fields separately
    if (field === "birthdate") {
      handleChange("birthdate")(value);
    } else if (field === "dow") {
      handleChange("dow")(value);
    }else if (field === "purga") {
      handleChange("purga")(value); 
    }else if (field === "vac") {
      handleChange("vac")(value); 
    }
    else {
      // For other fields, use the Formik handleChange normally
      handleChange(field)(value);
    }
  };
  const handleFormSubmit = (values, { resetForm }) => {
    // Format the birthdate using dayjs
    const formattedBirthdate = dayjs(values.birthdate).format('YYYY-MM-DD');
    const formattedDow = dayjs(values.dow).format('YYYY-MM-DD');
    const formattedPurga = dayjs(values.purga).format('YYYY-MM-DD');
    const formattedVac = dayjs(values.vac).format('YYYY-MM-DD');
    const confirmed = window.confirm("Are you sure you want to submit?");
    if (confirmed) {
      axios
        .post("http://127.0.0.1:8000/forms/", {
          ...values,
          birthdate: formattedBirthdate, // Replace the original birthdate with the formatted one
          dow: formattedDow,
          purga: formattedPurga,
          vac: formattedVac,
        })
        .then((response) => {
          console.log("Data successfully added to the database:", response.data);
          // Optionally, you can reset the form after successful submission
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding data to the database:", error);
          console.log("Full error response:", error.response);
        });
    }
  };
  
  
  
  const handleClearForm = (resetForm) => {
    const confirmed = window.confirm("Are you sure you want to clear the form?");
    if (confirmed) {
      resetForm();
    }
  };

  const ethnicityOptions =[
    'Aggay',
    'Akeanon/Aklanon',
    'Apayao/Yapayao',
    'Ayangan',
    'Balangao/Baliwon',
    'Bikol/Bicol',
    'Bisaya/Binisaya',
    'Bontok/Binontok',
    'Cebuano',
    'Hamtikanon',
    'Hiligaynon,Ilonggo',
    'Ibaloi/Inibaloi',
    'Ibanag',
    'Ibontoc',
    'Ifugao',
    'Kalanguya/Ikalahan',
    'Ilocano',
    'Iranon',
    'Itneg',
    'Kalinga',
    'Kankanai/Kankanaey',
    'Kapampangan',
    'Karao',
    'Kinalinga',
    'Kiniray-a',
    'Maranao',
    'Masbateno/Masbatean',
    'Pangasinan/Panggalato',
    'Surigaonon',
    'Tagalog',
    'Tausug',
    'Waray',
    'Other Local Ethnicity',
    'Chinese',
    'American/English',
    'Other Foreign Ethnicity',
    'Not Reported',
  ];

  

  return (
    <Box m="20px">
      <Header  subtitle="Child Information"/>
      <Formik
        onSubmit={handleFormSubmit}
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
          resetForm, // Access the resetForm function from Formik context

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
              {/*Full Name*/}
              <TextField
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
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Middle Initial"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
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
                sx={{ gridColumn: "span 1" }}
              />
                {/*Address*/}
              
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="House No./Bldg. No.,floor/room"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 1" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sitio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="barangay"
                error={!!touched.address && !!errors.barangay}
                helperText={touched.address && errors.barangay}
                sx={{ gridColumn: "span 1" }}
              /> */}

              {/*Permanent or Temporary*/}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Permanent/Temporary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.temporary}
                name="temporary"
                error={!!touched.temporary && !!errors.temporary}
                helperText={touched.temporary && errors.temporary}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="temporary">Temporary</MenuItem>
              </TextField>

               {/*Gender*/}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>

              {/*Birthdate*/}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                variant="filled"
                label="Birth Date"
                onBlur={handleBlur}
                onChange={(date) => {
                  // Use Formik's handleChange to update the "birthdate" value
                  handleChange({
                    target: {
                      name: "birthdate",
                      value: date,
                    },
                  });
                  console.log("Birthdate changed:", date);
                }}
                name="birthdate"
                value={values.birthdate}
                error={!!touched.birthdate && !!errors.birthdate}
                helperText={touched.birthdate && errors.birthdate}
                sx={{ gridColumn: "span 1" }}
              />
            </LocalizationProvider>

            {/* Bilateral Pitting Edema */}
              <TextField
                select
                fullWidth
                variant="filled"
                type="text"
                label="Bilateral Pitting Edema"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bpe}
                name="bpe"
                error={!!touched.bpe && !!errors.bpe}
                helperText={touched.bpe && errors.bpe}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Disability"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.disability}
                name="disability"
                error={!!touched.disability && !!errors.disability}
                helperText={touched.disability && errors.disability}
                sx={{ gridColumn: "span 1" }}
              />
               {/* Parent/Guradian Information */}
            <Box    sx={{ gridColumn: "span 4" }}>
              <Header subtitle="Parent/Guradian Information" />    
            </Box>

            {/* Fathers Name */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fathers Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.father_name}
                name="father_name"
                error={!!touched.father_name && !!errors.father_name}
                helperText={touched.father_name && errors.father_name}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Father's Occupation */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.father_occupation}
                name="father_occupation"
                error={!!touched.father_occupation && !!errors.father_occupation}
                helperText={touched.father_occupation && errors.father_occupation}
                sx={{ gridColumn: "span 1" }}
              />

              {/* Father's Ethnicity */}
               <TextField
                select
                fullWidth
                variant="filled"
                type='text'
                label="Ethnicity"
                onBlur={handleBlur}
                onChange={handleChange}
                name="father_ethnicity"
                value={values.father_ethnicity}
                error={!!touched.father_ethnicity && !!errors.father_ethnicity}
                helperText={touched.father_ethnicity && errors.father_ethnicity}
                sx={{ gridColumn: "span 1" }}
              >
                {ethnicityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              
              {/* Mother's Name */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mother's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother_name}
                name="mother_name"
                error={!!touched.mother_name && !!errors.mother_name}
                helperText={touched.mother_name && errors.mother_name}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Mother's Occupation */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother_occupation}
                name="mother_occupation"
                error={!!touched.mother_occupation && !!errors.mother_occupation}
                helperText={touched.mother_occupation && errors.mother_occupation}
                sx={{ gridColumn: "span 1" }}
              />

              {/* Mother's Ethnicity */}
              <TextField
                select
                fullWidth
                variant="filled"
                type="text"
                label="Ethnicity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother_ethnicity}
                name="mother_ethnicity"
                error={!!touched.mother_ethnicity && !!errors.mother_ethnicity}
                helperText={touched.mother_ethnicity && errors.mother_ethnicity}
                sx={{ gridColumn: "span 1" }}
              >
                {ethnicityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            
             {/* Child Nutrional Information */}
            <Box    sx={{ gridColumn: "span 4" }}>
              <Header subtitle="Child Nutrional Information" />    
            </Box>

            {/* Date of Weighing */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                variant="filled"
                type="text"
                label="Date of Weighing"
                onBlur={handleBlur}
                onChange={(date) => {
                  // Use Formik's handleChange to update the "birthdate" value
                  handleChange({
                    target: {
                      name: "dow",
                      value: date,
                    },
                  });
                  console.log("Dow changed:", date);
                }}
                name="dow"
                value={values.dow}
                error={!!touched.dow && !!errors.dow}
                helperText={touched.dow && errors.dow}
                sx={{ gridColumn: "span 1" }}
              />
            </LocalizationProvider>
             {/* Weight */}
            <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Weight(kg)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 1 " }}
              />

            {/* Heigth */}
            <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Height(cm)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.height}
                name="height"
                error={!!touched.height && !!errors.height}
                helperText={touched.height && errors.height}
                sx={{ gridColumn: "span 1" }}
              />

              {/* BMI */}
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="MUAC"
                onBlur={handleBlur}
                onChange={handleChange}
                name="midUpperArmCircumference"
                value={values.midUpperArmCircumference}
                error={!!touched.midUpperArmCircumference && !!errors.midUpperArmCircumference}
                helperText={touched.midUpperArmCircumference && errors.midUpperArmCircumference}
                sx={{ gridColumn: "span 1" }}
              />
                {/* Date of Vaccination */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                variant="filled"
                type="text"
                label="Date of Vaccination"
                onBlur={handleBlur}
                onChange={(date) => {
                  
                  handleChange({
                    target: {
                      name: "vac",
                      value: date,
                    },
                  });
                  console.log("Vaccination changed:", date);
                }}
                name="vac"
                value={values.vac}
                error={!!touched.dow && !!errors.vac}
                helperText={touched.dow && errors.vac}
                sx={{ gridColumn: "span 1" }}
              />
            </LocalizationProvider>
               {/* Date of Purga */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                variant="filled"
                type="text"
                label="Date of Purga"
                onBlur={handleBlur}
                onChange={(date) => {
                  
                  handleChange({
                    target: {
                      name: "purga",
                      value: date,
                    },
                  });
                  console.log("Purga changed:", date);
                }}
                name="purga"
                value={values.purga}
                error={!!touched.purga && !!errors.purga}
                helperText={touched.purga && errors.purga}
                sx={{ gridColumn: "span 1" }}
              />
            </LocalizationProvider>
            </Box>
              {/* Buttons  */}
            <Box display="flex" justifyContent="center" mt="20px" mb="200px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Child
              </Button>
              <Button type='button' color="warning" variant="contained" sx={{ml:'10px'}}   onClick={() => handleClearForm(resetForm)}>
                Clear Form
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    middleName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    address: yup.string().required("required"), 
    gender: yup.string().required("required"),
    bpe: yup.string().required("required"),
    temporary: yup.string().required('Please select an option'),
    disability: yup.string().required("required"),
    father_name: yup.string().required("required"),
    father_occupation: yup.string().required("required"),
    father_ethnicity: yup.string().required("required"),
    mother_name: yup.string().required("required"),
    mother_occupation: yup.string().required("required"),
    mother_ethnicity: yup.string().required("required"),

    weight: yup.number().required("Weight is required"),
    height: yup.number().required("Height is required"),
    midUpperArmCircumference: yup.number().required("MUAC is required"),

    birthdate: yup.date().nullable().required("Birthdate is required"),
    dow: yup.date().nullable().required("Date of Weighing is required"),
    purga: yup.date().nullable().required("Date of Purga is required"),
    vac: yup.date().nullable().required("Date of Vaccination is required"),
});
  

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "", // Add the "gender" field with an initial empty value
    birthdate: '', //Removed the initial value
    address: "",
    temporary: '',
    bpe: "",
    disability: "",
    father_name: "",
    father_occupation: "",
    father_ethnicity: "",
    mother_name: "",
    mother_occupation: "",
    mother_ethnicity: "",
    dow: '',//Removed the initial value
    weight: '',
    height: '',
    midUpperArmCircumference: '',
    vac: '',
    purga: '',

  };
  
export default Form;