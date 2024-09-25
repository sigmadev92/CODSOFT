import React from "react";
import img from "./images/android-chrome-512x512.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className=" bg-red-500 w-full flex justify-between p-2">
      <div id="heading" className="flex ml-[30px] gap-x-2">
        <img
          src={img}
          alt="JobSoft-A platform by CodSoft"
          className="w-[44px]"
        />
        <h1 className="font-serif text-[30px]">
          <span className="text-gray-800">Job</span>
          <span className="text-white">Soft</span>
        </h1>
      </div>
      <div id="links" className="mr-[30px] mt-[10px]">
        <ul className="flex gap-3">
          <li>Home</li>
          <li>Jobs</li>
          <li
            className="cursor-pointer hover:bg-white"
            onClick={() => navigate("/login")}
          >
            Login
          </li>
        </ul>
      </div>
    </div>
  );
}
