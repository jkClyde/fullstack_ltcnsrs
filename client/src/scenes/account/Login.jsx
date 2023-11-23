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
  const [email, setEmail] = useState(""); // Define email state
  const [password, setPassword] = useState(""); // Define password state
  const [passwordVisibility, setPasswordVisibility] = useState(false); // Track password visibility
  const [wrongCredentials, setWrongcredentials] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts
  const maxAttempts = 4; // Maximum number of login attempts allowed
  const attemptsLeft = maxAttempts - loginAttempts;
  const showLoginFields = attemptsLeft > 0;
  const [fieldsDisabled, setFieldsDisabled] = useState(false); // Track whether fields should be disabled
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const [countdownActive, setCountdownActive] = useState(false);
  const [loginAttemptActive, setLoginAttemptActive] = useState(false);
  const { setToken } = useStateContext(); // Access setToken from context
  const navigate = useNavigate(); // Initialize useHistory
  const { setUser } = useStateContext();
  const { user, token} = useStateContext(); // Access user, token, setToken, and setUser from context
  const dispatch = useDispatch();

  
  const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  useEffect(() => {
    if (token) {
      setToken(null);
      setUser({});
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }, []);


  useEffect(() => {
    let timer;
  
    if (fieldsDisabled && loginAttempts < maxAttempts) {
      setCountdownActive(true);
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
  
          if (newCountdown === 0) {
            setLoginAttemptActive(false);
            setCountdownActive(false);
            setWrongcredentials(false); // Move this line inside the if block
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
  }, [fieldsDisabled, loginAttempts, maxAttempts]);
  
  

  useEffect(() => {
    const storedLoginAttempts = localStorage.getItem("LOGIN_ATTEMPTS");
    if (storedLoginAttempts) {
      const storedAttempts = parseInt(storedLoginAttempts, 4);
      setLoginAttempts(storedAttempts);
      if (storedAttempts >= maxAttempts) {
        setFieldsDisabled(true);
      }
    }
  }, [maxAttempts]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Disable fields for 5 seconds on login failure
      if (fieldsDisabled) return;

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
        setFieldsDisabled(false);
        setWrongcredentials(false);

        setLoginAttempts((prevAttempts) => prevAttempts + 1);
        localStorage.setItem("LOGIN_ATTEMPTS", loginAttempts + 1);

        setToken(loginResponse.data.access);
        setUser(jwt_decode(loginResponse.data.access));
        localStorage.setItem("ACCESS_TOKEN", JSON.stringify(loginResponse));
        navigate("/loading")
        window.location.reload(); 

    
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setWrongcredentials(true);
      setLoginAttemptActive(true);
      // Increment the login attempts
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      // Store the login attempts in local storage
      localStorage.setItem("LOGIN_ATTEMPTS", loginAttempts + 1);
      if (loginAttempts + 1 >= maxAttempts) {
        setFieldsDisabled(true);
        setLoginAttemptActive(true);
        setWrongcredentials(false);
      } else {
        setFieldsDisabled(true);
        setTimeout(() => {
          setFieldsDisabled(false);
        }, 5000);
      }
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
              {showLoginFields ? (
                <>
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
                    disabled={fieldsDisabled}
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
                    disabled={fieldsDisabled}
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
                </>
              ) : (
                <Typography variant="body2" color="error">
                  You have been locked out because of too many failed login attempts. Check your email for confirmation.
                </Typography>
              )}
              {wrongCredentials && loginAttemptActive && (
                <Typography variant="body2" color="error">
                  Wrong email or password. Attempts left: {attemptsLeft}.
                  {countdownActive && ` Countdown: ${countdown}s`}
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
