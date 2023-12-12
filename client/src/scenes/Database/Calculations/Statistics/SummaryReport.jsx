import React, { useState, useEffect } from 'react';
import lengthForAgeStatus from '../lengthForAgeStatus';
import weightForAgeStatus from '../weightForAgeStatus';
import weigthForLengthStatus from '../weightForLengthStatus';
import axios from 'axios';
import databaseURL from '../../../../databaseURL';
import ReportTable from './ReportTable';
import {  Typography, Box,  Select, MenuItem } from '@mui/material';
import { generateInitialSummaryCount, updateSummary , getLatestQuarter} from './generateInitialSummaryCount';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReportHeader from './ReportHeader';

//REDUX
import { useDispatch, useSelector  } from 'react-redux';
import { setSelectedBarangayy } from '../../../../redux/actions';


const SummaryReport = () => {
  const dispatch = useDispatch();
  const [selectedBarangay, setSelectedBarangay] = useState('All Barangays'); // Set the default value to 'Cruz'
  const chosenBarangay = useSelector((state) => state.refresher.selectedBarangay);


  
  const [summaryCount, setSummaryCount] = useState(generateInitialSummaryCount());
  const [data, setData] = useState(null);
  const [dataProcessed, setDataProcessed] = useState(false);
  const [population, setPopulation] = useState(0)
  const barangays = ['All Barangays','Alno','Alapang', 'Pico', 'Wangal', 'Cruz', 'Poblacion', 'Puguis','Ambiong', 'Balili', 'Bahong', 'Beckel','Bineng', 'Betag', 'Lubas', 'Shilan', 'Tawang'];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setSummaryCount(generateInitialSummaryCount);
       let mergedData = []
       let filteredData = []
        const primaryChildResponse = await axios.get(`${databaseURL}/primarychild/`);
        const childHealthInfoResponse = await axios.get(`${databaseURL}/childhealthinfo/`);
       

        mergedData = primaryChildResponse.data.map((child) => ({
          ...child,
          ...childHealthInfoResponse.data.find((healthInfo) => healthInfo.child === child.id),
        }));
  
         filteredData =
          chosenBarangay === 'All Barangays' ? mergedData : mergedData.filter((item) => item.barangay === chosenBarangay);
  
        setData(filteredData);
        mergedData = [];
        filteredData = []
        setDataProcessed(false); // Reset dataProcessed flag when chosenBarangay changes
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [chosenBarangay]);

 // Tallying 
  useEffect(() => {
    if (data) {
      if (!dataProcessed) {
        data.forEach((patient) => {
          const latestQuarter = getLatestQuarter();
          if ( patient) {
            const lfa_status = lengthForAgeStatus(patient.birthdate, patient.height, patient.gender);
            const wfa_status = weightForAgeStatus(patient.birthdate, patient.weight, patient.gender);
            const wfl_status = weigthForLengthStatus(patient.birthdate, patient.height, patient.weight, patient.gender);
            setPopulation((prev) => prev + 1)
            // console.log(patient)
            try {
              switch (lfa_status) {
                case 'Severely Stunted':
                  updateSummary(setSummaryCount, patient.aim, 'LFA - SSt', patient.gender)
                  break;
                case 'Stunted':
                  updateSummary(setSummaryCount, patient.aim, 'LFA - St', patient.gender)
                  break;
                case 'Normal':
                  updateSummary(setSummaryCount, patient.aim, 'LFA - Normal', patient.gender)
                  break;
                case 'Tall':
                  updateSummary(setSummaryCount, patient.aim, 'LFA - Tall', patient.gender)
                  break;
                default:
                  break;
              }
            
              switch (wfa_status) {
                case 'Severely Underweight':
                  updateSummary(setSummaryCount, patient.aim, 'WFA - SUW', patient.gender)
               
            
                case 'Underweight':
                  updateSummary(setSummaryCount, patient.aim, 'WFA - UW', patient.gender)
             
                  break;
            
                case 'Normal':
                  updateSummary(setSummaryCount, patient.aim, 'WFA - Normal', patient.gender)
                  break;
            
                case 'Overweight':
                  updateSummary(setSummaryCount, patient.aim, 'WFA - OW', patient.gender)
                  break;
            
                case 'Weight N/A':
                  return;
            
                default:
                  break;
              }
            
              switch (wfl_status) {
                case 'Severely Wasted':
                  updateSummary(setSummaryCount, patient.aim, 'WFL/H - SW', patient.gender)
                  break;
                case 'Wasted':
                  updateSummary(setSummaryCount, patient.aim, 'WFL/H - MW', patient.gender)

                  break;
                case 'Normal':
                  updateSummary(setSummaryCount, patient.aim, 'WFL/H - Normal', patient.gender)
                  break;
                case 'Overweight':
                  updateSummary(setSummaryCount, patient.aim, 'WFL/H - OW', patient.gender)
                  break;
                case 'Obese':
                  updateSummary(setSummaryCount, patient.aim, 'WFL/H - Ob', patient.gender)
                  break;
                case 'Height not found':
                  break;
                default:
                  break;
              }
            } catch (error) {
              console.error('An error occurred in the switch statements:', error);
            }
            
          }
        });
        setDataProcessed(true);
      }
    }

  }, [data, dispatch, summaryCount, chosenBarangay]);

  //Fetching Data-------------------------------------------------------------------------------------------------
 const handleBarangayChange = (event) => {
    setSelectedBarangay(event.target.value);
    setSummaryCount(generateInitialSummaryCount);
  
    setSelectedBarangay(event.target.value);
    dispatch(setSelectedBarangayy(event.target.value))
   
  };
  const downloadAsPdf = (component, filename) => {
    const element = document.getElementById(component);
      const pdf = new jsPDF({
      orientation: 'landscape',
    });
  
    const margin = 14;
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', margin, margin, pdf.internal.pageSize.getWidth() - 2 * margin, pdf.internal.pageSize.getHeight() - 2 * margin);
  
      pdf.save(filename);
    });
  };

  return (
    <div style={{ overflow: 'auto' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
    <Typography variant="body1" component="div" sx={{ marginRight: '8px' }}>
      Barangay:
    </Typography>
    <Select
      label="Select Barangay"
      value={chosenBarangay}
      onChange={handleBarangayChange}
      sx={{ width: '200px' }} // Adjust the width as needed
    >
      {barangays.map((barangay) => (
        <MenuItem key={barangay} value={barangay}>
          {barangay === 'all' ? 'All Barangay' : barangay}
        </MenuItem>
      ))}
    </Select>
  </Box>

      <div>
        <button onClick={() => downloadAsPdf('reportTable', chosenBarangay+'_summaryReport')}>
          Download as PDF
        </button>
      </div>
    </Box>
  
    <div id="reportTable">
      <ReportHeader  barangay={chosenBarangay}/>
      <ReportTable summaryCount={summaryCount} chosenBarangay={chosenBarangay} />
    </div>
    <div style={{marginBottom : '10%'}}>

    </div>
  </div>
  
    );
  }

export default SummaryReport;
