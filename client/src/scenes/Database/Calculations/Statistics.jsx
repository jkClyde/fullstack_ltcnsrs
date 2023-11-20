import React, { useState, useEffect } from 'react';
import lengthForAgeStatus from './lengthForAgeStatus';
import weightForAgeStatus from './weightForAgeStatus';
import weigthForLengthStatus from './weightForLengthStatus';
import axios from 'axios';
import { tokens } from '../../../theme';

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

const Statistics = () => {
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

  
 
  
  const [data, setData] = useState(null);
  const latestQuarter = getLatestQuarter();
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
        const primaryChildResponse = await axios.get('http://127.0.0.1:8000/primarychild/');
        const childHealthInfoResponse = await axios.get('http://127.0.0.1:8000/childhealthinfo/');

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

            try {
              switch (lfa_status) {
                case 'Severely Stunted':
                  set_LFA_severe((prev) => prev + 1);
                  break;
                case 'Stunted':
                  set_LFA_stunted((prev) => prev + 1);
                  break;
                case 'Normal':
                  set_LFA_normal((prev) => prev + 1);
                  break;
                case 'Tall':
                  set_LFA_tall((prev) => prev + 1);
                  break;
                default:
                  break;
              }
            
              switch (wfa_status) {
                case 'Severely Underweight':
                  set_WFA_severe((prev) => prev + 1);
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
                  break;
                case 'Wasted':
                  set_WFL_wasted((prev) => prev + 1);
                  break;
                case 'Normal':
                  set_WFL_normal((prev) => prev + 1);
                  break;
                case 'Overweight':
                  set_WFL_overweight((prev) => prev + 1);
                  break;
                case 'Obese':
                  set_WFL_obese((prev) => prev + 1);
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
      }
    }
  }, [data]);



  const LineData = [
    {
      id: "Severly Underweight",
      color: tokens("dark").redAccent[200],
      data: [
        {
          x: "Alapang",
          y: barangayData['Alapang']?.severe,
        },
        {
          x: "Alno",
          y: barangayData['Alno']?.severe,
        },
        {
          x: "Ambiong",
          y: barangayData['Ambiong']?.severe,
        },
        {
          x: "Balili",
          y: barangayData['Balili']?.severe,
        },
        {
          x: "Bahong",
          y: barangayData['Bahong']?.severe,
        },
        {
          x: "Beckel",
          y: barangayData['Beckel']?.severe,
        },
        {
          x: "Betag",
          y: barangayData['Betag']?.severe,
        },
        {
          x: "Bineng",
          y: barangayData['Bineng']?.severe,
        },
        {
          x: "Cruz",
          y: barangayData['Cruz']?.severe,
        },
        {
          x: "Lubas",
          y: barangayData['Lubas']?.severe,
        },
        {
          x: "Pico",
          y: barangayData['Pico']?.severe,
        },
        {
          x: "Poblacion",
          y: barangayData['Poblacion']?.severe,
        },
        {
          x: "Puguis",
          y: barangayData['Puguis']?.severe,
        },
        {
          x: "Shilan",
          y: barangayData['Shilan']?.severe,
        },
        {
          x: "Tawang ",
          y: barangayData['Tawang']?.severe,
        },
        {
          x: "Wangal ",
          y: barangayData['Wangal']?.severe,
        },
      ],
    },
    {
      id: "Underweight",
      color: tokens("dark").blueAccent[100],
      data: [
        {
          x: "Alapang",
          y: barangayData['Alapang']?.underweight,
        },
        {
          x: "Alno",
          y: barangayData['Alno']?.underweight,
        },
        {
          x: "Ambiong",
          y: barangayData['Ambiong']?.underweight,
        },
        {
          x: "Balili",
          y: barangayData['Balili']?.underweight,
        },
        {
          x: "Bahong",
          y: barangayData['Bahong']?.underweight,
        },
        {
          x: "Beckel",
          y: barangayData['Beckel']?.underweight,
        },
        {
          x: "Betag",
          y: barangayData['Betag']?.underweight,
        },
        {
          x: "Bineng",
          y: barangayData['Bineng']?.underweight,
        },
        {
          x: "Cruz",
          y: barangayData['Cruz']?.underweight,
        },
        {
          x: "Lubas",
          y: barangayData['Lubas']?.underweight,
        },
        {
          x: "Pico",
          y: barangayData['Pico']?.underweight,
        },
        {
          x: "Poblacion",
          y: barangayData['Poblacion']?.underweight,
        },
        {
          x: "Puguis",
          y: barangayData['Puguis']?.underweight,
        },
        {
          x: "Shilan",
          y: barangayData['Shilan']?.underweight,
        },
        {
          x: "Tawang ",
          y: barangayData['Tawang']?.underweight,
        },
        {
          x: "Wangal ",
          y: barangayData['Wangal']?.underweight,
        },
      ],
    },
    {
      id: "Normal",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: "Alapang",
          y: barangayData['Alapang']?.normal,
        },
        {
          x: "Alno",
          y: barangayData['Alno']?.normal,
        },
        {
          x: "Ambiong",
          y: barangayData['Ambiong']?.normal,
        },
        {
          x: "Balili",
          y: barangayData['Balili']?.normal,
        },
        {
          x: "Bahong",
          y: barangayData['Bahong']?.normal,
        },
        {
          x: "Beckel",
          y: barangayData['Beckel']?.normal,
        },
        {
          x: "Betag",
          y: barangayData['Betag']?.normal,
        },
        {
          x: "Bineng",
          y: barangayData['Bineng']?.normal,
        },
        {
          x: "Cruz",
          y: barangayData['Cruz']?.normal,
        },
        {
          x: "Lubas",
          y: barangayData['Lubas']?.normal,
        },
        {
          x: "Pico",
          y: barangayData['Pico']?.normal,
        },
        {
          x: "Poblacion",
          y: barangayData['Poblacion']?.normal,
        },
        {
          x: "Puguis",
          y: barangayData['Puguis']?.normal,
        },
        {
          x: "Shilan",
          y: barangayData['Shilan']?.normal,
        },
        {
          x: "Tawang ",
          y: barangayData['Tawang']?.normal,
        },
        {
          x: "Wangal ",
          y: barangayData['Wangal']?.normal,
        },
      ],
    },
    {
        id: "Overweight",
        color: tokens("dark").redAccent[200],
        data: [
          {
            x: "Alapang",
            y: barangayData['Alapang']?.overweight,
          },
          {
            x: "Alno",
            y: barangayData['Alno']?.overweight,
          },
          {
            x: "Ambiong",
            y: barangayData['Balili']?.overweight,
          },
          {
            x: "Balili",
            y: barangayData['Balili']?.overweight,
          },
          {
            x: "Bahong",
            y: barangayData['Bahong']?.overweight,
          },
          {
            x: "Beckel",
            y: barangayData['Beckel']?.overweight,
          },
          {
            x: "Betag",
            y: barangayData['Betag']?.overweight,
          },
          {
            x: "Bineng",
            y: barangayData['Bineng']?.overweight,
          },
          {
            x: "Cruz",
            y: barangayData['Cruz']?.overweight,
          },
          {
            x: "Lubas",
            y: barangayData['Lubas']?.overweight,
          },
          {
            x: "Pico",
            y: barangayData['Pico']?.overweight,
          },
          {
            x: "Poblacion",
            y: barangayData['Poblacion']?.overweight,
          },
          {
            x: "Puguis",
            y: barangayData['Puguis']?.overweight,
          },
          {
            x: "Shilan",
            y: barangayData['Shilan']?.overweight,
          },
          {
            x: "Tawang ",
            y: barangayData['Tawang']?.overweight,
          },
          {
            x: "Wangal ",
            y: barangayData['Wangal']?.overweight,
          },
        ],
      },
  ];

  
