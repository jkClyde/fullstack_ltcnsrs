import { Box } from "@mui/material";
import Header from "../../../components/Header";
import BarChart from "../../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Child Nutrition and Health Statistics by Barangay" subtitle="An Overview of Children's Population, Malnutrition, and Health Status in the Municipality" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;