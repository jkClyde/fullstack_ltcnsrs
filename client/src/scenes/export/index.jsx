import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelExportButton = () => {
  const [data, setData] = useState([]);
  const [childHealthInfo, setChildHealthInfo] = useState({});

  useEffect(() => {
    // Fetch data from the primarychild API
    fetch('http://127.0.0.1:8000/primarychild')
      .then((response) => response.json())
      .then((primaryChildData) => {
        setData(primaryChildData);
      })
      .catch((error) => {
        console.error('Error fetching primary child data:', error);
      });
  }, []);

  const exportToExcel = async () => {
    // Fetch additional data for each child from childhealthinfo
    const healthInfoPromises = data.map((child) =>
      fetch(`http://127.0.0.1:8000/childhealthinfo/?childHealth_id=${child.id}`)
        .then((response) => response.json())
        .then((childHealth) => ({ [child.id]: childHealth }))
    );

    // Wait for all promises to resolve
    const healthInfoData = await Promise.all(healthInfoPromises);

    // Combine primary child data with health info
    const combinedData = data.map((child) => ({
      ...child,
      healthInfo: healthInfoData.find((health) => health[child.id]),
    }));
    console.log(combinedData)

    // Format your data
    const formattedData = combinedData.map((item, index) => ({
      No: index + 1,
      'Name Of Child': item.fullName,
      Sex: item.gender,
      'DoB(M/D/Y)': item.birthdate,
      'DoW(M/D/Y)': item.dow,
      AIM: item.aim,
      Address: item.barangay,
      'P/T': item.pt,
      Ethnicity: item.ethnicity,
      // Include additional health info
      'Dow Health': item.healthInfo ? item.healthInfo.dow : '',
      'Height Health': item.healthInfo ? item.healthInfo.height : '',
      'Weight Health': item.healthInfo ? item.healthInfo.weight : '',
      'Vac Health': item.healthInfo ? item.healthInfo.vac : '',
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData, {
      header: Object.keys(formattedData[0]), // Use formattedData keys as headers
    });

    // Add styles for header cells
    const headerCellStyle = {
      fill: { fgColor: { rgb: 'D3D3D3' } }, // Light Gray background color
      font: { bold: true, color: { rgb: 'FFFFFF' } }, // Bold text with White color
    };

    const headerRange = XLSX.utils.decode_range(ws['!ref']);
    for (let i = headerRange.s.r; i <= headerRange.e.r; i++) {
      for (let j = headerRange.s.c; j <= headerRange.e.c; j++) {
        const headerCellAddress = XLSX.utils.encode_cell({ r: i, c: j });
        ws[headerCellAddress].s = headerCellStyle;
      }
    }

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Save the workbook to a file
    XLSX.writeFile(wb, 'exported_data.xlsx');
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExcelExportButton;
