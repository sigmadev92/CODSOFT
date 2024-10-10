import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
export const SaveJobPost = createAsyncThunk("savebutton", async (obj) => {
  const response = await axios.post(
    "http://localhost:1008/users/save-job",
    obj
  );
  return {
    response: response.data,
    jobId: obj.job_id,
  };
});
export const UnSaveJobPost = createAsyncThunk("unsavebutton", async (obj) => {
  const response = await axios.post(
    "http://localhost:1008/users/unsave-job",
    obj
  );
  return {
    response: response.data,
    jobId: obj.job_id,
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
    builders.addCase(SaveJobPost.fulfilled, (state, action) => {
      if (action.payload.response.status)
        state.userData.SavedJobs.push(action.payload.jobId);
      else toast.error(action.payload.response.message);
    });
    builders.addCase(SaveJobPost.rejected, (state, action) => {
      console.log(action.payload);
    });
    builders.addCase(UnSaveJobPost.fulfilled, (state, action) => {
      if (action.payload.response.status) {
        const index = state.userData.SavedJobs.indexOf(action.payload.jobId);
        state.userData.SavedJobs.splice(index, 1);
      } else toast.error(action.payload.response.message);
    });
    builders.addCase(UnSaveJobPost.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setAuth, deleteAuth } = userSlice.actions;

export default userSlice.reducer;
