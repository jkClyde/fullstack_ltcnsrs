import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ChildInfo = ({
  renderTextField,
  isEditing,
  editedChild,
  handleInputChange,
}) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={4}>
        {renderTextField("Surname", "surname", editedChild.surname)}

        {renderTextField("Suffix", "suffix", editedChild.suffix)}

        {renderTextField("Birth Order", "birthOrder", editedChild.birthOrder)}
      </Grid>
      <Grid item xs={4}>
        {renderTextField("First Name", "firstname", editedChild.firstname)}

        {renderTextField(
          "Date of Birth (MM/DD/YYYY)",
          "birthdate",
          editedChild.birthdate
        )}
        {isEditing ? (
          <Box mt="10px">
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">Sex</InputLabel>
              <Select
                labelId="gender-select-label"
                label="Sex"
                id="gender-select"
                name="gender"
                value={editedChild.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Grid item xs={12}>
            <Box>
              <Box padding="10px" borderRadius="5px" border="1px solid grey">
                <Typography variant="h6">Sex</Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {editedChild.gender}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField("Middle Name", "middlename", editedChild.middlename)}
        {renderTextField(
          "Birth Weight",
          "birthWeight",
          editedChild.birthWeight
        )}

        {!isEditing &&
          renderTextField(
            "Age in Months",
            "aim",
            editedChild.aim,
            "Months old"
          )}
      </Grid>
    </Grid>
  );
};

export default ChildInfo;
