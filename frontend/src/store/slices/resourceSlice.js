import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    items: []
  },
  reducers: {
    setResources: (state, action) => {
      state.items = action.payload;
    },
    upsertResource: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.unshift(action.payload);
      }
    }
  }
});

export const { setResources, upsertResource } = resourceSlice.actions;
export default resourceSlice.reducer;
