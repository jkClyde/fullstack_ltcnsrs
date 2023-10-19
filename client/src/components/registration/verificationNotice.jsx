import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


// Create a styled Container component
const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// Create a styled Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

// Create a styled Button component
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const VerificationNotice = () => {
  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4">Verify Your Email</Typography>
        <Typography variant="body1">
          We've sent you an email with a verification link. Please check your email and click the link to verify your account.
        </Typography>
        <Link to="/login"> {/* Use Link to navigate */}
          <StyledButton
            variant="contained"
            color="primary"
          >
            Proceed to Login
          </StyledButton>
        </Link> 
      </StyledPaper>
    </StyledContainer>
  );
};

export default VerificationNotice;
