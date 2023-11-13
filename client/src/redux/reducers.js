// src/redux/reducers.js
const initialState = {
    childData: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CHILD_DATA':
        return { ...state, childData: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  