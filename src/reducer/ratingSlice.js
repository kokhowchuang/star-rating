import { createSlice } from "@reduxjs/toolkit";

export const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    list: [],
  },
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    fetch: (state, action) => {
      state.list = [...action.payload];
    },
    throwError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { add, fetch, throwError } = ratingSlice.actions;

export const selectRatingList = (state) => state.rating.list;

export default ratingSlice.reducer;
