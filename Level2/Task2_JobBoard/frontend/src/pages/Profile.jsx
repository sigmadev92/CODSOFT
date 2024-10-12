import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdOutlineWork } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import { baseUrl, usersUrl } from "../component/functionsJs/urls";
export default function Profile() {
  const user_ID = window.location.pathname.slice(9);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    function fetch() {
      axios
        .get(`${usersUrl}/data/`, {
          headers: {
            profile: user_ID,
          },
        })
        .then((response) => {
          if (response.data.status) setUserDetails(response.data.data);
          else console.log(response.data);
        })
        .catch((error) => console.log(error));
    }

    fetch();
  }, []);

  return (
    <>
      {userDetails && (
        <>
          <div
            id="details"
            className="p-4 bg-violet-950 w-[80%] mx-auto rounded-b-xl flex justify-between"
          >
            <img
              src={`${baseUrl}/${userDetails.ProfilePic}`}
              alt="profile"
              className="w-[30%] h-[30%] md:w-[20%] md:h-[20%] rounded-full border-white border-[2px] "
            />
            <div className="text-white text-[12px]">
              {" "}
              <h1 className="text-[20px] font-bold">{userDetails.FullName}</h1>
              <h1>
                <MdOutlineWork className="inline mr-1" /> {userDetails.JobRole}
              </h1>
              <h1>
                {" "}
                <IoMdTime className="inline mr-1" /> Joined{" "}
                {moment(userDetails.createdAt).fromNow()}
              </h1>
              <h1 className="">
                <CgMail className="inline mr-1" />
                {userDetails.Email}
              </h1>
              <h1 className="">
                {userDetails.UserType === "seeker" && "Open To Work"}
              </h1>
            </div>
          </div>
          <div className="w-[80%] mx-auto p-3">
            <h1 className="text-[20px] font-bold">About</h1>
            <p>{userDetails.About?.About}</p>
            <h1 className="text-[20px] font-bold">Posts</h1>
            <h1 className="text-[20px] font-bold">Certifications</h1>
          </div>
        </>
      )}
    </>
  );
}
