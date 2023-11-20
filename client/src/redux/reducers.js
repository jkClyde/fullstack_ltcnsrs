import { SET_ADMIN } from "./actions";

const initialState = {
  isAdmin: false,
};
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ADMIN:
        return {
           ...state,  
           isAdmin: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  