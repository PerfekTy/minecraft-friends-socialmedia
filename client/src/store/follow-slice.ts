import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { REQUEST_HEADERS } from "./consts.ts";

const initialState = {
  usersFollowing: {},
  isLoading: false,
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setIsFollowing: (state, action) => {
      const { username, isFollowing } = action.payload;
      state.usersFollowing[username] = isFollowing;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsFollowing, setIsLoading } = followSlice.actions;

export const followUser = (userData) => async (dispatch, getState) => {
  const { username, isFollowing } = userData;

  try {
    dispatch(setIsLoading(true));
    await axios.patch(
      `http://localhost:8080/api/users/${username}/follow`,
      {},
      REQUEST_HEADERS,
    );

    dispatch(setIsFollowing({ username, isFollowing: !isFollowing }));

    if (isFollowing) {
      toast.success("Account has been unfollowed!");
    } else {
      toast.success("Account has been followed!");
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    dispatch(setIsLoading(false));
  }
};
