import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming you have only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON
      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ margin: '1%' }}>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          <h2>JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelReader;