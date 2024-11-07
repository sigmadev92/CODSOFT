import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSave, BsSaveFill } from "react-icons/bs";
import {
  AddToRecord,
  removeSavedJob,
} from "../../../redux/slice/jobActionSlice";
export default function SaveJob(props) {
  const user = useSelector((state) => state.user);
  const jobAction = useSelector((state) => state.jobAction);
  const obj = {
    UserId: user.userData?.USER_ID,
    JobId: props.job_id,
    ActionType: "save",
  };
  const dispatch = useDispatch();
  async function handleSaveButton() {
    dispatch(AddToRecord(obj));
  }
  async function handleUnsaveButton() {
    console.log("clicked");
    dispatch(
      removeSavedJob(
        jobAction.records.find(
          (ele) =>
            ele.UserId === user.userData.USER_ID &&
            ele.JobId === props.job_id &&
            ele.ActionType === "save"
        )._id
      )
    );
  }
  return (
    <>
      {user.loggedIn && (
        <>
          {jobAction.records.find(
            (ele) =>
              ele.JobId === props.job_id &&
              ele.UserId === user.userData?.USER_ID &&
              ele.ActionType === "save"
          ) === undefined ? (
            <BsSave
              className="text-white cursor-pointer hover:text-green-400"
              onClick={handleSaveButton}
            />
          ) : (
            <BsSaveFill
              title="Job is saved. Click to unsave"
              className="text-white hover:text-black cursor-pointer"
              onClick={handleUnsaveButton}
            />
          )}
        </>
      )}
    </>
  );
}
