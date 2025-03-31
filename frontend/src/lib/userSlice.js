import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../store/axios";


export const getAuthUser = createAsyncThunk("user/getAuthUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/check");
    return response.data.user;  
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authUser = action.payload;
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setAuthUser } = userSlice.actions;
export default userSlice.reducer;
