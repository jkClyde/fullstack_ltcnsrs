import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Legend = () => {
  return (
    <Box mb="35px" display="flex" alignItems="center">
      <Typography variant="h6" mr="10px">
        Legend:
      </Typography>
      <Box display="flex" alignItems="center" mr="20px">
        <Box
          width="20px"
          height="20px"
          backgroundColor="lightgreen"
          borderRadius="4px"
          mr="5px"
        />
        <Typography>Finished</Typography>
      </Box>
      <Box display="flex" alignItems="center" mr="20px">
        <Box
          width="20px"
          height="20px"
          backgroundColor="lightblue"
          borderRadius="4px"
          mr="5px"
        />
        <Typography>Upcoming</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          width="20px"
          height="20px"
          backgroundColor="lightcoral"
          borderRadius="4px"
          mr="5px"
        />
        <Typography>Missed</Typography>
      </Box>
    </Box>
  );
};

export default Legend;
