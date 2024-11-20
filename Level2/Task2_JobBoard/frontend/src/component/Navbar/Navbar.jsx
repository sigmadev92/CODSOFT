import React, { useState } from "react";
import img from "../images/android-chrome-512x512.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../../redux/slice/userSlice";
import { IoMdMenu } from "react-icons/io";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa";
import { GrLogin, GrLogout } from "react-icons/gr";
import { RiHome4Fill } from "react-icons/ri";
import { SiAboutdotme } from "react-icons/si";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const link = window.location.pathname;
  const [hideLinks, setHideLinks] = useState(true);
  const navigate = useNavigate();
  const links = [
    {
      title: "Home",
      icon: RiHome4Fill,
      linkto: "/",
      visible: true,
    },
    { title: "Jobs", icon: FaBriefcase, linkto: "/jobs", visible: true },
    {
      title: "Dashboard",
      icon: BiSolidDashboard,
      linkto: "/dashboard",
      visible: user.loggedIn,
    },
    {
      title: "Logout",
      icon: GrLogout,
      linkto: "/login",
      visible: user.loggedIn,
    },
    {
      title: "Login",
      icon: GrLogin,
      linkto: "/login",
      visible: !user.loggedIn,
    },
    {
      title: "About",
      icon: SiAboutdotme,
      linkto: "/about",
      visible: true,
    },
  ];

  const linksClass =
    "text-white text-[12px] md:text-[12px] px-2 md:border-none cursor-pointer md:hover:bg-black hover:bg-red-300 rounded-md";

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
          {links
            .filter((navlink) => navlink.visible)
            .map((navLink, index) => {
              return (
                <li key={index}>
                  <div
                    className={`${linksClass} ${
                      link === navLink.linkto && "bg-black"
                    }`}
                    onClick={() => {
                      setHideLinks(true);
                      if (navLink.title === "Logout") {
                        dispatch(deleteAuth());
                        localStorage.removeItem("jwt");
                      }
                      navigate(navLink.linkto);
                    }}
                  >
                    <navLink.icon className="mx-auto" />
                    <h1 className="text-center">{navLink.title}</h1>
                  </div>
                </li>
              );
            })}
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
