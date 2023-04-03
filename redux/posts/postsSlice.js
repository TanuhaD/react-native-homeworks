import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postList: [],
  },
  reducers: {
    addNewPost: (state, action) => {
      const newPostList = [...state.postList];
      newPostList.push(action.payload);
      return { postList: newPostList };
    },
  },
});

export const { addNewPost } = postsSlice.actions;
