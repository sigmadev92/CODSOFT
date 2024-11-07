import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddToRecord } from "../../../redux/slice/jobActionSlice";

export default function ApplyToJob(props) {
  const user = useSelector((state) => state.user);
  const jobAction = useSelector((state) => state.jobAction);
  const dispatch = useDispatch();
  async function handleApplyButton() {
    if (!user.loggedIn) {
      toast.warn("You must Log In as a Job Seeker to apply");
      return;
    }
    dispatch(
      AddToRecord({
        UserId: user.userData.USER_ID,
        JobId: props.job_id,
        ActionType: "apply",
      })
    );
  }

  return (
    <>
      {!user.loggedIn ||
      (user.loggedIn &&
        user.userData.UserType === "seeker" &&
        jobAction.records.find(
          (record) =>
            record.JobId === props.job_id &&
            record.UserId === user.userData.USER_ID &&
            record.ActionType === "apply"
        ) === undefined) ? (
        <h1
          className="text-[10px] bg-white px-2 hover:bg-green-300 rounded-md cursor-pointer"
          onClick={handleApplyButton}
        >
          Apply
        </h1>
      ) : (
        <h1 className="text-[12px] text-white font-semibold">
          {user.userData.UserType === "seeker" && "Applied"}
        </h1>
      )}
    </>
  );
}
