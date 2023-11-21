import statsReducer from "./reducers/stats_reducer";
import barangayDataReducer from "./reducers/barangay_reducer";
import refresherReducer from "./reducers/refresher_reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  stats : statsReducer,
  brgy : barangayDataReducer,
  refresher : refresherReducer,
});
  
  export default rootReducer;
  