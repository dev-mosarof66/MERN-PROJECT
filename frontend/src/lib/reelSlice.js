import { createSlice } from "@reduxjs/toolkit";

const reelSlice = createSlice({
  name: "reel",
  initialState: {
    watchHistory: null,
    reels: null,
    uploadedReels: null,
  },
  reducers: {
    setReels: (state, action) => {
      state.reels = action.payload;
    },
    setUploadedReels: (state, action) => {
      state.uploadedReels = action.payload;
    },
  },
});

export const { setReels, setUploadedReels } = reelSlice.actions;
export default reelSlice.reducer;
