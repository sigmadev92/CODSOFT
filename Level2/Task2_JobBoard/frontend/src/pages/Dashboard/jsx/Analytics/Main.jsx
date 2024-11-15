import React from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useSelector } from "react-redux";
import Overview from "./jsx/Overview";
export default function Analytics(props) {
  const records = useSelector((state) => state.jobAction.records);
  return (
    <div className="bg-slate-700 w-full m-auto h-full absolute  ">
      <div
        id="top"
        className="bg-slate-500 h-[40px] flex justify-between px-4 "
      >
        <div className="flex gap-x-3 py-1">
          <h1 className="font-bold text-white text-[20px] ">Analytics for</h1>
          <h1>{props.userDetails.FullName}</h1>
          <h1>{props.userDetails.USER_ID}</h1>
        </div>

        <MdOutlineCancelPresentation
          onClick={() => props.fn.setClose(true)}
          className="bg-red-500 text-[30px] hover:text-white cursor-pointer mt-1"
        />
      </div>
      <Overview userDetails={props.userDetails} records={records} />
    </div>
  );
}
