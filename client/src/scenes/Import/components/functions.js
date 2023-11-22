export function formatDateToYYYYMMDD(excelDate) {
    // excelDate =  excelDate.trim();
    const date = new Date(1900, 0, excelDate - 1); // Subtract 1 because Excel counts from 1/0/1900
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
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