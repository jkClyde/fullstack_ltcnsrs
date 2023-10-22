import { calculateAgeInMonths } from "./calculateAgeInMonths";
import weightForAgeData from "../StatusReference/weightForAge.json";

const weightForAgeStatus = (birthdate, weight, gender) => {
  const ageInMonths = calculateAgeInMonths(birthdate);
  const weightForAgeGender = weightForAgeData[gender];

  if (weightForAgeGender) {
    for (const wfa of weightForAgeGender) {
      if (wfa.Age === ageInMonths) {
        if (weight <= wfa.SU) {
          return "Severely Underweight";
        } else if (weight >= wfa.UFrom && weight <= wfa.UTo) {
          return "Underweight";
        } else if (weight >= wfa.NFrom && weight <= wfa.NTo) {
          return "Normal";
        } else if (weight >= wfa.OW) {
          return "Overweight";
        } else {
          return "Weight N/A";
        }
      }
    }
    return "Age N/A";
  } else {
    return "Gender N/A";
  }
};
export default weightForAgeStatus; // Export it as the default export
