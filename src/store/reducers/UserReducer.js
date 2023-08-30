const initialState = {
  currentUser : {
  }
};
export const SET_GLOBAL_ERROR = "SET_GLOBAL_ERROR";
export const SET_MESSAGE_NOTIFY = "SET_MESSAGE_NOTIFY";
export const SET_MESSAGE_TYPE = "SET_MESSAGE_TYPE";
export const SET_JOIN_DET = "SET_JOIN_DET";
export const CLEAR_JOIN_DET = "CLEAR_JOIN_DET";
export const SET_USER = "SET_USER";
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload };
    
    default:
      return state;
  }
};
export default UserReducer;
