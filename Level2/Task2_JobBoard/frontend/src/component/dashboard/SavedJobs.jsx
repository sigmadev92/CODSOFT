import React from "react";
import { RiFolderCloseFill } from "react-icons/ri";

export default function SavedJobs(props) {
  return (
    <div id="saved-jobs" className="w-full h-[300px] bg-slate-600 rounded-t-lg">
      <div className="flex justify-end bg-black rounded-t-lg gap-x-4 px-4">
        <h1 className="text-center font-semibold bg-black text-white text-[12px] rounded-t-lg">
          Saved Jobs
        </h1>
        <RiFolderCloseFill
          className="cursor-pointer text-white hover:text-red-700 "
          onClick={() => props.fn(false)}
        />
      </div>
    </div>
  );
}
