const initialState = {
  messages: {},
};
export const SET_MESSAGES = "SET_MESSAGES";

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: {
          [action.payload.room]: [
            ...(state.messages[action.payload.room]
              ? state.messages[action.payload.room]
              : []),
            action.payload.res,
          ],
        },
      };

    default:
      return state;
  }
};
export default ChatReducer;

//  ...action.payload.messages,
//           [action.payload.room]: [
//             ...state.messages[action.payload.room],
//             action.payload.res,
//           ],
