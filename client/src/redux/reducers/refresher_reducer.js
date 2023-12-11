import { SET_REFRESHER, SET_SELECTED_BARANGAY } from "../actions";

const initialRefresherState = {
    success : 0,
    closed : false,
    selectedBarangay: 'All Barangays',
}

const refresherReducer = (state = initialRefresherState, action) => {
    switch (action.type) {
      case SET_REFRESHER:
        return {
          ...state,
          success: action.payload.success || state.success,
          closed : action.payload.closed || state.closed,
        };
        case 'SET_SELECTED_BARANGAY':
        return {
          ...state,
          selectedBarangay: action.payload,
        };
       
      default:
        return state;
    }
  };

export default refresherReducer;