import { SET_STATS } from "../actions";

const initialStatsState = {
  lfa_severe: 0,
  lfa_stunted: 0,
  lfa_normal: 0,
  lfa_tall: 0,

  wfa_severe: 0,
  wfa_underweight: 0,
  wfa_normal: 0,
  wfa_overweight: 0,

  wfl_severe: 0,
  wfl_wasted: 0,
  wfl_normal: 0,
  wfl_overweight: 0,
  wfl_obese: 0,

  population: 0,

  lfa_severe_percentage: 0,
  lfa_stunted_percentage: 0,
  lfa_normal_percentage: 0,
  lfa_tall_percentage: 0,

  wfa_severe_percentage: 0,
  wfa_underweight_percentage: 0,
  wfa_normal_percentage: 0,
  wfa_overweight_percentage: 0,

  wfl_severe_percentage: 0,
  wfl_wasted_percentage: 0,
  wfl_normal_percentage: 0,
  wfl_overweight_percentage: 0,
  wfl_obese_percentage: 0,

};

const statsReducer = (state = initialStatsState, action) => {
  switch (action.type) {
    case SET_STATS:
      return {
        ...state,
        lfa_severe: action.payload.lfa_severe || state.lfa_severe,
        lfa_stunted: action.payload.lfa_stunted || state.lfa_stunted,
        lfa_normal: action.payload.lfa_normal || state.lfa_normal,
        lfa_tall: action.payload.lfa_tall || state.lfa_tall,

        wfa_severe: action.payload.wfa_severe || state.wfa_severe,
        wfa_underweight: action.payload.wfa_underweight || state.wfa_underweight,
        wfa_normal: action.payload.wfa_normal || state.wfa_normal,
        wfa_overweight: action.payload.wfa_overweight || state.wfa_overweight,

        wfl_severe: action.payload.wfl_severe || state.wfl_severe,
        wfl_wasted: action.payload.wfl_wasted || state.wfl_wasted,
        wfl_normal: action.payload.wfl_normal || state.wfl_normal,
        wfl_overweight: action.payload.wfl_overweight || state.wfl_overweight,
        wfl_obese: action.payload.wfl_obese || state.wfl_obese,

        population: action.payload.population || state.population,
      };
    default:
      return state;
  }
};

export default statsReducer;
