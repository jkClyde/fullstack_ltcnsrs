import React, { useState, useEffect } from 'react';
import lengthForAgeStatus from '../lengthForAgeStatus';
import weightForAgeStatus from '../weightForAgeStatus';
import weigthForLengthStatus from '../weightForLengthStatus';
import axios from 'axios';
import { tokens } from '../../../../theme';
import databaseURL from '../../../../databaseURL';
import ReportTable from './ReportTable';
import {  Typography, Divider, Grid ,  Box,} from '@mui/material';

//REDUX
import { useDispatch } from 'react-redux';
import { setStats, setBarangayData } from '../../../../redux/actions';
const getLatestQuarter = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  
    let quarter;
  
    if (currentMonth <= 3) {
      quarter = '1st Quarter';
    } else if (currentMonth <= 6) {
      quarter = '2nd Quarter';
    } else if (currentMonth <= 9) {
      quarter = '3rd Quarter';
    } else {
      quarter = '4th Quarter';
    }
  
    return { year: currentYear, quarter };
  };

const SummaryReport = () => {
  const dispatch = useDispatch();
  const [lfa_severe, set_LFA_severe] = useState(0);
  const [lfa_stunted, set_LFA_stunted] = useState(0);
  const [lfa_normal, set_LFA_normal] = useState(0);
  const [lfa_tall, set_LFA_tall] = useState(0);

  const [wfa_severe, set_WFA_severe] = useState(0);
  const [wfa_underweight, set_WFA_underweight] = useState(0);
  const [wfa_normal, set_WFA_normal] = useState(0);
  const [wfa_overweight, set_WFA_overweight] = useState(0);

  const [wfl_severe, set_WFL_severe] = useState(0);
  const [wfl_wasted, set_WFL_wasted] = useState(0);
  const [wfl_normal, set_WFL_normal] = useState(0);
  const [wfl_overweight, set_WFL_overweight] = useState(0);
  const [wfl_obese, set_WFL_obese] = useState(0);
  const generateInitialSummaryCount = () => ({
    'WFA - Normal': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFA - OW': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFA - UW': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFA - SUW': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'LFA - Normal': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'LFA - Tall': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'LFA - St': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'LFA - SSt': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFL/H - Normal': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFL/H - OW': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFL/H - Ob': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFL/H - MW': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
    'WFL/H - SW': {
      '0-5 Months': { Boys: 0, Girls: 0 },
      '6-11 Months': { Boys: 0, Girls: 0 },
      '12-23 Months': { Boys: 0, Girls: 0 },
      '24-35 Months': { Boys: 0, Girls: 0 },
      '36-47 Months': { Boys: 0, Girls: 0 },
      '48-59 Months': { Boys: 0, Girls: 0 },
    },
  });

  const updateSummary = (patient_aim, category, patient_gender) => {
    if (patient_aim >= 0 && patient_aim <= 5) {
      const ageRange = '0-5 Months';
      setSummaryCount((prevSummaryCount) => ({
        ...prevSummaryCount,
        [category]: {
          ...prevSummaryCount[category],
          [ageRange]: {
            ...prevSummaryCount[category][ageRange],
            Boys: patient_gender === 'Male' ? prevSummaryCount[category][ageRange].Boys + 1 : prevSummaryCount[category][ageRange].Boys,
            Girls: patient_gender === 'Female' ? prevSummaryCount[category][ageRange].Girls + 1 : prevSummaryCount[category][ageRange].Girls,
          },
        },
      }));
    } else if (patient_aim >= 6 && patient_aim <= 11) {
      const ageRange = '6-11 Months';
      setSummaryCount((prevSummaryCount) => ({
        ...prevSummaryCount,
        [category]: {
          ...prevSummaryCount[category],
          [ageRange]: {
            ...prevSummaryCount[category][ageRange],
            Boys: patient_gender === 'Male' ? prevSummaryCount[category][ageRange].Boys + 1 : prevSummaryCount[category][ageRange].Boys,
            Girls: patient_gender === 'Female' ? prevSummaryCount[category][ageRange].Girls + 1 : prevSummaryCount[category][ageRange].Girls,
          },
        },
      }));
    } else if (patient_aim >= 12 && patient_aim <= 23) {
      const ageRange = '12-23 Months';
      setSummaryCount((prevSummaryCount) => ({
        ...prevSummaryCount,
        [category]: {
          ...prevSummaryCount[category],
          [ageRange]: {
            ...prevSummaryCount[category][ageRange],
            Boys: patient_gender === 'Male' ? prevSummaryCount[category][ageRange].Boys + 1 : prevSummaryCount[category][ageRange].Boys,
            Girls: patient_gender === 'Female' ? prevSummaryCount[category][ageRange].Girls + 1 : prevSummaryCount[category][ageRange].Girls,
          },
        },
      }));
    } else if (patient_aim >= 24 && patient_aim <= 35) {
      const ageRange = '24-35 Months';
      setSummaryCount((prevSummaryCount) => ({
        ...prevSummaryCount,
        [category]: {
          ...prevSummaryCount[category],
          [ageRange]: {
            ...prevSummaryCount[category][ageRange],
            Boys: patient_gender === 'Male' ? prevSummaryCount[category][ageRange].Boys + 1 : prevSummaryCount[category][ageRange].Boys,
            Girls: patient_gender === 'Female' ? prevSummaryCount[category][ageRange].Girls + 1 : prevSummaryCount[category][ageRange].Girls,
          },
        },
      }));
    } else if (patient_aim >= 36 && patient_aim <= 47) {
      const ageRange = '36-47 Months';
      setSummaryCount((prevSummaryCount) => ({
        ...prevSummaryCount,
        [category]: {
          ...prevSummaryCount[category],
          [ageRange]: {
            ...prevSummaryCount[category][ageRange],
            Boys: patient_gender === 'Male' ? prevSummaryCount[category][ageRange].Boys + 1 : prevSummaryCount[category][ageRange].Boys,
            Girls: patient_gender === 'Female' ? prevSummaryCount[category][ageRange].Girls + 1 : prevSummaryCount[category][ageRange].Girls,
          },
        },
      }));
    } else if (patient_aim >= 48 && patient_aim <= 59) {
      const ageRange = '48-59 Months';
      setSummaryCount((prevSummaryCount) => ({
        ...prevSummaryCount,
        [category]: {
          ...prevSummaryCount[category],
          [ageRange]: {
            ...prevSummaryCount[category][ageRange],
            Boys: patient_gender === 'Male' ? prevSummaryCount[category][ageRange].Boys + 1 : prevSummaryCount[category][ageRange].Boys,
            Girls: patient_gender === 'Female' ? prevSummaryCount[category][ageRange].Girls + 1 : prevSummaryCount[category][ageRange].Girls,
          },
        },
      }));
    }
  };
  
  const [summaryCount, setSummaryCount] = useState(generateInitialSummaryCount());

  
 
  
  const [data, setData] = useState(null);
  const [dataProcessed, setDataProcessed] = useState(false);
  const [population, setPopulation] = useState(0)
// Getting Barangay Stats----------------------------------------------------------------------------------------------------
  const [barangayData, setBarangayData] = useState({});
  const categoryValues = {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  };


 
  const updateBarangayData = (barangay, category, incrementBy = 1) => {
  try {
    setBarangayData((prev) => ({
      ...prev,
      [barangay]: {
        ...prev[barangay],
        [category]: prev[barangay][category] + incrementBy,
      },
    }));
  } catch (error) {
    console.error('Error updating barangay data:', error);
  }
};


  const barangays = ['Alno','Alapang', 'Pico', 'Wangal', 'Cruz', 'Poblacion', 'Puguis','Ambiong', 'Ambiong', 'Balili', 'Bahong', 'Beckel','Bineng', 'Betag', 'Lubas', 'Shilan', 'Tawang'];
  useEffect(() => {
    const initializeBarangayData = () => {
      const initialData = {};
      barangays.forEach((barangay) => {
        initialData[barangay] = { ...categoryValues };
      });
      setBarangayData(initialData);
    };

    initializeBarangayData();
  }, []); 

  
//Fetching Data-------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const primaryChildResponse = await axios.get(`${databaseURL}/primarychild/`);
        const childHealthInfoResponse = await axios.get(`${databaseURL}/childhealthinfo/`);

        const mergedData = primaryChildResponse.data.map((child) => ({
          ...child,
          ...childHealthInfoResponse.data.find((healthInfo) => healthInfo.child === child.id),
        }));

        setData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
            console.log(patient)
            try {
              switch (lfa_status) {
                case 'Severely Stunted':
                  set_LFA_severe((prev) => prev + 1);
                  updateSummary(patient.aim, 'LFA - SSt', patient.gender)
                  break;
                case 'Stunted':
                  set_LFA_stunted((prev) => prev + 1);
                  updateSummary(patient.aim, 'LFA - St', patient.gender)
                  break;
                case 'Normal':
                  set_LFA_normal((prev) => prev + 1);
                  updateSummary(patient.aim, 'LFA - Normal', patient.gender)
                  break;
                case 'Tall':
                  set_LFA_tall((prev) => prev + 1);
                  updateSummary(patient.aim, 'LFA - Tall', patient.gender)
                  break;
                default:
                  break;
              }
            
              switch (wfa_status) {
                case 'Severely Underweight':
                  set_WFA_severe((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFA - SUW', patient.gender)
                  try {
                    if (patient.barangay) {
                      updateBarangayData(patient.barangay, 'severe');
                    }
                  } catch (error) {
                    console.error('Error updating barangay data:', error);
                  }
                  break;
            
                case 'Underweight':
                  set_WFA_underweight((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFA - UW', patient.gender)
                  try {
                    if (patient.barangay) {
                      updateBarangayData(patient.barangay, 'underweight');
                    }
                  } catch (error) {
                    console.error('Error updating barangay data:', error);
                  }
                  break;
            
                case 'Normal':
                  set_WFA_normal((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFA - Normal', patient.gender)
                  try {
                    if (patient.barangay) {
                      updateBarangayData(patient.barangay, 'normal');
                    }
                  } catch (error) {
                    console.error('Error updating barangay data:', error);
                  }
                  break;
            
                case 'Overweight':
                  set_WFA_overweight((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFA - OW', patient.gender)
                  try {
                    if (patient.barangay) {
                      updateBarangayData(patient.barangay, 'overweight');
                    }
                  } catch (error) {
                    console.error('Error updating barangay data:', error);
                  }
                  break;
            
                case 'Weight N/A':
                  return;
            
                default:
                  break;
              }
            
              switch (wfl_status) {
                case 'Severely Wasted':
                  set_WFL_severe((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFL/H - SW', patient.gender)
                  break;
                case 'Wasted':
                  set_WFL_wasted((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFL/H - MW', patient.gender)

                  break;
                case 'Normal':
                  set_WFL_normal((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFL/H - Normal', patient.gender)
                  break;
                case 'Overweight':
                  set_WFL_overweight((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFL/H - OW', patient.gender)
                  break;
                case 'Obese':
                  set_WFL_obese((prev) => prev + 1);
                  updateSummary(patient.aim, 'WFL/H - Ob', patient.gender)
                  break;
                case 'Height not found':
                  // console.log('Height not found');
                  break;
                default:
                  // console.log(wfl_status);
                  break;
              }
            } catch (error) {
              console.error('An error occurred in the switch statements:', error);
            }
            
          }
        });

    
        setDataProcessed(true);
        console.log(summaryCount)
      }
    }

    dispatch(setStats({ lfa_severe: lfa_severe, lfa_normal : lfa_normal, lfa_stunted:lfa_stunted, lfa_tall:lfa_tall ,
      wfa_severe : wfa_severe,  wfa_underweight : wfa_underweight, wfa_normal : wfa_normal,  wfa_overweight : wfa_overweight,
      wfl_severe : wfl_severe , wfl_wasted : wfl_wasted, wfl_normal : wfl_normal, wfl_overweight : wfl_overweight, wfl_obese : wfl_obese,
      population : population}),
      ); 
  }, [data, dispatch, summaryCount]);

  const headingStyle = {
    fontFamily: 'Century, sans-serif',
    fontSize: '15px',

  };
  

  return (
    <div>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
    <div>
          <Typography variant="h2" component="div">
            Municipal Health Services Office
          </Typography>
          <Typography variant="h5" component="div">
            2023 - 4th quarter summary report
          </Typography>
        </div>
      <div>
      <Typography variant="h4" color="green">
            Download
          </Typography>
      </div>
    </Box>

    <ReportTable summaryCount={summaryCount} />
  </div>
    );
  }

export default SummaryReport;
