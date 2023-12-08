import React from "react";
import { Divider, Typography, Box } from "@mui/material";
import Header from "../../../components/dashboard_components/Header";
import TextInput from "../formComponents/TextInput";
import DateInput from "../formComponents/DateInput";
import MenuSelect from "../formComponents/MenuSelect";
import MenuInput from "../formComponents/MenuInput";
import barangayOptions from "./../barangayOptions";

const ChildInformation = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  handleDateChange,
  selectedBirthdate,
  selectedDate,
}) => {
  return (
    <>
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Surname"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.surname}
        name="surname"
        error={!!touched.surname && !!errors.surname}
        helperText={touched.surname && errors.surname}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstname}
        name="firstname"
        error={!!touched.firstname && !!errors.firstname}
        helperText={touched.firstname && errors.firstname}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Middle Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.middlename}
        name="middlename"
        error={!!touched.middlename && !!errors.middlename}
        helperText={touched.middlename && errors.middlename}
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
        value={values.suffix}
        name="suffix"
        error={!!touched.suffix && !!errors.suffix}
        helperText={touched.suffix && errors.suffix}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="Sex"
        name="gender"
        value={values.gender}
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.gender && !!errors.gender}
        helperText={touched.gender && errors.gender}
        options={[
          { value: "", label: "Select", isDisabled: true },
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        sx={{ gridColumn: "span 1" }}
      />
      <DateInput
        label="Birthdate (MM/DD/YYYY)"
        name="birthdate"
        value={selectedBirthdate}
        onChange={(name, date) => handleDateChange(name, date, "birthdate")}
        error={!!touched.birthdate && !!errors.birthdate}
        helperText={touched.birthdate && errors.birthdate}
        className="dateInput"
        sx={{ gridColumn: "span 1" }}
        selectedDate={selectedDate}
        required={true}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Birth Weight (kg)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.birthWeight}
        name="birthWeight"
        error={!!touched.birthWeight && !!errors.birthWeight}
        helperText={touched.birthWeight && errors.birthWeight}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Birth Order"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.birthOrder}
        name="birthOrder"
        error={!!touched.birthOrder && !!errors.birthOrder}
        helperText={touched.birthOrder && errors.birthOrder}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <Box sx={{ gridColumn: "span 4" }}>
        <Header subtitle="Address" />
      </Box>
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="House No. & Street"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.houseNumberAndStreet}
        name="houseNumberAndStreet"
        error={!!touched.houseNumberAndStreet && !!errors.houseNumberAndStreet}
        helperText={touched.houseNumberAndStreet && errors.houseNumberAndStreet}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="text"
        label="Sitio"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sitio}
        name="sitio"
        error={!!touched.sitio && !!errors.sitio}
        helperText={touched.sitio && errors.sitio}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <MenuInput
        label="Barangay"
        name="barangay"
        value={values.barangay}
        onChange={(name, value) => setFieldValue(name, value)}
        error={!!touched.barangay && !!errors.barangay}
        helperText={touched.barangay && errors.barangay}
        options={barangayOptions}
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="Status of Residency"
        name="pt"
        value={values.pt}
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.pt && !!errors.pt}
        helperText={touched.pt && errors.pt}
        options={[
          { value: "", label: "Select", isDisabled: true }, // Add a null option
          { value: "Permanent", label: "Permanent" },
          { value: "Transient", label: "Transient" },
        ]}
        sx={{ gridColumn: "span 1" }}
      />
      <TextInput
        fullWidth
        variant="filled"
        type="number"
        label="Length of Stay"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lengthOfStay}
        name="lengthOfStay"
        error={!!touched.lengthOfStay && !!errors.lengthOfStay}
        helperText={touched.lengthOfStay && errors.lengthOfStay}
        className="textInput"
        sx={{ gridColumn: "span 1" }}
      />
      <MenuSelect
        label="type"
        name="lengthOfStayType"
        value={values.lengthOfStayType}
        onChange={(name, value) => {
          setFieldValue(name, value);
        }}
        error={!!touched.lengthOfStayType && !!errors.lengthOfStayType}
        helperText={touched.lengthOfStayType && errors.lengthOfStayType}
        options={[
          { value: "", label: "Select", isDisabled: true }, // Add a null option
          { value: "Year/s", label: "Year/s" },
          { value: "Month/s", label: "Month/s" },
          { value: "Week/s", label: "Week/s" },
        ]}
        sx={{ gridColumn: "span 1" }}
      />
    </>
  );
};

export default ChildInformation;
