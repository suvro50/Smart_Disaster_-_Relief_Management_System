import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slices/alertSlice.js";
import authReducer from "./slices/authSlice.js";
import disasterReducer from "./slices/disasterSlice.js";
import resourceReducer from "./slices/resourceSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    disasters: disasterReducer,
    alerts: alertReducer,
    resources: resourceReducer
  }
});
