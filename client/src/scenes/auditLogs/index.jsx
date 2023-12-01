import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const AuditTable = () => {
  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://127.0.0.1:8000/audit/')
      .then((response) => response.json())
      .then((data) => {
        // Sort the data based on the 'time_created' field in descending order
        const sortedData = data.sort((a, b) => new Date(b.time_created) - new Date(a.time_created));
        setAuditData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching audit data:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper} style={{ margin: '1%', width: '98%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', color: '#333', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f2f2f2' }}>Time Created</TableCell>
            <TableCell style={{ fontWeight: 'bold', color: '#333', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f2f2f2' }}>User</TableCell>
            <TableCell style={{ fontWeight: 'bold', color: '#333', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f2f2f2' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auditData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time_created}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditTable;