import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'; // Import the Select component from react-select
import './MenuInput.css'; // Import the CSS file
import { useTheme } from "@mui/material/styles";

const MenuInput = ({ label, name, value, onChange, error, helperText, options }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Create an options array in the required format for react-select
  const selectOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="menuInput">
      <label htmlFor={name}>{label}</label>
      <Select
        name={name}
        value={{ label: value, value: value }}
        options={selectOptions}
        onChange={(selectedOption) => onChange(name, selectedOption.value)}
        className={isDarkMode ? 'dark-theme' : 'light-theme'}
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: isDarkMode ? theme.palette.neutral.dark : theme.palette.background.default,
            borderColor: theme.palette.primary.main,
            padding: "6px",
            marginTop: "7px",
            width: "100%",
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? theme.palette.primary.main : 'transparent',
          }),
           singleValue: (provided) => ({
            ...provided,
            display: 'block',
            color: isDarkMode ? "white": "black",
          }),
        
        }}
      />
      {error && <div className="error">{error}</div>}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
};

MenuInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MenuInput;
