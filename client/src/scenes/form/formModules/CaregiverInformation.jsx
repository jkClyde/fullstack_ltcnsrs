import React from "react";
import { Divider, Typography, Box } from "@mui/material";
import TextInput from "../formComponents/TextInput";
import DateInput from "../formComponents/DateInput";
import MenuSelect from "../formComponents/MenuSelect";
import MenuInput from "../formComponents/MenuInput";
import barangayOptions from "./../barangayOptions";
import ethnicityOptions from "./../barangayOptions";
import Header from "../../../components/dashboard_components/Header";

const CaregiverInformation = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <>
      <Box sx={{ gridColumn: "span 4" }}>
        <Header subtitle="Father's Information" />
      </Box>

      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Father's Surname"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherSurname}
        name="fatherSurname"
        error={!!touched.fatherSurname && !!errors.fatherSurname}
        helperText={touched.fatherSurname && errors.fatherSurname}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Father's First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherFirstName}
        name="fatherFirstName"
        error={!!touched.fatherFirstName && !!errors.fatherFirstName}
        helperText={touched.fatherFirstName && errors.fatherFirstName}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Father's Middle Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherMiddleName}
        name="fatherMiddleName"
        error={!!touched.fatherMiddleName && !!errors.fatherMiddleName}
        helperText={touched.fatherMiddleName && errors.fatherMiddleName}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Suffix"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherSuffix}
        name="fatherSuffix"
        error={!!touched.fatherSuffix && !!errors.fatherSuffix}
        helperText={touched.fatherSuffix && errors.fatherSuffix}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Father's Age"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherAge}
        name="fatherAge"
        error={!!touched.fatherAge && !!errors.fatherAge}
        helperText={touched.fatherAge && errors.fatherAge}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="Father's Ethnicity"
        onBlur={handleBlur}
        value={values.fatherEthnicity}
        name="fatherEthnicity"
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.fatherEthnicity && !!errors.fatherEthnicity}
        helperText={touched.fatherEthnicity && errors.fatherEthnicity}
        sx={{ gridColumn: "span 1" }}
        options={ethnicityOptions.map((option) => ({
          value: option,
          label: option,
        }))}
      />

      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Father's Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherOccupation}
        name="fatherOccupation"
        error={!!touched.fatherOccupation && !!errors.fatherOccupation}
        helperText={touched.fatherOccupation && errors.fatherOccupation}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Father's Religion"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherReligion}
        name="fatherReligion"
        error={!!touched.fatherReligion && !!errors.fatherReligion}
        helperText={touched.fatherReligion && errors.fatherReligion}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Father's Contact Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fatherContact}
        name="fatherContact"
        error={!!touched.fatherContact && !!errors.fatherContact}
        helperText={touched.fatherContact && errors.fatherContact}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <Box sx={{ gridColumn: "span 4" }}>
        <Header subtitle="Mother's Information" />
      </Box>

      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Mother's Surname"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherSurname}
        name="motherSurname"
        error={!!touched.motherSurname && !!errors.motherSurname}
        helperText={touched.motherSurname && errors.motherSurname}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Mother's First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherFirstName}
        name="motherFirstName"
        error={!!touched.motherFirstName && !!errors.motherFirstName}
        helperText={touched.motherFirstName && errors.motherFirstName}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Mother's Middle Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherMiddleName}
        name="motherMiddleName"
        error={!!touched.motherMiddleName && !!errors.motherMiddleName}
        helperText={touched.motherMiddleName && errors.motherMiddleName}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Mother's Age"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherAge}
        name="motherAge"
        error={!!touched.motherAge && !!errors.motherAge}
        helperText={touched.motherAge && errors.motherAge}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="Mother's Ethnicity"
        onBlur={handleBlur}
        value={values.motherEthnicity}
        name="motherEthnicity"
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.motherEthnicity && !!errors.motherEthnicity}
        helperText={touched.motherEthnicity && errors.motherEthnicity}
        sx={{ gridColumn: "span 1" }}
        options={ethnicityOptions.map((option) => ({
          value: option,
          label: option,
        }))}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Mother's Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherOccupation}
        name="motherOccupation"
        error={!!touched.motherOccupation && !!errors.motherOccupation}
        helperText={touched.motherOccupation && errors.motherOccupation}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Mother's Religion"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherReligion}
        name="motherReligion"
        error={!!touched.motherReligion && !!errors.motherReligion}
        helperText={touched.motherReligion && errors.motherReligion}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Mother's Contact Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.motherContact}
        name="motherContact"
        error={!!touched.motherContact && !!errors.motherContact}
        helperText={touched.motherContact && errors.motherContact}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <Box sx={{ gridColumn: "span 4" }}>
        <Header subtitle="Caregiver's Information" />
      </Box>

      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Surname"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverSurname}
        name="caregiverSurname"
        error={!!touched.caregiverSurname && !!errors.caregiverSurname}
        helperText={touched.caregiverSurname && errors.caregiverSurname}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverFirstName}
        name="caregiverFirstName"
        error={
          !!touched.caregiverFirstName && !!caregiverFirstName.caregiverSurname
        }
        helperText={
          touched.caregiverFirstName && caregiverFirstName.caregiverSurname
        }
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Middle Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverMiddleName}
        name="caregiverMiddleName"
        error={!!touched.caregiverMiddleName && !!errors.caregiverMiddleName}
        helperText={touched.caregiverMiddleName && errors.caregiverMiddleName}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Suffix"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverSuffix}
        name="caregiverSuffix"
        error={!!touched.caregiverSuffix && !!errors.caregiverSuffix}
        helperText={touched.caregiverSuffix && errors.caregiverSuffix}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Relationship to Child"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverRelationship}
        name="caregiverRelationship"
        error={
          !!touched.caregiverRelationship && !!errors.caregiverRelationship
        }
        helperText={
          touched.caregiverRelationship && errors.caregiverRelationship
        }
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Age"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverAge}
        name="caregiverAge"
        error={!!touched.caregiverAge && !!errors.caregiverAge}
        helperText={touched.caregiverAge && errors.caregiverAge}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverOccupation}
        name="caregiverOccupation"
        error={!!touched.caregiverOccupation && !!errors.caregiverOccupation}
        helperText={touched.caregiverOccupation && errors.caregiverOccupation}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Caregiver's Religion"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverReligion}
        name="caregiverReligion"
        error={!!touched.caregiverReligion && !!errors.caregiverReligion}
        helperText={touched.caregiverReligion && errors.caregiverReligion}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Caregiver's Contact Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.caregiverContact}
        name="caregiverContact"
        error={!!touched.caregiverContact && !!errors.caregiverContact}
        helperText={touched.caregiverContact && errors.caregiverContact}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
    </>
  );
};

export default CaregiverInformation;
