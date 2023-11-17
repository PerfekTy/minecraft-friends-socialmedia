import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REQUEST_HEADERS } from "./consts.ts";

export const getCurrentUser = createAsyncThunk(
  "currentUser/getCurrentUser",
  async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/users/current",
        REQUEST_HEADERS,
      );
      return data;
    } catch (error) {
      window.location.reload();
      throw error;
    }
  },
);

interface UserState {
  currentUser: [];
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
