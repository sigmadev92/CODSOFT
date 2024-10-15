import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import jobActionReducer from "./slice/jobActionSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    jobAction: jobActionReducer,
  },
});
