import "./statusColors.css";
import weightForLengthStatus from "../../Calculations/weightForLengthStatus";

export const getCellClassNameWFL = (params) => {
  const weightForLength = weightForLengthStatus(
    params.row.birthdate,
    params.row.height,
    params.row.weight,
    params.row.gender
  );

  if (weightForLength === "Severely Wasted") {
    return "red-cell";
  } else if (weightForLength === "Wasted") {
    return "yellow-cell";
  } else if (weightForLength === "Normal") {
    return "green-cell";
  } else if (weightForLength === "Overweight" || weightForLength === "Obese") {
    return "red-cell";
  }

  return "default-cell"; // Default class name
};
