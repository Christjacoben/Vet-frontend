import { createSlice } from "@reduxjs/toolkit";

const profileImageSlice = createSlice({
  name: "profileImage",
  initialState: {
    selectedImage: null,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { setProfileImage } = profileImageSlice.actions;
export default profileImageSlice.reducer;
