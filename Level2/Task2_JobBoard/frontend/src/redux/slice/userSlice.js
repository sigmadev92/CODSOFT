import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUser = createAsyncThunk("fetchUser", async (state) => {
  if (localStorage.getItem("jwt") === null)
    return {
      status: false,
      userData: null,
    };
  try {
    const response = await axios.get("http://localhost:1008/users/auth", {
      headers: {
        auth: localStorage.getItem("jwt"),
      },
    });
    if (response.data.status) {
      return {
        status: true,
        userData: response.data.data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      userData: null,
    };
  }
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
  },
  extraReducers: (builders) => {
    builders.addCase(fetchUser.fulfilled, (state, action) => {
      state.loggedIn = action.payload.status;
      state.userData = action.payload.userData;
    });
    builders.addCase(fetchUser.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setAuth, deleteAuth } = userSlice.actions;

export default userSlice.reducer;
