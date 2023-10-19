import React from 'react';
import PropTypes from 'prop-types';
import './MenuSelect.css'; // Import the CSS file
import { useTheme } from "@mui/material/styles";
import Select from 'react-select';

const MenuSelect = ({ label, name, value, onChange, error, helperText, options }) => {
  const selectedOption = options.find((option) => option.value === value);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const inputColor = theme.palette.mode === "dark" ? "white" : "black";
  // Define background color based on dark mode
  const backgroundColor =
    theme.palette.mode === "dark" ? theme.palette.neutral.dark : theme.palette.background.default;

  const handleChange = (selectedOption) => {
    onChange(name, selectedOption.value ? selectedOption.value : "");
  };

  // Custom styles to remove manual input feature
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "2px",
      marginTop: "7px",
      width: "100%",
      backgroundColor: isDarkMode ? theme.palette.neutral.dark : theme.palette.background.default,
      borderColor: theme.palette.primary.main,
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? theme.palette.primary.main : 'transparent',
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'block',
      color: isDarkMode ? "white": "black",
    }),
  };

  return (
    <div className="menuSelect">
      <label htmlFor={name}>{label}</label>
      <Select
        name={name}
        value={selectedOption} // Pass the selected option, not just the value
        isSearchable={false} // Disable manual input
        styles={customStyles}
        onChange={handleChange}
        className={isDarkMode ? 'dark-theme' : 'light-theme'}
        options={options} // Pass the options as an array of objects
      />

      {error && <div className="error">{error}</div>}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
};

MenuSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default MenuSelect;
