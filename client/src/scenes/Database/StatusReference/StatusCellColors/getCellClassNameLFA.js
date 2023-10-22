import "./statusColors.css";
import lengthForAgeStatus from "../../Calculations/lengthForAgeStatus";

export const getCellClassNameLFA = (params) => {
  const lengthForAge = lengthForAgeStatus(
    params.row.birthdate,
    params.row.height,
    params.row.gender
  );

  if (lengthForAge === "Severely Stunted") {
    return "red-cell";
  } else if (lengthForAge === "Stunted") {
    return "yellow-cell";
  } else if (lengthForAge === "Normal") {
    return "green-cell";
  } else if (lengthForAge === "Tall") {
    return "green-cell";
  }
  return "default-cell"; // Default class name
};
