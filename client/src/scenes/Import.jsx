import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';

const ExcelReader = () => {
  const [sheetData, setSheetData] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Replace 'Nut_StatusTool' with your desired sheet name
      const sheetName = 'Nut_StatusTool';
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setSheetData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop an Excel file here, or click to select one</p>
      </div>
      <table>
        <thead>
          <tr>
            {sheetData.length > 0 &&
              Object.keys(sheetData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sheetData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

export default ExcelReader;
