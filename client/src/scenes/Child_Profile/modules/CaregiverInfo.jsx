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
import Header from "../../../components/dashboard_components/Header";
import Divider from "@mui/material/Divider";

const CaregiverInfo = ({
  renderTextField,
  isEditing,
  editedChild,
  handleInputChange,
}) => {
  return (
    <Grid container spacing={2}>
      {/* First Column */}
      <Grid item xs={4}>
        <Header subtitle="Father's Information"></Header>
        {/* Father */}
        {renderTextField(
          "Father's Surname",
          "fatherSurname",
          editedChild.fatherSurname
        )}
        {renderTextField(
          "Father's Firstname",
          "fatherFirstName",
          editedChild.fatherFirstName
        )}
        {renderTextField(
          "Father's Suffix",
          "fatherSuffix",
          editedChild.fatherSuffix
        )}
        {renderTextField(
          "Father's Middlename",
          "fatherMiddleName",
          editedChild.fatherMiddleName
        )}
        {renderTextField(
          "Father's Age at Child's Birth",
          "fatherAge",
          editedChild.fatherAge
        )}
        {isEditing ? (
          <Box mt="10px">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="fatherEthnicity-select-label">
                Father's Ethnicity
              </InputLabel>
              <Select
                labelId="fatherEthnicity-select-label"
                label="fatherEthnicity"
                id="fatherEthnicity-select"
                name="fatherEthnicity"
                value={editedChild.fatherEthnicity}
                onChange={handleInputChange}
              >
                {ethnicityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box>
            <Box
              mt="0px"
              padding="10px"
              borderRadius="5px"
              border="1px solid grey"
            >
              <Typography variant="h6">Father's Ethnicity</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.fatherEthnicity}
              </Typography>
            </Box>
          </Box>
        )}
        {renderTextField(
          "Father's Occupation",
          "fatherOccupation",
          editedChild.fatherOccupation
        )}
        {renderTextField(
          "Father's Religion",
          "fatherReligion",
          editedChild.fatherReligion
        )}
        {renderTextField(
          "Father's Contact No.",
          "fatherContact",
          editedChild.fatherContact
        )}
        {/* Father */}
      </Grid>
      {/* Second Column */}
      <Grid item xs={4}>
        <Header subtitle="Mother's Information"></Header>
        {/* Mother */}
        {renderTextField(
          "Mother's Surname",
          "motherSurname",
          editedChild.motherSurname
        )}
        {renderTextField(
          "Mother's Firstname",
          "motherFirstName",
          editedChild.motherFirstName
        )}
        {renderTextField(
          "Mother's Middlename",
          "motherMiddleName",
          editedChild.motherMiddleName
        )}
        {renderTextField(
          "Mother's Age at Child's Birth",
          "motherAge",
          editedChild.motherAge
        )}
        {isEditing ? (
          <Box mt="10px">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="motherEthnicity-select-label">
                Mother's Ethnicity
              </InputLabel>
              <Select
                labelId="motherEthnicity-select-label"
                label="motherEthnicity"
                id="motherEthnicity-select"
                name="motherEthnicity"
                value={editedChild.motherEthnicity}
                onChange={handleInputChange}
              >
                {ethnicityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box>
            <Box
              mt="0px"
              padding="10px"
              borderRadius="5px"
              border="1px solid grey"
            >
              <Typography variant="h6">Mother's Ethnicity</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.motherEthnicity}
              </Typography>
            </Box>
          </Box>
        )}
        {renderTextField(
          "Mother's Occupation",
          "motherOccupation",
          editedChild.motherOccupation
        )}
        {renderTextField(
          "Mother's Religion",
          "motherReligion",
          editedChild.motherReligion
        )}
        {renderTextField(
          "Mother's Contact No.",
          "motherContact",
          editedChild.motherContact
        )}
        {/* Mother */}
      </Grid>
      {/* Third column */}
      <Grid item xs={4}>
        <Header subtitle="Caregiver's Information"></Header>

        {/* Caregiver */}
        {renderTextField(
          "Caregiver's Surname",
          "caregiverSurname",
          editedChild.caregiverSurname
        )}
        {renderTextField(
          "Caregiver's Firstname",
          "caregiverFirstName",
          editedChild.caregiverFirstName
        )}
        {renderTextField(
          "Caregiver's Suffix",
          "caregiverSuffix",
          editedChild.caregiverSuffix
        )}
        {renderTextField(
          "Caregiver's Middlename",
          "caregiverMiddleName",
          editedChild.caregiverMiddleName
        )}
        {renderTextField(
          "Caregiver's Age",
          "caregiverAge",
          editedChild.caregiverAge
        )}
        {isEditing ? (
          <Box mt="10px">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="caregiverEthnicity-select-label">
                Caregiver's Ethnicity
              </InputLabel>
              <Select
                labelId="caregiverEthnicity-select-label"
                label="caregiverEthnicity"
                id="caregiverEthnicity-select"
                name="caregiverEthnicity"
                value={editedChild.caregiverEthnicity}
                onChange={handleInputChange}
              >
                {ethnicityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box>
            <Box
              mt="0px"
              padding="10px"
              borderRadius="5px"
              border="1px solid grey"
            >
              <Typography variant="h6">Caregiver's Ethnicity</Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {editedChild.caregiverEthnicity}
              </Typography>
            </Box>
          </Box>
        )}
        {renderTextField(
          "Caregiver's Relationship to Child",
          "caregiverRelationship",
          editedChild.caregiverRelationship
        )}
        {renderTextField(
          "Caregiver's Occupation",
          "caregiverOccupation",
          editedChild.caregiverOccupation
        )}
        {renderTextField(
          "Caregiver's Religion",
          "caregiverReligion",
          editedChild.caregiverReligion
        )}
        {renderTextField(
          "Caregiver's Contact No.",
          "caregiverContact",
          editedChild.caregiverContact
        )}
        {/* Caregiver */}
      </Grid>
    </Grid>
  );
};

export default CaregiverInfo;
