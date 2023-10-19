import React, { useContext, useState } from 'react'; // Import useContext
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useStateContext } from '../../contexts/ContextProvider';

const Verify = () => {
  const { activateUser } = useStateContext(); // Get the activateUser function from your context
  const [verified, setVerified] = useState(false);


  const handleVerifyClick = async () => {
    // Replace 'uid' and 'token' with the actual UID and token values
    const uid = match.params.uid;
    const token = match.params.token;

    // Call the activateUser function to trigger user activation
    activateUser(uid, token);
    setVerified(true);

    if (verified) {
        return <Redirect to='/login' />
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - 64px)" // Adjust based on your layout
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Verify Your Account
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: '1rem' }}
        onClick={handleVerifyClick}
      >
        Verify Now
      </Button>
    </Box>
  );
};

export default Verify;
