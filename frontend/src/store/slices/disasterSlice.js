import { createSlice } from "@reduxjs/toolkit";

const disasterSlice = createSlice({
  name: "disasters",
  initialState: {
    items: []
  },
  reducers: {
    setDisasters: (state, action) => {
      state.items = action.payload;
    },
    addDisaster: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateDisasterItem: (state, action) => {
      state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
    }
  }
});

export const { setDisasters, addDisaster, updateDisasterItem } = disasterSlice.actions;
export default disasterSlice.reducer;
