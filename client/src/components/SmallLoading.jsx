import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoadingPage({ spinnerSize = 40 }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Navigate to /dashboard after 3 seconds
      navigate('/dashboard');
    }, 20000);

    // Clear the timer if the component unmounts before 3 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container
      className={`app ${loading ? 'loading' : ''}`}
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress size={spinnerSize} thickness={5} sx={{ color: 'white' }} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Loading data...
          </Typography>
        </div>
      ) : null /* Do not render main content here */}
    </Container>
  );
}

export default LoadingPage;
