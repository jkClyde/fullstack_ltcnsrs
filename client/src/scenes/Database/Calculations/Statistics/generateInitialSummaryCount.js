export const generateInitialSummaryCount = () => ({
  "WFA - Normal": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFA - OW": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFA - UW": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFA - SUW": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "LFA - Normal": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "LFA - Tall": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "LFA - St": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "LFA - SSt": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFL/H - Normal": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFL/H - OW": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFL/H - Ob": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFL/H - MW": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
  "WFL/H - SW": {
    "0-5 Months": { Boys: 0, Girls: 0 },
    "6-11 Months": { Boys: 0, Girls: 0 },
    "12-23 Months": { Boys: 0, Girls: 0 },
    "24-35 Months": { Boys: 0, Girls: 0 },
    "36-47 Months": { Boys: 0, Girls: 0 },
    "48-59 Months": { Boys: 0, Girls: 0 },
  },
});

export const updateSummary = (
  setSummaryCount,
  patient_aim,
  category,
  patient_gender
) => {
  if (patient_aim >= 0 && patient_aim <= 5) {
    const ageRange = "0-5 Months";
    setSummaryCount((prevSummaryCount) => ({
      ...prevSummaryCount,
      [category]: {
        ...prevSummaryCount[category],
        [ageRange]: {
          ...prevSummaryCount[category][ageRange],
          Boys:
            patient_gender === "Male"
              ? prevSummaryCount[category][ageRange].Boys + 1
              : prevSummaryCount[category][ageRange].Boys,
          Girls:
            patient_gender === "Female"
              ? prevSummaryCount[category][ageRange].Girls + 1
              : prevSummaryCount[category][ageRange].Girls,
        },
      },
    }));
  } else if (patient_aim >= 6 && patient_aim <= 11) {
    const ageRange = "6-11 Months";
    setSummaryCount((prevSummaryCount) => ({
      ...prevSummaryCount,
      [category]: {
        ...prevSummaryCount[category],
        [ageRange]: {
          ...prevSummaryCount[category][ageRange],
          Boys:
            patient_gender === "Male"
              ? prevSummaryCount[category][ageRange].Boys + 1
              : prevSummaryCount[category][ageRange].Boys,
          Girls:
            patient_gender === "Female"
              ? prevSummaryCount[category][ageRange].Girls + 1
              : prevSummaryCount[category][ageRange].Girls,
        },
      },
    }));
  } else if (patient_aim >= 12 && patient_aim <= 23) {
    const ageRange = "12-23 Months";
    setSummaryCount((prevSummaryCount) => ({
      ...prevSummaryCount,
      [category]: {
        ...prevSummaryCount[category],
        [ageRange]: {
          ...prevSummaryCount[category][ageRange],
          Boys:
            patient_gender === "Male"
              ? prevSummaryCount[category][ageRange].Boys + 1
              : prevSummaryCount[category][ageRange].Boys,
          Girls:
            patient_gender === "Female"
              ? prevSummaryCount[category][ageRange].Girls + 1
              : prevSummaryCount[category][ageRange].Girls,
        },
      },
    }));
  } else if (patient_aim >= 24 && patient_aim <= 35) {
    const ageRange = "24-35 Months";
    setSummaryCount((prevSummaryCount) => ({
      ...prevSummaryCount,
      [category]: {
        ...prevSummaryCount[category],
        [ageRange]: {
          ...prevSummaryCount[category][ageRange],
          Boys:
            patient_gender === "Male"
              ? prevSummaryCount[category][ageRange].Boys + 1
              : prevSummaryCount[category][ageRange].Boys,
          Girls:
            patient_gender === "Female"
              ? prevSummaryCount[category][ageRange].Girls + 1
              : prevSummaryCount[category][ageRange].Girls,
        },
      },
    }));
  } else if (patient_aim >= 36 && patient_aim <= 47) {
    const ageRange = "36-47 Months";
    setSummaryCount((prevSummaryCount) => ({
      ...prevSummaryCount,
      [category]: {
        ...prevSummaryCount[category],
        [ageRange]: {
          ...prevSummaryCount[category][ageRange],
          Boys:
            patient_gender === "Male"
              ? prevSummaryCount[category][ageRange].Boys + 1
              : prevSummaryCount[category][ageRange].Boys,
          Girls:
            patient_gender === "Female"
              ? prevSummaryCount[category][ageRange].Girls + 1
              : prevSummaryCount[category][ageRange].Girls,
        },
      },
    }));
  } else if (patient_aim >= 48 && patient_aim <= 59) {
    const ageRange = "48-59 Months";
    setSummaryCount((prevSummaryCount) => ({
      ...prevSummaryCount,
      [category]: {
        ...prevSummaryCount[category],
        [ageRange]: {
          ...prevSummaryCount[category][ageRange],
          Boys:
            patient_gender === "Male"
              ? prevSummaryCount[category][ageRange].Boys + 1
              : prevSummaryCount[category][ageRange].Boys,
          Girls:
            patient_gender === "Female"
              ? prevSummaryCount[category][ageRange].Girls + 1
              : prevSummaryCount[category][ageRange].Girls,
        },
      },
    }));
  }
};

export const getLatestQuarter = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

  let quarter;

  if (currentMonth <= 3) {
    quarter = "1st Quarter";
  } else if (currentMonth <= 6) {
    quarter = "2nd Quarter";
  } else if (currentMonth <= 9) {
    quarter = "3rd Quarter";
  } else {
    quarter = "4th Quarter";
  }

  return { year: currentYear, quarter };
};
