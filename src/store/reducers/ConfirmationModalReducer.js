const initialState = {
isOpen:false,
  };
  export const SET_OPEN_MODAL = "SET_OPEN_MODAL";
 
  const ConfirmationModalReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_OPEN_MODAL:
        return { ...state, isOpen: action.payload };
      default:
        return state;
    }
  };
  export default ConfirmationModalReducer;
  