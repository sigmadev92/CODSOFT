import React, { useState } from "react";
import img from "./images/android-chrome-512x512.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../redux/slice/userSlice";
import { IoMdMenu } from "react-icons/io";
import { AiTwotoneCloseCircle } from "react-icons/ai";
export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const link = window.location.pathname;
  const [hideLinks, setHideLinks] = useState(true);
  const linksClass =
    "text-white text-[12px] md:text-[15px] px-2 md:border-none cursor-pointer md:hover:bg-black hover:bg-red-300 rounded-md";

  const navigate = useNavigate();
  return (
    <div className="bg-[#257180] w-full flex justify-between p-2 sticky top-0 z-50 ">
      <div id="heading" className="flex ml-[30px] gap-x-2">
        <img
          src={img}
          alt="JobSoft-A platform by CodSoft"
          className="w-[44px]"
        />
        <h1 className="font-serif text-[30px]">
          <span className="text-[#FD8B51]">Job</span>
          <span className="text-white">Soft</span>
        </h1>
      </div>
      <div id="links" className="mr-[30px] mt-[10px]">
        <ul
          id="navbar-links-sm"
          className={`absolute right-3 mt-[25px] bg-black rounded-md ${
            hideLinks && "hidden"
          }
          gap-x-2  md:flex md:visible md:flex-row md:relative md:bg-transparent md:mt-0`}
        >
          <li
            className={`${linksClass} ${link === "/" && "bg-black"}`}
            onClick={() => {
              setHideLinks(true);
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            className={`${linksClass} ${link === "/jobs" && "bg-black"}`}
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
                className={`${linksClass} ${
                  link.includes("dashboard") && "bg-black"
                }`}
                onClick={() => {
                  setHideLinks(true);
                  navigate("/dashboard/");
                }}
              >
                Dashboard
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
              className={`${linksClass} ${link === "/login" && "bg-black"}`}
              onClick={() => {
                setHideLinks(true);
                navigate("/login");
              }}
            >
              Login
            </li>
          )}

          <li
            className={`${linksClass} ${link === "/about" && "bg-black"}`}
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
          {hideLinks ? <IoMdMenu /> : <AiTwotoneCloseCircle />}
        </button>
      </div>
    </div>
  );
}
