import React from "react";
import { useSelector } from "react-redux";

export default function TotalApplies(props) {
  const jobAction = useSelector((state) => state.jobAction);
  // const user = useSelector((state) => state.user);
  return (
    <>
      {
        jobAction.records.filter(
          (ele) => ele.JobId === props.job_id && ele.ActionType === "apply"
        ).length
      }
    </>
  );
}
