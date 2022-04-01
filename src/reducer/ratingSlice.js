import { createSlice } from "@reduxjs/toolkit";

export const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    list: [],
    totalScore: 0,
  },
  reducers: {
    add: (state, action) => {
      state.totalScore += action.payload.score;
      state.list.push(action.payload);
    },
    fetch: (state, action) => {
      action.payload.forEach((element) => {
        state.totalScore += element.score;
      });
      state.list = [...action.payload];
    },
    throwError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { add, fetch, throwError } = ratingSlice.actions;

export const selectRatingList = (state) => state.rating.list;
export const selectTotalScore = (state) => state.rating.totalScore;

export default ratingSlice.reducer;
