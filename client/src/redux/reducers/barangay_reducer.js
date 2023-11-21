import { SET_BARANGAY_DATA } from "../actions";

const initialBarangayDataState = {
  alapang: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  alno: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  ambiong: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  balili: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  bahong: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  beckel: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  betag: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  bineng: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  cruz: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  lubas: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  pico: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  poblacion: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  puguis: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  shilan: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  tawang: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
  wangal: {
    severe: 0,
    underweight: 0,
    normal: 0,
    overweight: 0,
  },
};


const barangayDataReducer = (state = initialBarangayDataState, action) => {
  switch (action.type) {
    case SET_BARANGAY_DATA:
      const { barangay, data } = action.payload;

      return {
        ...state,
        [barangay]: {
          ...state[barangay],
          ...data, // Assuming that data is an object with properties like 'severe', 'underweight', 'normal', 'overweight'
        },
      };

    default:
      return state;
  }
};

export default barangayDataReducer;
