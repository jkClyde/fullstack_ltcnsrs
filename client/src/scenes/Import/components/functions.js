export function formatDateToYYYYMMDD(excelDate) {
    // Convert excelDate to a string and trim spaces
    const trimmedExcelDate = String(excelDate).replace(/^\s+|\s+$/g, '');

    // if (!trimmedExcelDate) {
    //     return ''; // or handle it accordingly if it's empty or not a valid date
    // }

    const date = new Date(1900, 0, trimmedExcelDate - 1);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


export const swapDayMonth = (originalDate) => {
    const [year, month, day] = originalDate.split('-');
    const temp = day
    const newDay = month;
    const newMonth = temp;
  
    return `${year}-${newDay}-${newMonth}`;
  };
  

export function mapGender(gender) {
    // Trim the input to remove leading and trailing whitespaces
    gender = gender.trim();
    if (gender === 'M' || gender === "m") {
      return 'Male';
    } 
    else if (gender === 'F' || gender === "f") {
      return 'Female';
    }
    // Handle other cases if needed
    return gender;
  }
export function mapPT(input){
      if (input === 'P'){
        return 'Permanent';
      }else if (input === "T"){
        return 'Transient'
      }
  }