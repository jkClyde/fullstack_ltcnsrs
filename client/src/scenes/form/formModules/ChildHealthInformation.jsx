import React, { useState } from "react";
import { Box, Button, tableFooterClasses } from "@mui/material";
import TextInput from "../formComponents/TextInput";
import DateInput from "../formComponents/DateInput";
import MenuSelect from "../formComponents/MenuSelect";
import MenuInput from "../formComponents/MenuInput";
import disabilityOptions from "../disabilityOptions";
import ethnicityOptions from "../ethnicityOptions";
import Header from "../../../components/dashboard_components/Header";

const ChildHealthInformation = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  handleDateChange,
  selectedDOW,
  selectedDate,
  ageInMonths,
  selectedVitAOneHTIU,
  selectedVitATwoHTIUOneYear,
  selectedVitATwoHTIUOneSixYear,
  selectedVitATwoHTIUTwoYear,
  selectedVitATwoHTIUTwoSixYear,
  selectedVitATwoHTIUThreeYear,
  selectedVitATwoHTIUThreeSixYear,
  selectedVitATwoHTIUFourYear,
  selectedVitATwoHTIUFourSixYear,
  selectedVitATwoHTIUFiveYear,
  selectedDewormingOneYear,
  selectedDewormingOneSixYear,
  selectedDewormingTwoYear,
  selectedDewormingTwoSixYear,
  selectedDewormingThreeYear,
  selectedDewormingThreeSixYear,
  selectedDewormingFourYear,
  selectedDewormingFourSixYear,
  selectedDewormingFiveYear,
}) => {
  const [showOtherDisabilityInput, setShowOtherDisabilityInput] =
    useState(false);
  const [showVaccinationRemarksInput, setShowVaccinationRemarksInput] =
    useState(false);
  const handleDisabilityChange = (name, value) => {
    setFieldValue(name, value);
    setShowOtherDisabilityInput(value === "Others");
  };

  const handleVaccinationChange = (name, value) => {
    setFieldValue(name, value);
    setShowVaccinationRemarksInput(value === "INC" || value === "None");
  };
  return (
    <>
      <DateInput
        label="Date of Weighing (MM/DD/YYYY)"
        name="dow"
        value={selectedDOW}
        onChange={(name, date) => handleDateChange(name, date, "dow")}
        error={!!touched.dow && !!errors.dow}
        helperText={touched.dow && errors.dow}
        className="dateInput"
        sx={{ gridColumn: "span 1" }}
        selectedDate={selectedDate}
        required={true}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Weight (kg)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.weight}
        name="weight"
        error={!!touched.weight && !!errors.weight}
        helperText={touched.weight && errors.weight}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Height (cm)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.height}
        name="height"
        error={!!touched.height && !!errors.height}
        helperText={touched.height && errors.height}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Mid-Upper Arm Circumference (cm)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.muac}
        name="muac"
        error={!!touched.muac && !!errors.muac}
        helperText={touched.muac && errors.muac}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="Bilateral Pitting Edema"
        name="bpe"
        value={values.bpe}
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.bpe && !!errors.bpe}
        helperText={touched.bpe && errors.bpe}
        options={[
          { value: "", label: "Select", isDisabled: true },
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="Disability"
        name="disability"
        value={values.disability}
        onChange={(name, value) => handleDisabilityChange(name, value)}
        error={!!touched.disability && !!errors.disability}
        helperText={touched.disability && errors.disability}
        options={disabilityOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        sx={{ gridColumn: "span 1" }}
      />
      {showOtherDisabilityInput && (
        <TextInput
          label="Other Disability"
          name="otherDisability"
          value={values.otherDisability}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.otherDisability && !!errors.otherDisability}
          helperText={touched.otherDisability && errors.otherDisability}
          className="textInput"
          sx={{ gridColumn: "span 1" }}
        />
      )}
      {ageInMonths <= 12 && (
        <>
          <Box sx={{ gridColumn: "span 4" }}>
            <Header subtitle="Vaccination Status" />
          </Box>

          <MenuSelect
            label="Vaccination"
            name="vac"
            value={values.vac}
            onChange={(name, value) => {
              setFieldValue(name, value);
            }}
            error={!!touched.vac && !!errors.vac}
            helperText={touched.vac && errors.vac}
            options={[
              { value: "", label: "Select", isDisabled: true }, // Add a null option
              { value: "Ongoing", label: "Ongoing" },
              { value: "None", label: "None" },
            ]}
            sx={{ gridColumn: "span 1" }}
          />
        </>
      )}
      {ageInMonths > 12 && (
        <MenuSelect
          label="Vaccination"
          name="vac"
          value={values.vac}
          onChange={(name, value) => handleVaccinationChange(name, value)}
          error={!!touched.vac && !!errors.vac}
          helperText={touched.vac && errors.vac}
          options={[
            { value: "", label: "Select", isDisabled: true }, // Add a null option
            { value: "FIC", label: "FIC" },
            { value: "CIC", label: "CIC" },
            { value: "INC", label: "INC" },
            { value: "None", label: "None" },
          ]}
          sx={{ gridColumn: "span 1" }}
        />
      )}
      {showVaccinationRemarksInput && (
        <TextInput
          label="Remarks"
          name="vaccinationRemarks"
          value={values.vaccinationRemarks}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.vaccinationRemarks && !!errors.vaccinationRemarks}
          helperText={touched.vaccinationRemarks && errors.vaccinationRemarks}
          className="textInput"
          sx={{ gridColumn: "span 1" }}
        />
      )}
      {ageInMonths >= 6 && ( //ageInMonths <= 11 &&
        <>
          <Box sx={{ gridColumn: "span 4" }}>
            <Header subtitle="Vitamin A Capsule 100,000 IU Status Information" />
          </Box>
          <DateInput
            label="Vitamin A Capsule 100,000 IU (MM/DD/YYYY)"
            name="vitAOneHTIU"
            value={selectedVitAOneHTIU}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitAOneHTIU")
            }
            error={!!touched.vitAOneHTIU && !!errors.vitAOneHTIU}
            helperText={touched.vitAOneHTIU && errors.vitAOneHTIU}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
        </>
      )}
      {ageInMonths > 12 && ageInMonths < 59 && (
        <>
          <Box sx={{ gridColumn: "span 4" }}>
            <Header subtitle="Vitamin A Capsule 200,000 IU Status Information" />
          </Box>
          <DateInput
            label="1 year old (MM/DD/YYYY)"
            name="vitATwoHTIUOneYear"
            value={selectedVitATwoHTIUOneYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUOneYear")
            }
            error={!!touched.vitATwoHTIUOneYear && !!errors.vitATwoHTIUOneYear}
            helperText={touched.vitATwoHTIUOneYear && errors.vitATwoHTIUOneYear}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="1.6 years old (MM/DD/YYYY)"
            name="vitATwoHTIUOneSixYear"
            value={selectedVitATwoHTIUOneSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUOneSixYear")
            }
            error={
              !!touched.vitATwoHTIUOneSixYear && !!errors.vitATwoHTIUOneSixYear
            }
            helperText={
              touched.vitATwoHTIUOneSixYear && errors.vitATwoHTIUOneSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="2 years old (MM/DD/YYYY)"
            name="vitATwoHTIUTwoYear"
            value={selectedVitATwoHTIUTwoYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUTwoYear")
            }
            error={!!touched.vitATwoHTIUTwoYear && !!errors.vitATwoHTIUTwoYear}
            helperText={touched.vitATwoHTIUTwoYear && errors.vitATwoHTIUTwoYear}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="2.6 years old (MM/DD/YYYY)"
            name="vitATwoHTIUTwoSixYear"
            value={selectedVitATwoHTIUTwoSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUTwoSixYear")
            }
            error={
              !!touched.vitATwoHTIUTwoSixYear && !!errors.vitATwoHTIUTwoSixYear
            }
            helperText={
              touched.vitATwoHTIUTwoSixYear && errors.vitATwoHTIUTwoSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="3 years old (MM/DD/YYYY)"
            name="vitATwoHTIUThreeYear"
            value={selectedVitATwoHTIUThreeYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUThreeYear")
            }
            error={
              !!touched.vitATwoHTIUThreeYear && !!errors.vitATwoHTIUThreeYear
            }
            helperText={
              touched.vitATwoHTIUThreeYear && errors.vitATwoHTIUThreeYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="3.6 years old (MM/DD/YYYY)"
            name="vitATwoHTIUThreeSixYear"
            value={selectedVitATwoHTIUThreeSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUThreeSixYear")
            }
            error={
              !!touched.vitATwoHTIUThreeSixYear &&
              !!errors.vitATwoHTIUThreeSixYear
            }
            helperText={
              touched.vitATwoHTIUThreeSixYear && errors.vitATwoHTIUThreeSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="4 years old (MM/DD/YYYY)"
            name="vitATwoHTIUFourYear"
            value={selectedVitATwoHTIUFourYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUFourYear")
            }
            error={
              !!touched.vitATwoHTIUFourYear && !!errors.vitATwoHTIUFourYear
            }
            helperText={
              touched.vitATwoHTIUFourYear && errors.vitATwoHTIUFourYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="4.6 years old (MM/DD/YYYY)"
            name="vitATwoHTIUFourSixYear"
            value={selectedVitATwoHTIUFourSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUFourSixYear")
            }
            error={
              !!touched.vitATwoHTIUFourSixYear &&
              !!errors.vitATwoHTIUFourSixYear
            }
            helperText={
              touched.vitATwoHTIUFourSixYear && errors.vitATwoHTIUFourSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="5 years old (MM/DD/YYYY)"
            name="vitATwoHTIUFiveYear"
            value={selectedVitATwoHTIUFiveYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "vitATwoHTIUFiveYear")
            }
            error={
              !!touched.vitATwoHTIUFiveYear && !!errors.vitATwoHTIUFiveYear
            }
            helperText={
              touched.vitATwoHTIUFiveYear && errors.vitATwoHTIUFiveYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />

          <Box sx={{ gridColumn: "span 4" }}>
            <Header subtitle="Deworming" />
          </Box>
          <DateInput
            label="1 year old (MM/DD/YYYY)"
            name="dewormingOneYear"
            value={selectedDewormingOneYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingOneYear")
            }
            error={!!touched.dewormingOneYear && !!errors.dewormingOneYear}
            helperText={touched.dewormingOneYear && errors.dewormingOneHTIU}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="1.6 years old (MM/DD/YYYY)"
            name="dewormingOneSixYear"
            value={selectedDewormingOneSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingOneSixYear")
            }
            error={
              !!touched.dewormingOneSixYear && !!errors.dewormingOneSixYear
            }
            helperText={
              touched.dewormingOneSixYear && errors.dewormingOneSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="2 years old (MM/DD/YYYY)"
            name="dewormingTwoYear"
            value={selectedDewormingTwoYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingTwoYear")
            }
            error={!!touched.dewormingTwoYear && !!errors.dewormingTwoYear}
            helperText={touched.dewormingTwoYear && errors.dewormingTwoYear}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="2.6 years old (MM/DD/YYYY)"
            name="dewormingTwoSixYear"
            value={selectedDewormingTwoSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingTwoSixYear")
            }
            error={
              !!touched.dewormingTwoSixYear && !!errors.dewormingTwoSixYear
            }
            helperText={
              touched.dewormingTwoSixYear && errors.dewormingTwoSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="3 years old (MM/DD/YYYY)"
            name="dewormingThreeYear"
            value={selectedDewormingThreeYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingThreeYear")
            }
            error={!!touched.dewormingThreeYear && !!errors.dewormingThreeYear}
            helperText={touched.dewormingThreeYear && errors.dewormingThreeYear}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="3.6 years old (MM/DD/YYYY)"
            name="dewormingThreeSixYear"
            value={selectedDewormingThreeSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingThreeSixYear")
            }
            error={
              !!touched.dewormingThreeSixYear && !!errors.dewormingThreeSixYear
            }
            helperText={
              touched.dewormingThreeSixYear && errors.dewormingThreeSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="4 years old (MM/DD/YYYY)"
            name="dewormingFourYear"
            value={selectedDewormingFourYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingFourYear")
            }
            error={!!touched.dewormingFourYear && !!errors.dewormingFourYear}
            helperText={touched.dewormingFourYear && errors.dewormingFourYear}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="4.6 years old (MM/DD/YYYY)"
            name="dewormingFourSixYear"
            value={selectedDewormingFourSixYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingFourSixYear")
            }
            error={
              !!touched.dewormingFourSixYear && !!errors.dewormingFourSixYear
            }
            helperText={
              touched.dewormingFourSixYear && errors.dewormingFourSixYear
            }
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
          <DateInput
            label="5 years old (MM/DD/YYYY)"
            name="dewormingFiveYear"
            value={selectedDewormingFiveYear}
            onChange={(name, date) =>
              handleDateChange(name, date, "dewormingFiveYear")
            }
            error={!!touched.dewormingFiveYear && !!errors.dewormingFiveYear}
            helperText={touched.dewormingFiveYear && errors.dewormingFiveYear}
            className="dateInput"
            sx={{ gridColumn: "span 1" }}
            selectedDate={selectedDate}
            required={false}
          />
        </>
      )}
      {/* <MenuSelect
        label="Deworming"
        name="deworming"
        value={values.deworming}
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.deworming && !!errors.deworming}
        helperText={touched.deworming && errors.deworming}
        options={[
          { value: "", label: "Select", isDisabled: true }, // Add a null option
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        sx={{ gridColumn: "span 1" }}
      /> */}
    </>
  );
};

export default ChildHealthInformation;
