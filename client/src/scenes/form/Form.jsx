
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

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  

  const handleChange = (field, value) => {
    // Handle date fields separately
    if (field === "birthdate") {
      setValues({ ...values, birthdate: value });
    } else if (field === "dow") {
      setValues({ ...values, dow: value });
    } 
    // else {
    //   setValues({ ...values, [field]: value });// This line handles other fields if you want to add another
    // }
  };

  const handleFormSubmit = (values) => {
    console.log(values);
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname}
                name="fullname"
                error={!!touched.fullname && !!errors.fullname}
                helperText={touched.fullname && errors.fullname}
                sx={{ gridColumn: "span 2" }}
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
                type="text"
                label="Birth Date"
                onBlur={handleBlur}
                onChange={(date) => handleChange("birthdate", date)}
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
                onChange={(date) => handleChange("dow", date)}
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
                label="Weight"
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
                label="Height"
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
    fullname: yup.string().required("required"),
    gender: yup.string().required("required"),
    address: yup.string().required("required"),
    bpe: yup.string().required("required"),
    temporary: yup.string().required('Please select an option'),
    disability: yup.string().required("required"),
    father_name: yup.string().required("required"),
    father_occupation: yup.string().required("required"),
    father_ethnicity: yup.string().required("required"),
    mother_name: yup.string().required("required"),
    mother_occupation: yup.string().required("required"),
    mother_ethnicity: yup.string().required("required"),

    weight: yup.string().required("required"),
    height: yup.string().required("required"),
    midUpperArmCircumference: yup.string().required("required"),

    birthdate: yup.string().required("required"),
    dow: yup.string().required("required"),
  });
  

  const initialValues = {
    fullname: "",
    gender: "", // Add the "gender" field with an initial empty value
    birthdate: null, //Removed the initial value
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
    dow: null,//Removed the initial value
    weight: 0,
    height: 0,
    midUpperArmCircumference: 0,

  };
  
export default Form;