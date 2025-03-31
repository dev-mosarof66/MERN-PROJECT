import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../lib/userSlice";
import reelSlice from "../lib/reelSlice";
export default configureStore({
  reducer: {
    user: userSlice,
    reel: reelSlice,
  },
});
