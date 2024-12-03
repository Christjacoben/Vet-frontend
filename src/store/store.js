import { configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import profileImageReducer from "./profileImageSlice";
import appointmentReducer from "./appointmentSlice";
import petReportReducer from "./petReportSlice";
import messagesReducer from "./messagesSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  profileImage: profileImageReducer,
  appointments: appointmentReducer,
  messages: messagesReducer,
  petReport: petReportReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
