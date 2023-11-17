import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REQUEST_HEADERS } from "./consts.ts";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/posts",
      REQUEST_HEADERS,
    );
    return data;
  } catch (error) {
    throw error;
  }
});

interface PostsState {
  posts: [];
  isLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
