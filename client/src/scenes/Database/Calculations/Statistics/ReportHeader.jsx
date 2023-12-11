import React from 'react';
import Typography from '@mui/material/Typography';

const ReportHeader = ({ barangay }) => {
  const headingStyle = {
    fontFamily: 'Century, sans-serif',
    fontSize: '17px',
    fontWeight: 'bold',
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {/* <Typography variant="h1" style={headingStyle}>
        Republic of the Philippines
      </Typography>
      <Typography variant="h2" style={headingStyle}>
        Province of Benguet
      </Typography> */}
      <Typography variant="h3" style={headingStyle}>
        Municipality of La Trinidad
      </Typography>
      <Typography variant="h4" style={headingStyle}>
        Municipal Health Services Office
      </Typography>
      <Typography variant="h4" style={headingStyle}>
        {barangay === 'All Barangays' ? '2023 Summary Report - La Trinidad' : `2023 Summary Report - Barangay ${barangay}`}
      </Typography>
    </div>
  );
};

export default ReportHeader;
