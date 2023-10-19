import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
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
            fontWeight="bold"
            fontSize="27px"
            sx={{ color: "white" }}
          >
            {progress}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5"  sx={{ color: "white" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: "white" }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;