import React, { useContext } from "react";
import "./TextInput.css";
import { useMode } from "../../../theme"; // Import the ColorModeContext from theme.js
import { useTheme } from "@mui/material/styles"; // Import useTheme from MUI



const TextInput = ({ label, name, value, onChange, error, helperText }) => {

 // Access the theme and colorMode using useContext
 const theme = useTheme();
 // Define your theme based on the current mode (light/dark)
 // Determine the color based on the current theme
 const inputColor = theme.palette.mode === "dark" ? "white" : "black";
  // Define background color based on dark mode
  const backgroundColor =
    theme.palette.mode === "dark" ? theme.palette.neutral.dark : theme.palette.background.default;

  return (
    <div className="textInput">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "error" : ""}
        style={{
            color: inputColor,
            borderColor: theme.palette.primary.main,
            backgroundColor: backgroundColor,
          }}
      />
      {error && <span className="errorText">{helperText}</span>}
    </div>
  );
};

export default TextInput;
