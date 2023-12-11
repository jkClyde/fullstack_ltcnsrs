// authActions.js
export const SET_STATS = 'SET_STATS';
export const SET_BARANGAY_DATA = 'SET_BARANGAY_DATA';
export const SET_REFRESHER = 'SET_REFRESHER'
export const SET_SELECTED_BARANGAY = "SET_SELECTED_BARANGAY"

export const setStats = (stats) => {
  return{
    type: SET_STATS,
    payload: stats,
  }
}

export const setSelectedBarangayy = (barangay) => ({
  type:SET_SELECTED_BARANGAY,
  payload: barangay,
});


export const setBarangayData = (data) => {
  return{
    type: SET_BARANGAY_DATA,
    payload: data,
  }
}

export const setRefresher = (data) => {
  return{
    type: SET_REFRESHER,
    payload: data,
  }
}

  
