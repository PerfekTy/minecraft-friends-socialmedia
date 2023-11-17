import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REQUEST_HEADERS } from "./consts.ts";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/users",
      REQUEST_HEADERS,
    );
    return data;
  } catch (error) {
    throw error;
  }
});

interface UsersState {
  users: [];
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
