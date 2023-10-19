import { calculateAgeInMonths } from "./calculateAgeInMonths";
import weightForLengthData1 from "../StatusReference/weightForLength_0-23.json";
import weightForLengthData2 from "../StatusReference/weightForLength_24-60.json";

const weigthForLengthStatus = (birthdate, length, weight, gender) => {
  const childLength = length;
  const ageInMonths = calculateAgeInMonths(birthdate);
  const weightForLengthGender1 = weightForLengthData1[gender];
  const weightForLengthGender2 = weightForLengthData2[gender];
  if (ageInMonths >= 0 && ageInMonths <= 23) {
    if (weightForLengthGender1) {
      for (const wfl of weightForLengthGender1) {
        if (wfl.length === childLength) {
          if (weight <= wfl.SW) {
            return "Severly Underweight";
          } else if (weight >= wfl.WFrom && weight <= wfl.WTo) {
            return "Underweight";
          } else if (weight >= wfl.NFrom && weight <= wfl.NTo) {
            return "Normal";
          } else if (weight >= wfl.OWFrom && weight <= wfl.OWTo) {
            return "Overweight";
          } else if (weight >= wfl.O) {
            return "Overweight";
          } else {
            return "Data not available for this value";
          }
        }
      }
      return "Height not found in data";
    } else {
      return "Sex not found in data";
    }
  } else if (ageInMonths >= 24 && ageInMonths <= 60) {
    if (weightForLengthGender2) {
      for (const wfl of weightForLengthGender2) {
        if (wfl.length === childLength) {
          if (weight <= wfl.SW) {
            return "Severly Underweight";
          } else if (weight >= wfl.WFrom && weight <= wfl.WTo) {
            return "Underweight";
          } else if (weight >= wfl.NFrom && weight <= wfl.NTo) {
            return "Normal";
          } else if (weight >= wfl.OWFrom && weight <= wfl.OWTo) {
            return "Overweight";
          } else if (weight >= wfl.O) {
            return "Overweight";
          } else {
            return "Data not available for this value";
          }
        }
      }
      return "Height not found in data";
    } else {
      return "Sex not found in data";
    }
  } else {
    return "Child is too old to be assessed";
  }
};
export default weigthForLengthStatus; // Export it as the default export
