import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase, number }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            // fontWeight="bold"
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          {/* <ProgressCircle progress={progress} /> */}
          {/* Display the progress value directly */}
          <Typography
            variant="h5"
            fontStyle="italic"
            fontSize="20px"
            sx={{ color: "white" }}
          >
            {progress}%
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography variant="h2"  sx={{ color: "white" , mt:"3px" } } fontWeight="bold">
          {number}  
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;