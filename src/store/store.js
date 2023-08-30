// third-party
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import reducers from "./reducers";
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// project import

// const persistConfig = {
//   key: 'sea-react-trouve-admin',
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
  devTools: process.env.REACT_APP_NODE_ENV === "production",
});

const persister = persistStore(store);

const { dispatch } = store;
const { getState } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, dispatch, persister, useSelector, useDispatch, getState };
