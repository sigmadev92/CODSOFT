import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  if (localStorage.getItem("jwt") === null)
    return {
      status: false,
      userData: null,
    };
  const response = await axios.get("http://localhost:1008/users/auth", {
    headers: {
      auth: localStorage.getItem("jwt"),
    },
  });
  console.log(response.data);
  return response.data;
});
export const ApplyToJob = createAsyncThunk("applyButton", async (obj) => {
  const response = await axios.post("http://localhost:1008/users/add-job", {
    userId: obj.userId,
    jobId: obj.jobId,
  });
  return {
    response: response.data,
    jobId: obj.jobId,
  };
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
      console.log("hello");
      if (action.payload.status) {
        state.loggedIn = action.payload.status;
        state.userData = action.payload.data;
      }
    });
    builders.addCase(fetchUser.rejected, (state, action) => {
      console.log(state.loggedIn, action);
    });
    builders.addCase(ApplyToJob.rejected, (state, action) => {
      return false;
    });
    builders.addCase(ApplyToJob.fulfilled, (state, action) => {
      if (action.payload.response.status) {
        state.userData.Applies.push(action.payload.jobId);
      }
    });
  },
});

export const { setAuth, deleteAuth } = userSlice.actions;

export default userSlice.reducer;
