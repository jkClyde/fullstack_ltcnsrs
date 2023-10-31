
import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const ChildInfo = ({ child, isEditing, handleInputChange, getClassForStatusColorValue }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {renderNameFields()}
        {isEditing ? (
          // Render the gender field only when editing
          <Box mt="16px">
            <Select
              fullWidth
              id="gender-select"
              name="gender"
              label="Gender"
              value={child.gender}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>
        ) : (
          // Display gender information when not editing
          <Grid item xs={12}>
            <Box mt="1px">
              <Box
                padding="10px"
                borderRadius="5px"
                border="1px solid grey"
                className={getClassForStatusColorValue(child.gender)}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Gender:
                </Typography>
                <Typography variant="body1">{child.gender}</Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>

      <Grid item xs={3}>
        {renderTextField("Weight", "weight", child.weight, "kg")}
        {renderTextField("Height", "height", child.height, "cm")}
        {renderTextField("Date of Birth", "birthdate", child.birthdate)}
        {renderTextField("DOW", "dow", child.dow)}
      </Grid>

      <Grid item xs={3}>
        {renderTextField("Vaccination", "vac", child.vac)}
        {renderTextField("Purga", "purga", child.purga)}
        {renderTextField("Disability", "disability", child.disability)}
      </Grid>

      <Grid item xs={3}>
        {!isEditing && renderTextField("Age in Months", "aim", child.aim, "Months old")}
        {!isEditing && renderTextField("Weight For Age", "weightForAge", child.weightForAge)}
        {!isEditing && renderTextField("Length For Age", "lengthForAge", child.lengthForAge)}
        {!isEditing && renderTextField("Weight For Length", "weightForLength", child.weightForLength)}
      </Grid>
    </Grid>
  );

  function renderNameFields() {
    return (
      <>
        {renderTextField("First Name", "firstName", child.firstName)}
        {renderTextField("Middle Initial", "middleName", child.middleName)}
        {renderTextField("Last Name", "lastName", child.lastName)}
      </>
    );
  }

  function renderTextField(label, name, value, unit = "") {
    return (
      <Box mt="10px">
        {isEditing ? (
          name === "birthdate" || name === "dow" || name === "vac" || name === "purga" ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={label}
                value={value ? new Date(value) : null}
                onChange={(newValue) => {
                  const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                  const fakeEvent = { target: { name, value: formattedDate } };
                  handleInputChange(fakeEvent);
                }}
                renderInput={(params) => (
                  <OutlinedInput {...params} fullWidth label={label} />
                )}
              />
            </LocalizationProvider>
          ) : (
            <OutlinedInput
              fullWidth
              name={name}
              label={label}
              value={value}
              onChange={handleInputChange}
              style={{ marginTop: "10px" }}
            />
          )
        ) : (
          <Grid item xs={12}>
            <Box mb="10px">
              <Box
                padding="10px"
                borderRadius="5px"
                border="1px solid grey"
                className={getClassForStatusColorValue(value)}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {label}
                </Typography>
                <Typography variant="body1">
                  {value} {unit}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Box>
    );
  }
};

export default ChildInfo;
