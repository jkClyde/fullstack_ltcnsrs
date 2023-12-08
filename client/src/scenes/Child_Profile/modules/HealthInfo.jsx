// HealthInfo.js

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import disabilityOptions from "../../form/disabilityOptions.js";

const HealthInfo = ({
  renderTextField,
  isEditing,
  editedChild,
  handleInputChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField("Date of Weighing (DOW)", "dow", editedChild.dow)}
        {renderTextField("Weight", "weight", editedChild.weight, "kg")}
        {renderTextField("Height", "height", editedChild.height, "cm")}
        {renderTextField("MUAC", "muac", editedChild.muac, "cm")}
      </Grid>

      <Grid item xs={4}>
        {isEditing ? (
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="disability-select-label">Disability</InputLabel>
              <Select
                labelId="disability-select-label"
                label="Disability"
                id="disability-select"
                name="disability"
                value={editedChild.disability}
                onChange={handleInputChange}
              >
                {disabilityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Grid item xs={12}>
            <Box mt={1}>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Disability</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.disability}
                </Typography>
                {editedChild.disability === "Others" && (
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    {editedChild.otherDisability}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        )}
        {editedChild.disability === "Others" &&
          renderTextField(
            "Other Disability",
            "otherDisability",
            editedChild.otherDisability
          )}

        {isEditing ? (
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="bpe-select-label">
                Bilateral Pitting Edema
              </InputLabel>
              <Select
                labelId="bpe-select-label"
                label="Bilateral Pitting Edema"
                id="bpe-select"
                name="bpe"
                value={editedChild.bpe}
                onChange={handleInputChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Grid item xs={12}>
            <Box mt={1}>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Bilateral Pitting Edema:</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.bpe}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        style={{ margin: "0px 20px 0px 40px" }}
      />

      <Grid item xs={3}>
        {!isEditing &&
          renderTextField(
            "Weight For Age",
            "weightForAge",
            editedChild.weightForAge
          )}
        {!isEditing &&
          renderTextField(
            "Length For Age",
            "lengthForAge",
            editedChild.lengthForAge
          )}
        {!isEditing &&
          renderTextField(
            "Weight For Length",
            "weightForLength",
            editedChild.weightForLength
          )}
      </Grid>
    </Grid>
  );
};

export default HealthInfo;
