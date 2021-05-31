import jwtDecode from "jwt-decode";
import {
  FETCH_START,
  INIT_URL,
  SIGNOUT_USER,
  USER_DATA,
  USER_TOKEN_SET,
} from "../../constants/ActionTypes";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const userAuthUpdate = (token) => {
  return (dispatch) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    if(decodedToken){
    dispatch({ type: USER_TOKEN_SET, payload: token });
    dispatch({ type: USER_DATA, payload: decodedToken });
    }
  };
};

export const getUser = (token) => {
  return (dispatch) => {};
};

export const userSignOut = () => {
  return (dispatch) => {
    // localStorage.setItem('token',undefined)
    dispatch({ type: SIGNOUT_USER });
  };
};
