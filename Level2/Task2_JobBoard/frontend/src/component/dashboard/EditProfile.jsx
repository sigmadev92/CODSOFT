import React, { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import { baseUrl } from "../functionsJs/urls";
export default function EditProfile(props) {
  const user = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({
    FullName: user.userData.FullName,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="absolute top-0 left-0 z-20 bg-[rgba(51,52,46,0.5)] flex md:justify-center w-[1300px] ">
      <div className="w-[400px] ml-[40px] md:w-[300px] h-[330px] bg-white border-2 border-black rounded-lg z-20 top-0 mb-[100px]">
        <div className="rounded-t-md bg-black flex justify-between px-3 ">
          <h1>Edit Profile</h1>
          <AiOutlineCloseSquare
            onClick={() => props.fn(false)}
            className="hover:text-red-500 mt-[2px] cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mt-2">
            <img
              src={`${baseUrl}/${user.userData.ProfilePic}`}
              alt="main-profile"
              className="w-[70px] h-[70px] bg-red-500 rounded-full"
            />
          </div>
          <div className="text-center">
            <button className="bg-black rounded-md px-2 hover:bg-green-600 text-[10px] ">
              Change Profile Pic
            </button>
          </div>

          <input
            type="text"
            name="FullName"
            className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto text-black"
            placeholder="Enter your Full Name"
          />
          <div id="gender" className="flex gap-x-3 text-black px-5 text-[10px]">
            <span className="mt-[10px] font-bold">Gender</span>
            <label>
              <input type="radio" name="Gender" value="male" />
              Male
            </label>
            <label>
              <input type="radio" name="Gender" value="female" />
              Female
            </label>
            <label>
              <input type="radio" name="Gender" value="futanari" />
              Futanari
            </label>
            <label>
              <input type="radio" name="Gender" value="0" />
              Skip
            </label>
          </div>

          <div className="text-center">
            <button className="bg-green-400 hover:bg-green-500 cursor-pointer px-2 rounded-md text-black">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
Gender: {
      type: String,
      required: function () {
        return this.UserType !== "org";
      },
    },
    FullName: {
      type: String,
      required: true,
    },
    BirthDate: {
      type: Date,
      required: function () {
        return this.UserType !== "org";
      },
    },

    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },

    ProfilePic: {
      type: String,
      required: true,
    },
    USER_ID: {
      type: String,
      required: true,
    },
    Posts: {
      type: Array,
    },
    Resume: {
      type: String,
      required: function () {
        return this.UserType === "seeker";
      },
    },

    JobRole: {
      type: String,
      required: function () {
        return this.UserType === "seeker";
      },
    },
    CompanyName: {
      type: String,
      required: function () {
        return this.UserType === "recruiter";
      },
    },
    Position: {
      type: String,
      required: function () {
        return this.UserType === "recruiter";
      },
    },
    About: {
      type: String,
    },
  },
*/
