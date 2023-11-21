import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";

import lt_logo from "./../../assets/lt_logo.ico";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import barangays from "./../form/barangayOptions";
import Copyright from "./components/Copyright";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  barangay: Yup.string().required("Barangay is required"),
  phone_number: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .test(
      "password-validation",
      "Password should not contain your name or common keywords",
      function (value) {
        const { firstName, lastName } = this.parent;
        const lowerCaseValue = value.toLowerCase();

        if (
          lowerCaseValue.includes(firstName.toLowerCase()) ||
          lowerCaseValue.includes(lastName.toLowerCase()) ||
          /password|pass|pword/i.test(lowerCaseValue) // Check for common keywords
        ) {
          return false; // Password contains part of a name or common keyword
        }

        return true; // Password is valid
      }
    )
    .required("Password is required"),
  re_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const defaultTheme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [registrationError, setRegistrationError] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const registrationData = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      re_password: values.re_password,
      job_description: values.job_description, // Include job_description
      barangay: values.barangay, // Include barangay
      phone_number: values.phone_number, // Include phone_number
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        registrationData
      );
      console.log("User registered successfully:", response.data);
      setRegistrationSuccess(true);
      navigate("/notice");
    } catch (error) {
      console.error("Registration failed:", error);
      setRegistrationError(true);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 3, bgcolor: "secondary.main" }}>
            <img src={lt_logo} alt="LT Logo" />
          </Avatar>
          <Box sx={{ mb: 2, mt: 1 }}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Box>
          {loading ? (
            <CircularProgress />
          ) : registrationSuccess ? (
            <Typography variant="body1" color="success">
              Registration successful! You can now{" "}
              <Link component={RouterLink} to="/login">
                sign in
              </Link>
              .
            </Typography>
          ) : (
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                jobDescription: "",
                barangay: "",
                phone_number: "",
                password: "",
                re_password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        error={errors.firstName && touched.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="lastName"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        error={errors.lastName && touched.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="jobDescription"
                        required
                        fullWidth
                        id="jobDescription"
                        label="Job Description"
                        select
                        error={errors.jobDescription && touched.jobDescription}
                        helperText={
                          touched.jobDescription && errors.jobDescription
                        }
                      >
                        <MenuItem value="">Select Job Description</MenuItem>
                        <MenuItem value="barangay_health_worker">
                          Barangay Health Worker
                        </MenuItem>
                        <MenuItem value="barangay_nutritional_scholar">
                          Barangay Nutritional Scholar
                        </MenuItem>
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="barangay"
                        required
                        fullWidth
                        id="barangay"
                        label="Barangay"
                        select
                        error={errors.barangay && touched.barangay}
                        helperText={touched.barangay && errors.barangay}
                      >
                        <MenuItem value="">Select Barangay</MenuItem>
                        {barangays.map((barangay, index) => (
                          <MenuItem key={index} value={barangay}>
                            {barangay}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        error={errors.email && touched.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="phone_number"
                        required
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        type="tel"
                        error={errors.phone_number && touched.phone_number}
                        helperText={touched.phone_number && errors.phone_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="password"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        error={errors.password && touched.password}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="re_password"
                        required
                        fullWidth
                        id="re_password"
                        label="Re-enter password"
                        type="password"
                        error={errors.re_password && touched.re_password}
                        helperText={touched.re_password && errors.re_password}
                      />
                    </Grid>
                  </Grid>
                  {registrationError && (
                    <Typography variant="body2" color="error">
                      Registration failed. Please try again.
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link component={RouterLink} to="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
