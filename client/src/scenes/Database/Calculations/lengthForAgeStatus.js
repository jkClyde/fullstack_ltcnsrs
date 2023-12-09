import { calculateAgeInMonths } from "./calculateAgeInMonths";
import lengthForAgeData from "../StatusReference/lengthForAge.json";
import { useState } from "react";

const lengthForAgeStatus = (birthdate, length, gender) => {
  const ageInMonths = calculateAgeInMonths(birthdate);
  const lengthForAgeGender = lengthForAgeData[gender];
  if (ageInMonths >= 0 && ageInMonths <= 59) {
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
  } else {
    return "Age Not Supported";
  }
};
export default lengthForAgeStatus; // Export it as the default export
