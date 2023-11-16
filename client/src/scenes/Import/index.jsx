import React, { useState } from 'react';
import { format, parse } from 'date-fns'; // Import the required functions

import * as XLSX from 'xlsx';


function formatDateToYYYYMMDD(excelDate) {
  const date = new Date(1900, 0, excelDate - 1); // Subtract 1 because Excel counts from 1/0/1900
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  
  return `${year}-${month}-${day}`;
}

const swapDayMonth = (originalDate) => {
  const [year, month, day] = originalDate.split('-');

  const temp = day
  const newDay = month;
  const newMonth = temp;

  return `${year}-${newDay}-${newMonth}`;
};


function mapGender(gender) {
  // Trim the input to remove leading and trailing whitespaces
  gender = gender.trim();

  if (gender === 'M') {
    return 'Male';
  } 
  else if (gender === 'F') {
    return 'Female';
  }
  // Handle other cases if needed
  return gender;
}


function mapPT(input){
    if (input === 'P'){
      return 'Permanent';
    }else if (input === "T"){
      return 'Transient'
    }
}

// New component for displaying success or failure message
const MessagePopup = ({ successCount, failureCount }) => {
  const successStyle = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#DFF2BF',
    color: 'green',
  };

  const failureStyle = {
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFBABA',
    color: 'red',
  };

  return (
    <div>
      {successCount > 0 && (
        <div style={successStyle}>
          {`Success: ${successCount} item${successCount !== 1 ? 's have been added to the database' : ''}.`}
        </div>
      )}
      {failureCount > 0 && (
        <div style={failureStyle}>
          {`Failed/Duplicate: ${failureCount} item${failureCount !== 1 ? 's' : ''}.`}
        </div>
      )}
    </div>
  );
};







function ExcelToJSON() {
  const [jsonData, setJsonData] = useState(null);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(-1);
  

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    
    const keyMapping = {
   
      "NAME OF CHILD": "fullName",
      "SEX": "gender",
      "DOB": "birthdate",
      "DOW": "dow",
      "Address": "address",
      "P/T": "pt",
      "NAME OF FATHER/ MOTHER": "parentName",
      "ETHNICITY OF FATHER/ MOTHER": "ethnicity",
      "OCCUPATION OF FATHER/MOTHER": "occupation",
      "HT" : "height",
      "WT" : "weight",
      "ADDRESS" : "address",
      "AIM": "aim",
      "barangay" : "barangay",

     //Poblacion
      "__EMPTY_1": "fullName",
      "__EMPTY_2": "gender",
      "__EMPTY_3": "birthdate",
      "__EMPTY_4": "dow",
      "__EMPTY_5": "weight",
      "__EMPTY_6" : 'height',
      "__EMPTY_11" : "address",
      "__EMPTY_12" : "pt",
      "__EMPTY_15" : "parentName",
      "__EMPTY_16": "ethnicity",
      "__EMPTY_17": "occupation",

    };

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const line7Value = sheet['A7'].v;
      const barangayName = line7Value.split(':')[1].trim();
      const formattedBarangayName = barangayName.charAt(0).toUpperCase() + barangayName.slice(1).toLowerCase();
      const barangayJSON = {
        barangay: formattedBarangayName
      };

      const json = XLSX.utils.sheet_to_json(sheet, { range: 8 }) ; 
      json.forEach(item => {
        Object.assign(item, barangayJSON);
      });

     
      // Transform the JSON data using the key mapping and date formatting
      const transformedData = json.map((item) => {
        const transformedItem = {};
        for (const sourceKey in item) {
          if (keyMapping[sourceKey]) {
            if (sourceKey === "DOB" || sourceKey ===  "DOW"  || sourceKey === "__EMPTY_4"|| sourceKey === "__EMPTY_3") {
              transformedItem[keyMapping[sourceKey]] = swapDayMonth(formatDateToYYYYMMDD(item[sourceKey]));
            } else if (sourceKey === "SEX" || sourceKey === "__EMPTY_2") {
              transformedItem[keyMapping[sourceKey]] = mapGender(item[sourceKey]);
            }else if(sourceKey == "P/T" || sourceKey === "__EMPTY_12"){
              transformedItem[keyMapping[sourceKey]] = mapPT(item[sourceKey]);
            }
              else {
              transformedItem[keyMapping[sourceKey]] = item[sourceKey];
            }
          }
        }
        console.log(transformedItem)
        return transformedItem;
      });

      setJsonData(transformedData);

      // Send the transformed JSON data to the server
      transformedData.forEach((item) => {
        fetch('http://127.0.0.1:8000/primarychild/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(item), // Send each item individually
        })
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              console.log('Data sent successfully to the server.');
              setSuccess((prevSuccess) => prevSuccess + 1); 
              
              return response.json(); // Parse the response body as JSON
            } else {
              console.error('Failed to send data to the server.');
              setFailed((prevFailed) => prevFailed + 1); 

            }
          })
          .then((data) => {
            const userID = data.id;

            const healthInfoItem = {
              child : userID,
              dow : item.dow,
              height : item.height,
              weight : item.weight,
              purga : item.purga,
              vac : item.vac
            };

            console.log(healthInfoItem)
          

            // Now send a POST request to http://127.0.0.1:8000/childhealthinfo/ with the id of userID
            return fetch('http://127.0.0.1:8000/childhealthinfo/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(healthInfoItem), // Assuming the server expects an object with 'id' property
            });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    };

    reader.readAsArrayBuffer(file);
  };  

  return (
    <div style={{ margin: '1%' }}>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          {/* <h2>JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
          <pre style={{ marginTop: '10px' }}>
            {(success > 0 || failed > 0) && (
              <MessagePopup successCount={success} failureCount={failed} />
              
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ExcelToJSON;
