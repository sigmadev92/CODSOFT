import React, { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, usersUrl } from "../../../functionsJs/urls";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUser } from "../../../redux/slice/userSlice";
export default function EditProfile(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(user.userData);
  const {
    FullName,
    Gender,
    BirthDate,
    PhoneNumber,
    JobRole,
    CompanyName,
    Position,
    About,
  } = userDetails;
  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${usersUrl}/edit-user/${user.userData.USER_ID}`, userDetails)
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          toast.success("Profile edited successfully");
          props.fn(false);
          dispatch(fetchUser());
        } else {
          console.log(res.message);
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="absolute top-0 left-0 z-20 bg-[rgba(51,52,46,0.5)] flex md:justify-center w-[1300px] ">
      <div className="text-black w-[400px] ml-[40px] md:w-[300px] h-[330px] bg-white border-2 border-black rounded-lg z-20 top-0 mb-[100px] overflow-y-scroll">
        <div className="rounded-t-md bg-black flex justify-between px-3 ">
          <h1 className="text-white">Edit Profile</h1>
          <AiOutlineCloseSquare
            onClick={() => props.fn(false)}
            className="text-white hover:text-red-500 mt-[2px] cursor-pointer"
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
          <input
            type="text"
            name="FullName"
            value={FullName}
            onChange={handleChange}
            className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto "
            placeholder="Enter your full name..."
          />

          {user.userData.UserType !== "org" && (
            <>
              <div id="gender" className="flex gap-x-3 px-5 text-[10px]">
                <span className="mt-[10px] font-bold">Gender</span>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="Male"
                    checked={Gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    checked={Gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="Futanari"
                    checked={Gender === "Futanari"}
                    onChange={handleChange}
                  />
                  Futanari
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="0"
                    checked={Gender === "0"}
                  />
                  Skip
                </label>
              </div>
              <h1 className="text-black font-bold text-[10px] ml-[20px]">
                Actual Birth Date :{" "}
                {moment(user.userData.BirthDate).format("DD/MM/YYYY")}
              </h1>
              <label className="text-black text-[12px] flex gap-x-3 px-5 font-semibold">
                <span className="mt-[10px]">Change</span>{" "}
                <input
                  type="date"
                  name="BirthDate"
                  value={BirthDate}
                  onChange={handleChange}
                  className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto"
                  placeholder="Enter your Birth Date"
                />
              </label>
            </>
          )}

          <input
            type="text"
            name="PhoneNumber"
            value={PhoneNumber}
            onChange={handleChange}
            maxLength={10}
            minLength={10}
            className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto "
            placeholder="Enter your Phone Number"
          />
          {user.userData.UserType === "seeker" && (
            <input
              type="text"
              name="JobRole"
              value={JobRole}
              onChange={handleChange}
              className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto "
              placeholder="Preferred Job Role..."
            />
          )}
          {user.userData.UserType === "recruiter" && (
            <>
              <input
                type="text"
                name="Position"
                value={Position}
                onChange={handleChange}
                className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto "
                placeholder="Your Current Position in the company..."
              />
              <input
                type="text"
                name="CompanyName"
                value={CompanyName}
                onChange={handleChange}
                className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto "
                placeholder="Current Company..."
              />
            </>
          )}

          <label htmlFor="textarea" className="font-bold text-[15px] ml-[20px]">
            About
          </label>
          <textarea
            name="About"
            value={About}
            defaultValue={About}
            onChange={handleChange}
            maxLength={500}
            minLength={200}
            id="textarea"
            className="text-[12px] px-5 border-red-300 border-2 block w-[90%] mx-auto resize-none"
            placeholder="Write Something about you"
          ></textarea>
          {user.userData.UserTYpe === ""}
          <div className="text-center my-4">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 cursor-pointer px-2 rounded-md  text-[12px] font-bold py-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              className=" text-[12px] bg-[red] hover:bg-black cursor-pointer px-2 rounded-md"
              onClick={() => {
                setUserDetails(user.userData);
                document.getElementById("textarea").value = "";
              }}
            >
              Reset
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
