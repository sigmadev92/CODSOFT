import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="w-[70%] m-auto p-3 bg-slate-500 text-white rounded-[10px] mt-4">
        <h1 className="text-center font-thin text-[40px] cursor-pointer ">
          CodSoft Presents
        </h1>
        <h1 className="text-center text-[60px] font-black">
          <span className="text-red-800">Job</span>Soft
        </h1>
        <h1 className="text-center">India's Leading Platform for Job Hunt</h1>
      </div>
      <h1 className="text-center font-mono mt-3">
        Everything according to your interest
      </h1>{" "}
      <div className="w-[70%] m-auto p-3 rounded-[10px]">
        <ul className="flex md:gap-x-4 justify-center flex-wrap gap-3">
          <li>Full Time</li>
          <li>Part Time</li>
          <li>Internship</li>
          <li>Onsite</li>
          <li>Remote</li>
        </ul>
      </div>
    </>
  );
}
