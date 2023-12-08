import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../../components/dashboard_components/Header";

const IntakesInfo = ({
  renderTextField,
  isEditing,
  editedChild,
  handleInputChange,
}) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={4}>
        <Header subtitle="Vitamin A Capsule 100,000 IU" />
        {renderTextField(
          "Vitamin A 100,000 IU",
          "vitAOneHTIU",
          editedChild.vitAOneHTIU
        )}
      </Grid>
      <Grid item xs={4}>
        <Header subtitle="Vitamin A Capsule 200,000 IU" />

        {renderTextField(
          "Vitamin A 200,000 IU 1yr",
          "vitATwoHTIUOneYear",
          editedChild.vitATwoHTIUOneYear
        )}

        {renderTextField(
          "Vitamin A 200,000 IU 1.6yr",
          "vitATwoHTIUOneSixYear",
          editedChild.vitATwoHTIUOneSixYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 2yrs",
          "vitATwoHTIUTwoYear",
          editedChild.vitATwoHTIUTwoYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 2.6yrs",
          "vitATwoHTIUTwoSixYear",
          editedChild.vitATwoHTIUTwoSixYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 3yrs",
          "vitATwoHTIUThreeYear",
          editedChild.vitATwoHTIUThreeYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 3.6yrs",
          "vitATwoHTIUThreeSixYear",
          editedChild.vitATwoHTIUThreeSixYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 4yrs",
          "vitATwoHTIUFourYear",
          editedChild.vitATwoHTIUFourYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 4.6yrs",
          "vitATwoHTIUFourSixYear",
          editedChild.vitATwoHTIUFourSixYear
        )}
        {renderTextField(
          "Vitamin A 200,000 IU 5yrs",
          "vitATwoHTIUFiveYear",
          editedChild.vitATwoHTIUFiveYear
        )}
      </Grid>
      <Grid item xs={4}>
        <Header subtitle="Deworming" />

        {renderTextField(
          "Deworming 1yr",
          "dewormingOneYear",
          editedChild.dewormingOneYear
        )}

        {renderTextField(
          "Deworming 1.6yr",
          "dewormingOneSixYear",
          editedChild.dewormingOneSixYear
        )}
        {renderTextField(
          "Deworming 2yrs",
          "dewormingTwoYear",
          editedChild.dewormingTwoYear
        )}
        {renderTextField(
          "Deworming 2.6yrs",
          "dewormingTwoSixYear",
          editedChild.dewormingTwoSixYear
        )}
        {renderTextField(
          "Deworming 3yrs",
          "dewormingThreeYear",
          editedChild.dewormingThreeYear
        )}
        {renderTextField(
          "Deworming 3.6yrs",
          "dewormingThreeSixYear",
          editedChild.dewormingThreeSixYear
        )}
        {renderTextField(
          "Deworming 4yrs",
          "dewormingFourYear",
          editedChild.dewormingFourYear
        )}
        {renderTextField(
          "Deworming 4.6yrs",
          "dewormingFourSixYear",
          editedChild.dewormingFourSixYear
        )}
        {renderTextField(
          "Deworming 5yrs",
          "dewormingFiveYear",
          editedChild.dewormingFiveYear
        )}
      </Grid>
    </Grid>
  );
};

export default IntakesInfo;
