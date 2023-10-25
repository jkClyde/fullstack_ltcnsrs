import { calculateAgeInMonths } from "./calculateAgeInMonths";
import weightForLengthData1 from "../StatusReference/weightForLength_0-23.json";
import weightForLengthData2 from "../StatusReference/weightForLength_24-60.json";

const roundedLength = Math.round(length * 2) / 2; // Round length to the nearest 0.5 cm

const weigthForLengthStatus = (birthdate, length, weight, gender) => {
  const childLength = Math.round(length * 2) / 2;
  const ageInMonths = calculateAgeInMonths(birthdate);
  const weightForLengthGender1 = weightForLengthData1[gender];
  const weightForLengthGender2 = weightForLengthData2[gender];
  if (ageInMonths >= 0 && ageInMonths <= 23) {
    if (weightForLengthGender1) {
      for (const wfl of weightForLengthGender1) {
        if (wfl.length === childLength) {
          if (weight <= wfl.SW) {
            return "Severely Wasted";
          } else if (weight >= wfl.WFrom && weight <= wfl.WTo) {
            return "Wasted";
          } else if (weight >= wfl.NFrom && weight <= wfl.NTo) {
            return "Normal";
          } else if (weight >= wfl.OWFrom && weight <= wfl.OWTo) {
            return "Overweight";
          } else if (weight >= wfl.O) {
            return "Obese";
          } else {
            return "N/A";
          }
        }
      }
      return "Height not found";
    } else {
      return "Gender not found";
    }
  } else if (ageInMonths >= 24 && ageInMonths <= 60) {
    if (weightForLengthGender2) {
      for (const wfl of weightForLengthGender2) {
        if (wfl.length === childLength) {
          if (weight <= wfl.SW) {
            return "Severely Wasted";
          } else if (weight >= wfl.WFrom && weight <= wfl.WTo) {
            return "Wasted";
          } else if (weight >= wfl.NFrom && weight <= wfl.NTo) {
            return "Normal";
          } else if (weight >= wfl.OWFrom && weight <= wfl.OWTo) {
            return "Overweight";
          } else if (weight >= wfl.O) {
            return "Obese";
          } else {
            return "Data not available for this value";
          }
        }
      }
      return "Height not found";
    } else {
      return "Gender not found";
    }
  } else {
    return "Child's age is >60";
  }
};
export default weigthForLengthStatus; // Export it as the default export
