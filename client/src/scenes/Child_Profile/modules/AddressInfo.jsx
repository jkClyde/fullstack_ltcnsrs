import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import barangayOptions from "../../form/barangayOptions.js";
import ethnicityOptions from "../../form/ethnicityOptions.js";

const AddressInfo = ({
  renderTextField,
  isEditing,
  editedChild,
  handleInputChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {renderTextField(
          "House No. & Street",
          "houseNumberAndStreet",
          editedChild.houseNumberAndStreet
        )}
        {isEditing ? (
          <Box mt="16px">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="pt-select-label">Status of Residency</InputLabel>
              <Select
                fullWidth
                id="pt"
                name="pt"
                labelId="pt-select-label"
                label="Status of Residency"
                value={editedChild.pt}
                onChange={handleInputChange}
                variant="outlined"
              >
                <MenuItem value="Permanent">Permanent</MenuItem>
                <MenuItem value="Transient">Transient</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box>
            <Box padding="10px" borderRadius="5px" border="1px solid grey">
              <Typography variant="h6">Status of Residency</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.pt}
              </Typography>
            </Box>
          </Box>
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField("Sitio", "sitio", editedChild.sitio)}
        {renderTextField(
          "Length of Stay",
          "lengthOfStay",
          editedChild.lengthOfStay
        )}
      </Grid>
      <Grid item xs={4}>
        <Box mt="10px">
          {isEditing ? (
            <Box mt="10px">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="barangay-select-label">Barangay</InputLabel>
                <Select
                  labelId="barangay-select-label"
                  label="Barangay"
                  id="barangay-select"
                  name="barangay"
                  value={editedChild.barangay}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  {barangayOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Barangay:</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.barangay}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box mt="10px">
          {isEditing ? (
            <Box mt="16px">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="lengthOfStayType-select-label">type</InputLabel>
                <Select
                  fullWidth
                  id="lengthOfStayType"
                  name="lengthOfStayType"
                  labelId="lengthOfStayType-select-label"
                  label="type"
                  value={editedChild.lengthOfStayType}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  <MenuItem value="Year/s">Year/s</MenuItem>
                  <MenuItem value="Month/s">Month/s</MenuItem>
                  <MenuItem value="Week/s">Week/s</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">type</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.lengthOfStayType}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddressInfo;
