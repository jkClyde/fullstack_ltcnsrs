import React, { useState } from "react"; // Import React and useState
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import Axios from "axios"; // Import Axios
import jwt_decode from "jwt-decode";

import lt_logo from "./../../assets/lt_logo.ico";
import bg from "./../../assets/lt_bg.jpg";
import { useStateContext } from "../../contexts/ContextProvider"; // Import the useStateContext hook
import { useNavigate } from "react-router-dom"; // Import useHistory

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CNSRS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignInSide() {
  const [email, setEmail] = useState(""); // Define email state
  const [password, setPassword] = useState(""); // Define password state
  const [wrongCredentials, setWrongcredentials] = useState(false);
  const { setToken } = useStateContext(); // Access setToken from context
  const navigate = useNavigate(); // Initialize useHistory
  const { setUser } = useStateContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a payload containing email and password
      const payload = {
        email: email,
        password: password,
      };
      // Send a POST request to your backend API
      const response = await Axios.post(
        "http://127.0.0.1:8000/auth/jwt/create/",
        payload
      );

      // Handle the response from the backend
      console.log("Login successful:", response.data);
      if (response.status == 200) {
        setToken(response.data.access); // Call setToken with the token value
        setUser(jwt_decode(response.data.access));
        localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response));
        navigate("/dashboard");
      } else {
        alert("Something went wrong!");
      }

      // You can also redirect the user to another page or perform other actions here
    } catch (error) {
      // Handle login error, e.g., show an error message to the user
      console.error("Login faileeeeed:", error);
      setWrongcredentials(true);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='fadeInDown'
        /> */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ borderRadius: "15px" }}
        >
          <Box
            sx={{
              my: 4,
              mx: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <img src={lt_logo} alt="LT Logo" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email} // Add value prop to bind to the state
                onChange={(e) => setEmail(e.target.value)} // Add onChange handler to update state
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {wrongCredentials && (
                <Typography variant="body2" color="error">
                  Wrong email or password. Please try again.
                </Typography>
              )}

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Link>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
