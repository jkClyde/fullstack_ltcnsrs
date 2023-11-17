import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DuplicateTable = ({ data }) => {
  const [duplicates, setDuplicates] = useState([]);

  const findDuplicates = () => {
    const duplicateMap = {};
    const duplicatesList = [];

    data.forEach((item, index) => {
      const key = `${item.name}-${item.birthdate}-${item.firstBarangay}-${item.secondBarangay}`;

      if (duplicateMap[key]) {
        duplicatesList.push({
          index1: duplicateMap[key],
          index2: index,
          name: item.name,
          birthdate: item.birthdate,
          firstBarangay: item.firstBarangay,
          secondBarangay: item.secondBarangay,
        });
      } else {
        duplicateMap[key] = index;
      }
    });

    setDuplicates(duplicatesList);
  };

  return (
    <div style={{margin : '1%'}}>
 
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>First Barangay</TableCell>
              <TableCell>Second Barangay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {duplicates.map((duplicate, index) => (
              <TableRow key={index}>
                <TableCell>{duplicate.name}</TableCell>
                <TableCell>{duplicate.birthdate}</TableCell>
                <TableCell>{duplicate.firstBarangay}</TableCell>
                <TableCell>{duplicate.secondBarangay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DuplicateTable;
