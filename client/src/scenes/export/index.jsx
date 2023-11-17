import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from '@mui/material/Box';


const exportToExcel2 = (childData) => {
  if (!Array.isArray(childData)) {
    console.error('Invalid data format. Expected an array.');
    return;
  }

  const keyMapping = {
    "Child Seq": "id", // Assuming "id" is an auto-incremented property
    "Address or Location": "barangay",
    "Name of Mother or caregiver": "parentName",
    "Name of Child": "fullName",
    "Belongs to IP Group?" : null,
    "Sex": "gender",
    "Date of Birth": "birthdate",
    "Date Measured" : "dow",
    "Height": "height",
    "Weight": "weight",
  };

  // Map keys and format data
  const formattedData2 = childData.map((item, index) => {
    const formattedItem = {};
    Object.entries(keyMapping).forEach(([excelKey, dataKey]) => {
      if (Array.isArray(dataKey)) {
        // Handle cases where multiple data keys map to the same Excel key
        dataKey.forEach((dk) => {
          formattedItem[excelKey] = item[dk];
        });
      } else {
        // Check if the key is 'Sex' and map it to 'M' or 'F' based on the 'gender' property
        if (dataKey === 'gender') {
          formattedItem[excelKey] = item[dataKey] === 'Male' ? 'M' : 'F';
        } else if (dataKey === 'pt') {
          formattedItem[excelKey] = item[dataKey] === 'Permanent' ? 'P' : 'T';
        } else {
          formattedItem[excelKey] = item[dataKey];
        }
      }
    });
    // Add an auto-incremented index
    formattedItem['No'] = index + 1;

    return formattedItem;
  });

   // Map keys and format data
   const formattedData = childData.map((item, index) => {
    const formattedItem = {};
    Object.entries(keyMapping).forEach(([excelKey, dataKey]) => {
      if (Array.isArray(dataKey)) {
        // Handle cases where multiple data keys map to the same Excel key
        dataKey.forEach((dk) => {
          formattedItem[excelKey] = item[dk];
        });
      } else {
        // Check if the key is 'Sex' and map it to 'M' or 'F' based on the 'gender' property
        if (dataKey === 'gender') {
          formattedItem[excelKey] = item[dataKey] === 'Male' ? 'M' : 'F';
        } else if (dataKey === 'pt') {
          formattedItem[excelKey] = item[dataKey] === 'Permanent' ? 'P' : 'T';
        } else {
          formattedItem[excelKey] = item[dataKey];
        }
      }
    });
    // Add an auto-incremented index
    formattedItem['No'] = index + 1;

    return formattedItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const cellStyles = {
    header: {
      fill: { fgColor: { rgb: 'FFE5CC' } },
      font: { bold: true },
    },
    label: {
      font: { italic: true },
    },
    subLabel: {
      font: { color: { rgb: '808080' } },
    },
  };

  // Apply cell styles
  Object.keys(keyMapping).forEach((key, index) => {
    const cellReference = XLSX.utils.encode_cell({ c: index, r: 0 });
    if (cellStyles.header) worksheet[cellReference].s = cellStyles.header;
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'ChildData');

  XLSX.writeFile(workbook, 'eOPT_CNSRS_FORMAT.xlsx');
};



const exportToExcel = (childData) => {
  if (!Array.isArray(childData)) {
    console.error('Invalid data format. Expected an array.');
    return;
  }

  // Define key mapping
  const keyMapping = {
    "No": "id", // Assuming "id" is an auto-incremented property
    "Name of Child": "fullName",
    "DoB": "birthdate",
    "Sex": "gender",
    "DoW": "dow",
    "AIM": "aim",
    "Height": "height",
    "Weight": "weight",
    "Barangay": "barangay",
    "P/T": "pt",
    "Name of Mothe/Father": "parentName",
    "Ethnicity": "ethnicity",
    "Occupation": "occupation",
    "VAC": "vac", // Map "Given" to "VAC"
    "Purga": "purga",
  };

  // Map keys and format data
  const formattedData2 = childData.map((item, index) => {
    const formattedItem = {};
    Object.entries(keyMapping).forEach(([excelKey, dataKey]) => {
      if (Array.isArray(dataKey)) {
        // Handle cases where multiple data keys map to the same Excel key
        dataKey.forEach((dk) => {
          formattedItem[excelKey] = item[dk];
        });
      } else {
        // Check if the key is 'Sex' and map it to 'M' or 'F' based on the 'gender' property
        if (dataKey === 'gender') {
          formattedItem[excelKey] = item[dataKey] === 'Male' ? 'M' : 'F';
        } else if (dataKey === 'pt') {
          formattedItem[excelKey] = item[dataKey] === 'Permanent' ? 'P' : 'T';
        } else {
          formattedItem[excelKey] = item[dataKey];
        }
      }
    });
    // Add an auto-incremented index
    formattedItem['No'] = index + 1;

    return formattedItem;
  });

   // Map keys and format data
   const formattedData = childData.map((item, index) => {
    const formattedItem = {};
    Object.entries(keyMapping).forEach(([excelKey, dataKey]) => {
      if (Array.isArray(dataKey)) {
        // Handle cases where multiple data keys map to the same Excel key
        dataKey.forEach((dk) => {
          formattedItem[excelKey] = item[dk];
        });
      } else {
        // Check if the key is 'Sex' and map it to 'M' or 'F' based on the 'gender' property
        if (dataKey === 'gender') {
          formattedItem[excelKey] = item[dataKey] === 'Male' ? 'M' : 'F';
        } else if (dataKey === 'pt') {
          formattedItem[excelKey] = item[dataKey] === 'Permanent' ? 'P' : 'T';
        } else if (dataKey === 'birthdate'  ) {
           // Reformat date from YYYY-MM-DD to DD-MM-YYYY
          const dobParts = item[dataKey].split('-');
          formattedItem[excelKey] = dobParts[2] + '/' + dobParts[1] + '/' + dobParts[0];
        }
        else if (dataKey === 'dow' && item[dataKey]) {
          // Reformat date from YYYY-MM-DD to DD-MM-YYYY
          const dobParts = item[dataKey].split('-');
          formattedItem[excelKey] = dobParts[2] + '/' + dobParts[1] + '/' + dobParts[0];
        }
        else if (dataKey === 'vac' && item[dataKey]) {
          // Reformat date from YYYY-MM-DD to DD-MM-YYYY
          const dobParts = item[dataKey].split('-');
          formattedItem[excelKey] = dobParts[2] + '/' + dobParts[1] + '/' + dobParts[0];
        }
        else if (dataKey === 'purga' && item[dataKey]) {
          // Reformat date from YYYY-MM-DD to DD-MM-YYYY
          console.log([excelKey] = item[dataKey])
          const dobParts = item[dataKey].split('-');
          formattedItem[excelKey] = dobParts[2] + '/' + dobParts[1] + '/' + dobParts[0];
          
        }
        else {
          formattedItem[excelKey] = item[dataKey];
        }
      }
    });
    // Add an auto-incremented index
    formattedItem['No'] = index + 1;

    return formattedItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const cellStyles = {
    header: {
      fill: { fgColor: { rgb: 'FFE5CC' } },
      font: { bold: true },
    },
    label: {
      font: { italic: true },
    },
    subLabel: {
      font: { color: { rgb: '808080' } },
    },
  };

  // Apply cell styles
  Object.keys(keyMapping).forEach((key, index) => {
    const cellReference = XLSX.utils.encode_cell({ c: index, r: 0 });
    if (cellStyles.header) worksheet[cellReference].s = cellStyles.header;
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'ChildData');

  XLSX.writeFile(workbook, 'masterlist_CNSRS_format.xlsx');
};

const ExportButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));



function App() {
  const [childData, setChildData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const primaryChildResponse = await axios.get('http://127.0.0.1:8000/primarychild/');
        const childHealthInfoResponse = await axios.get('http://127.0.0.1:8000/childhealthinfo/');

        const mergedData = primaryChildResponse.data.map((child) => ({
          ...child,
          ...childHealthInfoResponse.data.find((healthInfo) => healthInfo.child === child.id),
        }));

        setChildData(mergedData);
        console.log(childData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin : "8%" }} >
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            onClick={() => exportToExcel(childData)}
          >
            Download in Master List Format
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            onClick={() => exportToExcel2(childData)}
          >
            Download in eOPT Format
          </Button>
        </Box>
    </div>
  );
}


export default App;
