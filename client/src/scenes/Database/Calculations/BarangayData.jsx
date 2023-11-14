import React, { useState, useEffect } from 'react';
import lengthForAgeStatus from './lengthForAgeStatus';
import weightForAgeStatus from './weightForAgeStatus';
import weigthForLengthStatus from './weightForLengthStatus';
import axios from 'axios';

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


const BarangayData = () => {
  const [alapang, setAlapang] = useState(0)
  const [Alno, setAlno] = useState(0)
  const [Ambiong, setAmbiong] = useState(0)
  const [Balili, setBalili] = useState(0)
  const [Bahong, setBahong] = useState(0)
  const [Beckel, setBeckel] = useState(0)
  const [Betag, setBetag] = useState(0)
  const [Bineng, setBineng] = useState(0)
  const [Cruz, setCruz] = useState(0)
  const [Lubas, setLubas] = useState(0)
  const [Pico, setPico] = useState(0)
  const [Poblacion, setPoblacion] = useState(0)
  const [Puguis, setPuguis] = useState(0)
  const [Shilan, setShilan] = useState(0)
  const [Tawang, setTawang] = useState(0)
  const [Wangal, setWangal] = useState(0)

  const [wfa_severe, set_WFA_severe] = useState(0);
  const [wfa_underweight, set_WFA_underweight] = useState(0);
  const [wfa_normal, set_WFA_normal] = useState(0);
  const [wfa_overweight, set_WFA_overweight] = useState(0);

  const [dataProcessed, setDataProcessed] = useState(false);
  const [population, setPopulation] = useState(0)

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

  useEffect(() => {
    if (data) {
      if (!dataProcessed) {
        data.forEach((patient) => {
            const latestQuarter = getLatestQuarter();
            if (patient.quarter === latestQuarter.quarter && patient.year === latestQuarter.year) {

            }
        });
        setDataProcessed(true);
      }
    }
  }, [data]);

  // Return the relevant data
  return {
   
  };
};

export default BarangayData;
