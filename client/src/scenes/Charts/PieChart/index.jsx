import { Box } from "@mui/material";
import Header from "../../../components/dashboard_components/Header";
import PieChart from "../../../components/charts/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Children Population per Barangay Monitored"  />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;