// authActions.js
export const SET_ADMIN = 'SET_ADMIN';

export const setAdmin = (isAdmin) => {
  return {
    type: SET_ADMIN,
    payload: isAdmin,
  };
};