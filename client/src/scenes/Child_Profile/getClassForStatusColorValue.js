
export const getClassForStatusColorValue = (value) => {
    if (value === "Obese" || value === "Severely Stunted" || value === "Severely Wasted" || value === "Severely Underweight" || value === "Overweight") {
      return "red-cell";
    } else if (value === "Stunted" || value === "Wasted" || value === "Underweight") {
      return "yellow-cell";
    } else if (value === "Normal" || value === "Tall") {
      return "green-cell";
    } else {
      return "default-cell"; // Default class name
    }
  };
  