import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./current-user-slice.ts";
import { postsSlice } from "./posts-slice.ts";
import { usersSlice } from "./users-slice.ts";
import { followSlice } from "./follow-slice.ts";

export const store = configureStore({
  reducer: {
    currentUser: userSlice.reducer,
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    follow: followSlice.reducer,
  },
});

export default store;
