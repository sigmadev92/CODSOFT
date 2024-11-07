import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jobActionsUrl } from "../../functionsJs/urls";
import { toast } from "react-toastify";
export const fetchJobActionRecords = createAsyncThunk(
  "fetchJobActions",
  async () => {
    const response = await axios.get(`${jobActionsUrl}/get-all-records`);

    return response.data;
  }
);

export const AddToRecord = createAsyncThunk("addtorecord", async (obj) => {
  const response = await axios.post(`${jobActionsUrl}/add-record`, obj);
  if (response.data.status)
    return {
      status: true,
      data: response.data.data,
      action: obj.ActionType,
    };
  return {
    status: false,
    message: response.data.message,
  };
});

export const removeSavedJob = createAsyncThunk(
  "removesavedjob",
  async (record_id) => {
    const response = await axios.delete(
      `${jobActionsUrl}/remove-saved-job/${record_id}`
    );
    if (response.data.status)
      return {
        status: true,
        _id: record_id,
      };

    return {
      status: false,
    };
  }
);

const jobActionSlice = createSlice({
  name: "jobAction",
  initialState: {
    records: [],
  },
  extraReducers: (builders) => {
    builders.addCase(fetchJobActionRecords.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.records = action.payload.data;
      }
    });
    builders.addCase(fetchJobActionRecords.rejected, (state, action) => {
      console.log(action.error);
    });
    builders.addCase(AddToRecord.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.records.push(action.payload.data);
        if (action.payload.action === "save")
          toast.success("Job Saved Successfully");
        else toast.success("Applied to job successfully");
      } else {
        toast.error(action.payload.message);
      }
    });
    builders.addCase(AddToRecord.rejected, (state, action) => {});
    builders.addCase(removeSavedJob.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.records.splice(
          state.records.findIndex((ele) => ele._id === action.payload._id),
          1
        );
        toast.success("Job unsaved successfully");
      }
    });
    builders.addCase(removeSavedJob.rejected, (state, action) => {
      console.log(action.error, "REERE");
    });
  },
});

export default jobActionSlice.reducer;
