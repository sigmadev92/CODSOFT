import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { usersUrl } from "../../functionsJs/urls";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  if (localStorage.getItem("jwt") === null)
    return {
      status: false,
      userData: null,
    };
  const response = await axios.get(`${usersUrl}/auth`, {
    headers: {
      auth: localStorage.getItem("jwt"),
    },
  });
  console.log(response.data);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userData: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    deleteAuth: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
    setProfilePic: (state, action) => {
      console.log("hello");
      state.userData.ProfilePic = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchUser.fulfilled, (state, action) => {
      console.log("hello");
      if (action.payload.status) {
        state.loggedIn = action.payload.status;
        state.userData = action.payload.data;
      }
    });
    builders.addCase(fetchUser.rejected, (state, action) => {
      console.log(state.loggedIn, action);
    });
  },
});

export const { setAuth, deleteAuth, setProfilePic } = userSlice.actions;

export default userSlice.reducer;
