const initialState = {
  notes: "",
};
const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.payload };

    default:
      return state;
  }
};
export default NotesReducer;
