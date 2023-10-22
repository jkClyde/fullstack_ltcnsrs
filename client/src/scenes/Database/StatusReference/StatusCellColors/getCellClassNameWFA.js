import "./statusColors.css";
import weightForAgeStatus from "../../Calculations/weightForAgeStatus";

export const getCellClassNameWFA = (params) => {
  const weightForAge = weightForAgeStatus(
    params.row.birthdate,
    params.row.weight,
    params.row.gender
  );

  if (weightForAge === "Severely Underweight") {
    return "red-cell";
  } else if (weightForAge === "Underweight") {
    return "yellow-cell";
  } else if (weightForAge === "Normal") {
    return "green-cell";
  } else if (weightForAge === "Overweight") {
    return "red-cell";
  }

  return "default-cell"; // Default class name
};
