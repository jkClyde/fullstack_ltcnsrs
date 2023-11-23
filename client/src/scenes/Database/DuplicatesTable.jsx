import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DuplicateTable = () => {
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('http://127.0.0.1:8000/duplicateChild/')
      .then(response => response.json())
      .then(data => setDuplicates(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div style={{ margin: '1%' }}>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell>First Barangay</TableCell> */}
              <TableCell>Barangay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {duplicates.map((duplicate, index) => (
              <TableRow key={index}>
                <TableCell>{duplicate.full_name}</TableCell>
                {/* <TableCell>{duplicate.first_barangay}</TableCell> */}
                <TableCell>{duplicate.second_barangay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DuplicateTable;
