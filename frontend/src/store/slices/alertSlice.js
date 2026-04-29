import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    items: []
  },
  reducers: {
    setAlerts: (state, action) => {
      state.items = action.payload;
    },
    addAlert: (state, action) => {
      state.items.unshift(action.payload);
    }
  }
});

export const { setAlerts, addAlert } = alertSlice.actions;
export default alertSlice.reducer;
