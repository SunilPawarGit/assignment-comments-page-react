const initialState = {
  Comments: [],
  isReplying : false,
  ReplyingTo:{},
  isEdit:false,
  isDelete:false,
  deleteContent:{},
};
export const SET_COMMENTS = "SET_COMMENTS";
export const SET_IS_REPLYING = "SET_IS_REPLYING";
export const SET_IS_DELETE = "SET_IS_DELETE";
export const SET_IS_EDIT = "SET_IS_EDIT";
export const SET_REPLYING_TO = "SET_REPLYING_TO";
export const ADD_COMMENTS = "ADD_COMMENTS";
export const UPDATE_COMMENTS = "UPDATE_COMMENTS";
export const SET_DELETE_CONTENT = "SET_DELETE_CONTENT";
const CommentsReucer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, Comments: action.payload };
    case ADD_COMMENTS:
      return { ...state, Comments: [...initialState.Comments, action.payload] };
    case UPDATE_COMMENTS:
      return { ...state, Comments: action.payload };
    case SET_IS_EDIT:
      return { ...state, isEdit: action.payload };
    case SET_IS_REPLYING:
      return { ...state, isReplying: action.payload };
    case SET_IS_DELETE:
      return { ...state, isDelete: action.payload };
    case SET_REPLYING_TO:
      return { ...state, ReplyingTo: action.payload };
    case SET_DELETE_CONTENT:
      return { ...state, deleteContent: action.payload };
    default:
      return state;
  }
};
export default CommentsReucer;
