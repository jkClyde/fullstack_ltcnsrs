import React, { useState , useEffect} from "react"; // Import React and useState
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import lt_logo from "./../../assets/lt_logo.ico";
import Copyright from "./components/Copyright";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { useStateContext } from "../../contexts/ContextProvider"; 
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function SignInSide() {
  // Define state variables using the useState hook
  const [email, setEmail] = useState(""); // Define email state
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(""); // Define password state
  const [passwordVisibility, setPasswordVisibility] = useState(false); // Track password visibility
  const [wrongCredentials, setWrongcredentials] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts
  const maxAttempts = 4; // Maximum number of login attempts allowed
  const attemptsLeft = maxAttempts - loginAttempts;
  const [userData, setUserData] = useState([]); // Store the user data from the API
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const [countdownActive, setCountdownActive] = useState(false);
  const [loginAttemptActive, setLoginAttemptActive] = useState(false);
  
  // Access setToken from context
  const { setToken } = useStateContext();
  // Initialize useHistory
  const navigate = useNavigate();
  // Access setUser, user, token, setToken from context
  const { setUser, user, token } = useStateContext();


  // Toggle password visibility
  const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  // Check if a token is present on component mount and clear it
  useEffect(() => {
    if (token) {
      setToken(null);
      setUser({});
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }, []);

  // Check if email format is valid
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate email existence
  const validateEmail = async () => {
    try {
      // Make a GET request to retrieve user data
      const response = await Axios.get("http://127.0.0.1:8000/api/users/");
      console.log("User Data:", response.data);
      // Store the user data from the API
      setUserData(response.data);
      // Remove the email existence check here
      setEmailError("");
    } catch (error) {
      setEmailExists(false);
      setEmailError("Error checking email existence.");
    }
  };

  // Trigger the API call on component mount
  useEffect(() => {
    validateEmail();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Check for email existence when userData changes
  useEffect(() => {
    const emailExists = userData.some((user) => user.email.trim().toLowerCase() === email.trim().toLowerCase() && !user.is_disabled); // Check if the email is not disabled
    setEmailExists(emailExists);
  }, [userData, email]);

  // Set up countdown timer for login attempts
  useEffect(() => {
    let timer;
    if (loginAttempts < maxAttempts) {
      setCountdownActive(true);
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
          if (newCountdown === 0) {
            setLoginAttemptActive(false);
            setCountdownActive(false);
            setWrongcredentials(false);
            clearInterval(timer); // Clear the interval
            return 5;
          }
          return newCountdown;
        });
      }, 1000);
    } else {
      setCountdown(5);
      setLoginAttemptActive(true);
      setCountdownActive(false);
    }
    return () => clearInterval(timer);
  }, [loginAttempts, maxAttempts]);

  // Retrieve stored login attempts and email on component mount
  useEffect(() => {
    const storedLoginAttempts = localStorage.getItem("LOGIN_ATTEMPTS");
    const storedAttemptedEmail = localStorage.getItem("ATTEMPTED_EMAIL");
    if (storedLoginAttempts && storedAttemptedEmail) {
      const storedAttempts = parseInt(storedLoginAttempts, 4);
      setLoginAttempts(storedAttempts);
      setEmail(storedAttemptedEmail);
    }
  }, [maxAttempts]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Disable fields for 5 seconds on login failure
      if (loginAttempts >= maxAttempts) {
        setLoginAttemptActive(true);
        setWrongcredentials(true);

        // If the email is disabled, set appropriate error message
        if (emailExists && userData.length > 0 && userData[0].is_disabled) {
          setEmailError("Your account has been disabled. Check your email for instructions.");
        } else {
          // If the email is different, reset the login attempts and update the attempted email
          localStorage.setItem("LOGIN_ATTEMPTS", 0);
          setLoginAttempts(0);
          setLoginAttemptActive(false);
          setWrongcredentials(false);
          setEmailError("");

          // Update the attempted email in local storage
          localStorage.setItem("ATTEMPTED_EMAIL", email);

          // Check if is_disabled is false for the entered email and reset attempts
          const enteredEmailData = userData.find(
            (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
          );

          if (enteredEmailData && !enteredEmailData.is_disabled) {
            localStorage.setItem("LOGIN_ATTEMPTS", 0);
          }
        }

        return;
      }
      // Check if the email exists
      await validateEmail();

      // if (!emailExists) {
      //   // Email does not exist, handle accordingly
      //   setEmailError("Email does not exist.");
      //   return;
      // }

      // Prepare payload for login request
      const payload = {
        email: email,
        password: password,
      };

      // Send a POST request to your backend API to log in
      const loginResponse = await Axios.post(
        "http://127.0.0.1:8000/token/",
        payload
      );

      // Handle the login response from the backend
      if (loginResponse.status === 200) {
        setLoginAttempts(0);
        setLoginAttemptActive(false);
        setWrongcredentials(false);
        localStorage.setItem("LOGIN_ATTEMPTS", 0);
        localStorage.setItem("ATTEMPTED_EMAIL", "");
        setToken(loginResponse.data.access);
        setUser(jwt_decode(loginResponse.data.access));
        localStorage.setItem("ACCESS_TOKEN", JSON.stringify(loginResponse));
        // Navigate to "/loading" and reload the page
        //------------------------------------------------------------------------------------------------------------
        const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
          fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${storedToken.data.access}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const auditCreatePayload = {
                    user: data.first_name + " " + data.last_name,  // Assuming you want to send the user data as part of the payload
                    action: 'Logged in to System',  // Replace 'your_action_here' with the actual action
                };
                fetch('http://127.0.0.1:8000/audit/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(auditCreatePayload),
                })
                    .then((auditResponse) => auditResponse.json())
                    .then((auditData) => {
                        console.log('Audit creation response:', auditData);
                         navigate("/loading");
                         window.location.reload(); 
                    })
                    .catch((auditError) => {
                        console.error('Error creating audit:', auditError);
                    });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
            //---------------------------------------------------------------------------------------------------------
        // navigate("/loading");
        // window.location.reload(); 
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setWrongcredentials(true);
      setLoginAttemptActive(true);
      // Increment the login attempts
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      // Store the login attempts and attempted email in local storage
      localStorage.setItem("LOGIN_ATTEMPTS", loginAttempts + 1);
      localStorage.setItem("ATTEMPTED_EMAIL", email);
      // Reset error state and login attempt state after 5 seconds
      setTimeout(() => {
        setWrongcredentials(false);
        setLoginAttemptActive(false);
      }, 5000);
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={email.length > 0 && !emailExists}
                    helperText={emailError}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={passwordVisibility ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordVisibilityToggle}
                          edge="end"
                        >
                          {passwordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                  {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                
              
                {/* <Typography variant="body2" color="error">
                  You have been locked out because of too many failed login attempts. Check your email for confirmation.
                </Typography>
               */}
              {wrongCredentials && loginAttemptActive && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {loginAttempts >= maxAttempts 
                    ? "Your account have been locked out/deactivated because of too many failed login attempts. Check your email for instructions."
                    : `Wrong email or password. Attempts left: ${attemptsLeft}. ${
                        countdownActive ? `Try again in ${countdown}s` : ""
                      }`}
                </Typography>
              )}

              {/* {wrongCredentials && !loginAttemptActive && (
                <Typography variant="body2" color="error">
                  Wrong email or password.
                </Typography>
              )} */}

              
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
