import React, {useEffect} from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // Import a flatpickr theme (you can choose a different theme)
import { useTheme } from '@mui/material/styles';
import './DateInput.css';
import dayjs from 'dayjs';

const DateInput = ({ label, name, value, onChange, error, helperText, required }) => {
  const theme = useTheme();
  
  const isDarkMode = theme.palette.mode === 'dark';
console.log(isDarkMode);
useEffect(() => {
  const input = document.querySelector('.light-theme.flatpickr-input');
  if (input) {
    if (isDarkMode) {
      input.classList.remove('light-theme');
      input.classList.add('dark-theme');
    }
  }
}, [isDarkMode]);
useEffect(() => {
  const input = document.querySelector('.dark-theme.flatpickr-input');
  if (input) {
    if (!isDarkMode) {
      input.classList.remove('dark-theme');
      input.classList.add('light-theme');
    }
  }
}, [isDarkMode]);

  const isEmpty = !value; // Check if the date input is empty
  const handleDateChange = (selectedDates) => {
    onChange(name, selectedDates[0]);
  };


  return (
    <div className={"dateInput"}>
      <label htmlFor={name}>{label}</label>
      <Flatpickr
        name={name}
        value={value}
        id={name}
        onChange={handleDateChange}
        className={isDarkMode ? 'dark-theme' : 'light-theme'}
        options={{
          dateFormat: 'm/d/Y',
          allowInput: false,
          maxDate: dayjs().format('MM/DD/YYYY'),
        }}
      />
      
      {error && <div className="error">{error}</div>}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
};

export default DateInput;
