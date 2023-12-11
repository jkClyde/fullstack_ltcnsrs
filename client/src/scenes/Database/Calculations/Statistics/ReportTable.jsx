import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';


function ReportTable({summaryCount}) {
  return (

<Table size="small" style={{ margin: '0 auto', maxWidth: '98%' }}>    
    <TableHead>
        <TableRow style={{ background: '#f2f2f2' }}>
        <TableCell style={{ border: '1px solid #000', fontWeight: 'bold', verticalAlign: 'bottom' }}></TableCell>
        <TableCell colSpan={3} style={{ border: '1px solid #000', background: '#c5cae9', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>0-5 Mos</TableCell>
        <TableCell colSpan={3} style={{ border: '1px solid #000', background: '#bbdefb', fontWeight: 'bold', width: '1%', padding: 1, margin: 0  }}>6-11 Mos</TableCell>
        <TableCell colSpan={3} style={{ border: '1px solid #000', background: '#b3e0d3', fontWeight: 'bold', width: '1%', padding: 1, margin: 0   }}>12-23 Mos</TableCell>
        <TableCell colSpan={3} style={{ border: '1px solid #000', background: '#b2dfdb', fontWeight: 'bold', width: '1%', padding: 1, margin: 0  }}>24-35 Mos</TableCell>
        <TableCell colSpan={3} style={{ border: '1px solid #000', background: '#c8e6c9', fontWeight: 'bold', width: '1%', padding: 1, margin: 0  }}>36-47 Mos</TableCell>
        <TableCell colSpan={3} style={{ border: '1px solid #000', background: '#dcedc8', fontWeight: 'bold', width: '1%', padding: 1, margin: 0  }}>48-59 Mos</TableCell>
        <TableCell style={{ border: '1px solid #000', fontWeight: 'bold', verticalAlign: 'bottom' }}></TableCell>

        </TableRow>
        <TableRow style={{ background: '#f2f2f2' }}>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', verticalAlign: 'top' , width: '1%', padding: 1, margin: 0 }}>Category</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0  }}>Boys</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Girls</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Total</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Boys</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Girls</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Total</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Boys</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Girls</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Total</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Boys</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Girls</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Total</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Boys</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Girls</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Total</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Boys</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Girls</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', width: '1%', padding: 1, margin: 0 }}>Total</TableCell>
        <TableCell style={{ border: '1px solid #000', background: '#90a4ae', fontWeight: 'bold', verticalAlign: 'top', width: '1%', padding: 1, margin: 0 }}>Overall</TableCell>

        </TableRow>
    </TableHead>
    <TableBody>
        {Object.entries(summaryCount).map(([category, ageRanges]) => (
        <TableRow key={category}>
            <TableCell style={{ border: '1px solid #000', width: '1%', padding: 1, margin: 0,  }}>{category}</TableCell>
            {Object.entries(ageRanges).map(([ageRange, genders]) => (
            <React.Fragment key={ageRange}>
                <TableCell style={{ border: '1px solid #000', width: '1%', padding: 1, margin: 0,textAlign: 'center' }}>{genders.Boys}</TableCell>
                <TableCell style={{ border: '1px solid #000', width: '1%', padding: 1, margin: 0,textAlign: 'center' }}>{genders.Girls}</TableCell>
                <TableCell style={{ border: '1px solid #000', width: '1%', padding: 1, margin: 0,textAlign: 'center' }}>{genders.Boys + genders.Girls}</TableCell>
            </React.Fragment>
            ))}
            <TableCell style={{ border: '1px solid #000', background: '#d2e4ec',  }}>
            {Object.values(ageRanges).reduce((total, genders) => total + genders.Boys + genders.Girls, 0)}
            </TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
  )
}

export default ReportTable