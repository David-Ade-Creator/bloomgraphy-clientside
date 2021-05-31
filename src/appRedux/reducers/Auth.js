import jwtDecode from "jwt-decode";
import {INIT_URL, SIGNOUT_USER, SIGNOUT_USER_SUCCESS, UPDATE_LOAD_USER, USER_DATA, USER_TOKEN_SET} from "../../constants/ActionTypes";

const INIT_STATE = {
  token: localStorage.getItem('token'),
  initURL: '',
  authUser: null,
};

if(localStorage.getItem('token')){
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  if(decodedToken.exp * 1000 < Date.now()){
    localStorage.removeItem('token')
  } else {
    INIT_STATE.authUser = decodedToken;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }
    
    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadingAuthUser: action.payload
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        token: undefined,
        authUser: null,
      };
    }

    default:
      return state;
  }
}
