import { SET_REFRESHER } from "../actions";

const initialRefresherState = {
    success : 0,
    closed : false
}

const refresherReducer = (state = initialRefresherState, action) => {
    switch (action.type) {
      case SET_REFRESHER:
        return {
          ...state,
          success: action.payload.success || state.success,
          closed : action.payload.closed || state.closed,
        };
       
      default:
        return state;
    }
  };

export default refresherReducer;