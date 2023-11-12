import React, { useState } from 'react';
import * as ExcelJS from 'exceljs/dist/exceljs';

const ExcelProcessor = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(1);
        const jsonData = worksheet.getSheetValues();
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const duplicateDesign = () => {
    if (excelData) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('DuplicatedSheet');
      
      // Assuming excelData is a 2D array representing sheet data
      excelData.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const cellRef = ExcelJS.utils.encode_cell({ r: rowIndex + 1, c: columnIndex + 1 });
          const originalCell = worksheet.getCell(cellRef);
          const newCell = worksheet.getCell(cellRef);
          newCell.value = originalCell.value;
          newCell.font = originalCell.font;
          newCell.border = originalCell.border;
          newCell.fill = originalCell.fill;
          newCell.alignment = originalCell.alignment;
          newCell.numFmt = originalCell.numFmt;
        });
      });

      const buffer = workbook.xlsx.writeBuffer().then((buf) => {
        const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'DuplicatedDesign.xlsx';
        a.click();
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={duplicateDesign}>Duplicate Design</button>
    </div>
  );
};

export default ExcelProcessor;
