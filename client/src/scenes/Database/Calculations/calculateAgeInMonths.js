// export const calculateAgeInMonths = (birthdate) => {
//     if (!birthdate) {
//       return "";
//     }
  
//     const today = new Date();
//     const birthDate = new Date(birthdate);
//     const ageInMonths =
//       (today.getFullYear() - birthDate.getFullYear()) * 12 +
//       today.getMonth() -
//       birthDate.getMonth();
  
//     return ageInMonths;
//   };

//   // Function to calculate age in months
export const calculateAgeInMonths = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12;
  ageInMonths -= birthDate.getMonth();
  ageInMonths += today.getMonth();

  return ageInMonths;
};
