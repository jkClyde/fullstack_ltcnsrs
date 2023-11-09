import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function formatDateToYYYYMMDD(excelDate) {
  const date = new Date(1900, 0, excelDate - 1); // Subtract 1 because Excel counts from 1/0/1900
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function mapGender(gender) {
  if (gender === 'M') {
    return 'Male';
  } else if (gender === 'F') {
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

function ExcelToJSON() {
  const [jsonData, setJsonData] = useState(null);

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Define a mapping object to map source keys to target keys
    const keyMapping = {
      "Name of Child": "fullName",
      "Address": "address",
      "P/T": "pt",
      "Sex": "gender",
      "DoB": "birthdate",
      "AIM": "aim",
      "Name of Mothe/Father": "parentName",
      "Occupation": "occupation",
      // "Given": "relationship",
      // "Ethnicity": "ethnicity",
      // "DoW": "barangay",
      "Address" : "barangay",

      "Height" : "height",
      "Weight" : "weight",
      "DoW" : "dow"
    };

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming you have only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON
      const json = XLSX.utils.sheet_to_json(sheet);

      // Transform the JSON data using the key mapping and date formatting
      const transformedData = json.map((item) => {
        const transformedItem = {};
        for (const sourceKey in item) {
          if (keyMapping[sourceKey]) {
            if (sourceKey === "DoB") {
              transformedItem[keyMapping[sourceKey]] = formatDateToYYYYMMDD(item[sourceKey]);
            }else if (sourceKey === "DoW"){
              transformedItem[keyMapping[sourceKey]] = formatDateToYYYYMMDD(item[sourceKey]);
            } else if (sourceKey === "Sex") {
              transformedItem[keyMapping[sourceKey]] = mapGender(item[sourceKey]);
            }else if(sourceKey == "P/T"){
              transformedItem[keyMapping[sourceKey]] = mapPT(item[sourceKey]);
            } else {
              transformedItem[keyMapping[sourceKey]] = item[sourceKey];
            }
          }
        }
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
            if (response.status === 200) {
              console.log('Data sent successfully to the server.');
            } else {
              console.error('Failed to send data to the server.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      {/* <h1>Excel to JSON Converter</h1> */}
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          <h2>JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ExcelToJSON;