const BarData = [
    {
      barangay: "Alapang",
      "Underweight": barangayData['Alapang']?.severe + barangayData['Alapang']?.underweight,
      normal: barangayData['Alapang']?.normal,
      overweight:  barangayData['Alapang']?.overweight,
    },
    {
      barangay: "Alno",
      "Underweight": barangayData['Alno']?.severe + barangayData['Alno']?.underweight,
      normal:  barangayData['Alno']?.normal,
      overweight:  barangayData['Alno']?.overweight,
    },
    {
      barangay: "Ambiong",
      "Underweight": barangayData['Ambiong']?.severe + barangayData['Ambiong']?.underweight,
      normal:  barangayData['Ambiong']?.normal,
      overweight:  barangayData['Ambiong']?.overweight,
    },
    {
      barangay: "Balili",
      "Underweight": barangayData['Balili']?.severe + barangayData['Balili']?.underweight,
      normal:  barangayData['Balili']?.normal,
      overweight:  barangayData['Balili']?.overweight,
    },
    {
      barangay: "Bahong",
      "Underweight": barangayData['Bahong']?.severe + barangayData['Bahong']?.underweight,
      normal:  barangayData['Bahong']?.normal,
      overweight:  barangayData['Bahong']?.overweight,
    },
    {
      barangay: "Beckel",
      "Underweight": barangayData['Beckel']?.severe + barangayData['Beckel']?.underweight,
      normal:  barangayData['Beckel']?.normal,
      overweight:  barangayData['Beckel']?.overweight,
    },
    {
      barangay: "Betag",
      "Underweight": barangayData['Betag']?.severe + barangayData['Betag']?.underweight,
      normal:  barangayData['Betag']?.normal,
      overweight:  barangayData['Betag']?.overweight,
    },
    {
      barangay: "Bineng",
      "Underweight": barangayData['Bineng']?.severe + barangayData['Bineng']?.underweight,
      normal:  barangayData['Bineng']?.normal,
      overweight:  barangayData['Bineng']?.overweight,
    },
    {
      barangay: "Cruz",
      "Underweight": barangayData['Cruz']?.severe + barangayData['Cruz']?.underweight,
      normal:  barangayData['Cruz']?.normal,
      overweight:  barangayData['Cruz']?.overweight,
    },
    {
      barangay: "Lubas",
      "Underweight": barangayData['Lubas']?.severe + barangayData['Lubas']?.underweight,
      normal:  barangayData['Lubas']?.normal,
      overweight:  barangayData['Lubas']?.overweight,
    },
    {
      barangay: "Pico",
      "Underweight": barangayData['Pico']?.severe + barangayData['Pico']?.underweight,
      normal:  barangayData['Pico']?.normal,
      overweight:  barangayData['Pico']?.overweight,
    },
    {
      barangay: "Poblacion",
      "Underweight": barangayData['Poblacion']?.severe + barangayData['Poblacion']?.underweight,
      normal:  barangayData['Poblacion']?.normal,
      overweight:  barangayData['Poblacion']?.overweight,
    },
    {
      barangay: "Puguis",
      "Underweight": barangayData['Puguis']?.severe + barangayData['Puguis']?.underweight,
      normal:  barangayData['Puguis']?.normal,
      overweight:  barangayData['Puguis']?.overweight,
    },
    {
      barangay: "Shilan",
      "Underweight": barangayData['Shilan']?.severe + barangayData['Shilan']?.underweight,
      normal:  barangayData['Shilan']?.normal,
      overweight:  barangayData['Shilan']?.overweight,
    },
    {
      barangay: "Tawang",
      "Underweight": barangayData['Tawang']?.severe + barangayData['Tawang']?.underweight,
      normal:  barangayData['Tawang']?.normal,
      overweight:  barangayData['Tawang']?.overweight,
    },
    {
      barangay: "Wangal",
      "Underweight": barangayData['Wangal']?.severe + barangayData['Wangal']?.underweight,
      normal:  barangayData['Wangal']?.normal,
      overweight:  barangayData['Wangal']?.overweight,
    },
  ];

  
  const pieData = [
    {
      id: "Baranggay Alapang",
      label: "Baranggay Alapang",
      value: barangayData['Alapang']?.overweight+ barangayData['Alapang']?.severe + barangayData['Alapang']?.underweight+ barangayData['Alapang']?.normal,
      color: "hsl(210, 70%, 50%)",
    },
    {
      id: "Alno",
      label: "Alno",
      value: barangayData['Alno']?.overweight+ barangayData['Alno']?.severe + barangayData['Alno']?.underweight+ barangayData['Alno']?.normal,
      color: "hsl(220, 70%, 50%)",
    },
    {
      id: "Ambiong",
      label: "Ambiong",
      value: barangayData['Ambiong']?.overweight+ barangayData['Ambiong']?.severe + barangayData['Ambiong']?.underweight+ barangayData['Ambiong']?.normal,
      color: "hsl(230, 70%, 50%)",
    },
    {
      id: "Balili",
      label: "Balili",
      value: barangayData['Balili']?.overweight+ barangayData['Balili']?.severe + barangayData['Balili']?.underweight+ barangayData['Balili']?.normal,
      color: "hsl(240, 70%, 50%)",
    },
    {
      id: "Bahong",
      label: "Bahong",
      value: barangayData['Bahong']?.overweight+ barangayData['Bahong']?.severe + barangayData['Bahong']?.underweight+ barangayData['Bahong']?.normal,
      color: "hsl(250, 70%, 50%)",
    },
    {
      id: "Beckel",
      label: "Beckel",
      value: barangayData['Beckel']?.overweight+ barangayData['Beckel']?.severe + barangayData['Beckel']?.underweight+ barangayData['Beckel']?.normal,
      color: "hsl(260, 70%, 50%)",
    },
    {
      id: "Betag",
      label: "Betag",
      value: barangayData['Betag']?.overweight+ barangayData['Betag']?.severe + barangayData['Betag']?.underweight+ barangayData['Betag']?.normal,
      color: "hsl(270, 70%, 50%)",
    },
    {
      id: "Bineng",
      label: "Bineng",
      value: barangayData['Bineng']?.overweight+ barangayData['Bineng']?.severe + barangayData['Bineng']?.underweight+ barangayData['Bineng']?.normal,
      color: "hsl(280, 70%, 50%)",
    },
    {
      id: "Cruz",
      label: "Cruz",
      value: barangayData['Cruz']?.overweight+ barangayData['Cruz']?.severe + barangayData['Cruz']?.underweight+ barangayData['Cruz']?.normal,
      color: "hsl(290, 70%, 50%)",
    },
    {
      id: "Lubas",
      label: "Lubas",
      value: barangayData['Lubas']?.overweight+ barangayData['Lubas']?.severe + barangayData['Lubas']?.underweight+ barangayData['Lubas']?.normal,
      color: "hsl(300, 70%, 50%)",
    },
    {
      id: "Pico",
      label: "Pico",
      value: barangayData['Pico']?.overweight+ barangayData['Pico']?.severe + barangayData['Pico']?.underweight+ barangayData['Pico']?.normal,
      color: "hsl(310, 70%, 50%)",
    },
    {
      id: "Poblacion",
      label: "Poblacion",
      value: barangayData['Poblacion']?.overweight+ barangayData['Poblacion']?.severe + barangayData['Poblacion']?.underweight+ barangayData['Poblacion']?.normal,
      color: "hsl(320, 70%, 50%)",
    },
    {
      id: "Puguis",
      label: "Puguis",
      value: barangayData['Puguis']?.overweight+ barangayData['Puguis']?.severe + barangayData['Puguis']?.underweight+ barangayData['Puguis']?.normal,
      color: "hsl(330, 70%, 50%)",
    },
    {
      id: "Shilan",
      label: "Shilan",
      value: barangayData['Shilan']?.overweight+ barangayData['Shilan']?.severe + barangayData['Shilan']?.underweight+ barangayData['Shilan']?.normal,
      color: "hsl(340, 70%, 50%)",
    },
    {
      id: "Tawang",
      label: "Tawang",
      value: barangayData['Tawang']?.overweight+ barangayData['Tawang']?.severe + barangayData['Tawang']?.underweight+ barangayData['Tawang']?.normal,
      color: "hsl(350, 70%, 50%)",
    },
    {
      id: "Wangal",
      label: "Wangal",
      value: barangayData['Wangal']?.overweight+ barangayData['Wangal']?.severe + barangayData['Wangal']?.underweight+ barangayData['Wangal']?.normal,
      color: "hsl(360, 70%, 50%)",
    },
  ];
  
  
  
  
  
  
  

  // Return the relevant data
  return {
    lfa_severe,
    lfa_stunted,
    lfa_normal,
    lfa_tall,
    wfa_severe,
    wfa_underweight,
    wfa_normal,
    wfa_overweight,
    wfl_severe,
    wfl_wasted,
    wfl_normal,
    wfl_overweight,
    wfl_obese,
    population,
    latestQuarter,
    barangayData,
    LineData,
    BarData,
    pieData,
  };
};

export default Statistics;
