import React, { useState } from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { baseUrl } from "../../../functionsJs/urls";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Details(props) {
  const user = useSelector((state) => state.user);
  const [editProfileBox, setEditProfileBox] = useState(false);

  const navigate = useNavigate();

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
          src={`${baseUrl}/${user.userData.ProfilePic}`}
          alt="profile"
          className="w-[150px] h-[150px] rounded-full "
        />
      </div>
      <h1 className="font-semibold">{user.userData.FullName}</h1>
      <h1 className="text-[12px] font-bold">{user.userData.JobRole}</h1>
      <h1 className="text-[12px]">{user.userData.Email}</h1>
      <h1 className="text-[12px]">{user.userData.PhoneNumber}</h1>
      <div className="flex justify-end">
        <FaUserEdit
          className="relative hover:text-black cursor-pointer"
          title="Update Profile"
          onClick={() => setEditProfileBox(true)}
        />
      </div>
      {user.userData.UserType === "seeker" && (
        <div className="flex justify-between mt-3">
          <h1
            className="text-[12px] cursor-pointer hover:text-[aqua]"
            onClick={() => window.open(`${baseUrl}/${user.userData.Resume}`)}
          >
            My resume
          </h1>
          <FaPencilAlt
            className="hover:text-black cursor-pointer text-[12px]"
            onClick={() => navigate("/change-resume")}
          />
        </div>
      )}
      {editProfileBox && <EditProfile fn={setEditProfileBox} />}
    </div>
  );
}
