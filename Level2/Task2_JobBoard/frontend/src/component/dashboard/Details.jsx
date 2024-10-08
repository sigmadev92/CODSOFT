import React, { useState } from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

export default function Details(props) {
  const user = useSelector((state) => state.user);
  const [editProfileBox, setEditProfileBox] = useState(false);
  return (
    <div
      id="details"
      className="p-3 w-[250px] text-white  bg-slate-700 rounded-r-lg absolute left-0 z-10"
    >
      {" "}
      <div className="flex justify-end">
        <LuPanelLeftClose
          className="cursor-pointer hover:text-black "
          onClick={() => props.fn(false)}
        />
      </div>
      <div className="bg-white rounded-r-lg mt-5 flex justify-center">
        <img
          src={`http://localhost:1008/${user.userData.ProfilePic}`}
          alt="profile"
          className="w-[150px] h-[150px] rounded-full "
        />
      </div>
      <h1 className="font-semibold">{user.userData.FullName}</h1>
      <h1 className="text-[12px] font-bold">{user.userData.JobRole}</h1>
      <h1 className="text-[12px]">{user.userData.Email}</h1>
      <h1 className="text-[12px]">{user.userData.PhoneNumber}</h1>
      {user.userData.userType === "seeker" && (
        <h1
          className="text-[12px] cursor-pointer hover:text-[aqua]"
          onClick={() =>
            window.open(`http://localhost:1008/${user.userData.Resume}`)
          }
        >
          My resume
        </h1>
      )}
      <div className="flex justify-end">
        <FaUserEdit
          className="relative hover:text-black cursor-pointer"
          onClick={() => setEditProfileBox(true)}
        />
      </div>
      {editProfileBox && <EditProfile fn={setEditProfileBox} />}
    </div>
  );
}
