import React from "react";
import { useSelector } from "react-redux";

export default function TotalSaves() {
  const jobAction = useSelector((state) => state.jobAction);
  const user = useSelector((state) => state.user);
  return (
    <>
      {
        jobAction.records.filter(
          (ele) =>
            ele.UserId === user.userData?.USER_ID && ele.ActionType === "save"
        ).length
      }
    </>
  );
}
