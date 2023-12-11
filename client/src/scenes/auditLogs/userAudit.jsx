import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import databaseURL from '../../databaseURL';

const UserAudit = () => {
  const [auditData, setAuditData] = useState([]);
  const [userData, setUserData] = useState([]);
  const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data and audit data in parallel
        const [userResponse, auditResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${storedToken.data.access}`,
            },
          }),
          fetch(`${databaseURL}/audit/`),
        ]);

        const userData = await userResponse.json();
        const auditData = await auditResponse.json();

        // Sort the audit data based on the 'time_created' field in descending order
        const sortedAuditData = auditData.sort((a, b) => new Date(b.time_created) - new Date(a.time_created));

        // Set the state with the fetched data
        setUserData(userData);
        setAuditData(sortedAuditData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter auditData based on user data
  const filteredAuditData = auditData.filter((row) => {
    // Assuming row.user is a combination of first_name and last_name
    const userFullName = `${userData.first_name} ${userData.last_name}`;
    return row.user === userFullName;
  });

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
          {filteredAuditData.map((row) => (
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

export default UserAudit;
