import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../functionsJs/urls";
import ImageDemo2 from "../ImageDemo2";
import { Navigate, NavLink } from "react-router-dom";
export default function ChangePic() {
  const user = useSelector((state) => state.user);
  const [imgToBeDisplayed, setImage] = useState(user.userData.ProfilePic);
  const [profilePic, setImageDiv] = useState(false);
  if (!user.loggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex justify-center pt-[100px]">
      <div className="p-4 bg-black">
        <img
          src={`${baseUrl}/${imgToBeDisplayed}`}
          alt="Main-profile"
          className="w-[100px]"
        />
        <button
          className="text-[12px] bg-red-500 px-2 rounded-lg"
          type="button"
          onClick={() => setImageDiv(true)}
        >
          Change Profile Pic
        </button>
      </div>
      {profilePic && <ImageDemo2 fn={{ setImageDiv }} />}
    </div>
  );
}
