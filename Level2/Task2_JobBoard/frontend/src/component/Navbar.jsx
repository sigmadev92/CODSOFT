import React, { useState } from "react";
import img from "./images/android-chrome-512x512.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../redux/slice/userSlice";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hideLinks, setHideLinks] = useState(true);
  const linksClass =
    "text-white px-2 border-[2px] border-[blue] cursor-pointer md:hover:bg-black hover:bg-red-300";

  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 w-full flex justify-between p-2 sticky top-0">
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
        <ul
          id="navbar-links-sm"
          className={`absolute mt-[25px] bg-black ${hideLinks && "hidden"}
          gap-x-2  md:flex md:visible md:flex-row md:relative md:bg-transparent md:mt-0`}
        >
          <li
            className={linksClass}
            onClick={() => {
              setHideLinks(true);
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            className={linksClass}
            onClick={() => {
              setHideLinks(true);
              navigate("/jobs");
            }}
          >
            {" "}
            Jobs
          </li>
          {user.loggedIn ? (
            <>
              <li
                className={linksClass}
                onClick={() => {
                  setHideLinks(true);
                  navigate(`/profile/${user.userData.USER_ID}`);
                }}
              >
                My Profile
              </li>
              <li
                className={linksClass}
                onClick={() => {
                  setHideLinks(true);
                  localStorage.removeItem("jwt");
                  dispatch(deleteAuth());
                  navigate("/login");
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <li
              className={linksClass}
              onClick={() => {
                setHideLinks(true);
                navigate("/login");
              }}
            >
              Login
            </li>
          )}

          <li
            className={linksClass}
            onClick={() => {
              setHideLinks(true);
              navigate("/about");
            }}
          >
            About
          </li>
        </ul>

        <button
          className="hover:bg-white px-2 rounded-sm visible md:hidden"
          onClick={() => setHideLinks((prev) => !prev)}
        >
          {hideLinks ? "[[O]]" : "[[X]]"}
        </button>
      </div>
    </div>
  );
}
