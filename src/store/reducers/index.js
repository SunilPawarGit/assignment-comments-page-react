import { persistReducer } from "redux-persist";
import UserReducer from "./UserReducer";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import CommentsReucer from "./CommentsReducer";
import ConfirmationModalReducer from "./ConfirmationModalReducer";

const reducers = combineReducers({
  UserReducer: persistReducer({ key: "auth", storage }, UserReducer),
  CommentsReducer : CommentsReucer,
  ConfirmationMmodalReducer:ConfirmationModalReducer
});
export default reducers;
