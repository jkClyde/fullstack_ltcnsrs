import { calculateAgeInMonths } from "./calculateAgeInMonths";
import lengthForAgeData from "../StatusReference/lengthForAge.json";

//  // Read the JSON data using fetch
// const response = await fetch('weightForAge.json');
// const weightForAgeData = await response.json();
// Add a function to calculate "Weight For Age Status"
const lengthForAgeStatus = (birthdate, length, gender) => {
  const ageInMonths = calculateAgeInMonths(birthdate);
  const lengthForAgeGender = lengthForAgeData[gender];

  if (lengthForAgeGender) {
    for (const lfa of lengthForAgeGender) {
      if (lfa.Age === ageInMonths) {
        if (length <= lfa.SS) {
          return "Severely Stunted";
        } else if (length >= lfa.SFrom && length <= lfa.STo) {
          return "Stunted";
        } else if (length >= lfa.NFrom && length <= lfa.NTo) {
          return "Normal";
        } else if (length >= lfa.Tall) {
          return "Tall";
        } else {
          return "Height N/A";
        }
      }
    }
    return "Age N/A";
  } else {
    return "Gender N/A";
  }
};
export default lengthForAgeStatus; // Export it as the default export
