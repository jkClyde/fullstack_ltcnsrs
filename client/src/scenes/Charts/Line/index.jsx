import { Box } from "@mui/material";
import Header from "../../../components/Header";
import PieChart from "../../../components/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Population"  />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Line;