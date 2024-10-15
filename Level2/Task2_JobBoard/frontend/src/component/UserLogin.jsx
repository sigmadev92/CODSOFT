import React, { useState } from "react";
import seekerImg from "./images/blank-profile-pic.png";
import recruiterImg from "./images/recruiter-image.png";
import orgImg from "./images/org-image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAuth } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import { usersUrl } from "./functionsJs/urls";
export default function UserLogin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordHidden, setpaswordHIdden] = useState(true);
  const [details, setDetails] = useState({
    UserType: props.UserType,
    Email: "",
    Password: "",
  });
  const {
    UserType,

    Email,

    Password,
  } = details;
  function profile() {
    if (UserType === "org") return orgImg;
    if (UserType === "recruiter") return recruiterImg;
    return seekerImg;
  }

  const imgToBedisp = profile();
  const HandleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  function HandleSubmit(event) {
    event.preventDefault();

    axios
      .post(`${usersUrl}/login`, details)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          localStorage.setItem("jwt", response.data.jwt);
          dispatch(setAuth(response.data.userData));
          toast.success("Logged In successfully");
          navigate("/");
          // window.location.reload();
        } else {
          alert("Wrong credentials. Try again");
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error("SOme technical error at our end");
        console.log(err);
      });
  }
  return (
    <form onSubmit={HandleSubmit} className="block">
      <img
        src={imgToBedisp}
        alt="You Profile pic"
        className="w-[50px] h-[50px] m-auto rounded-full my-[10px] border-2 border-blue-500"
        onClick={() => console.log(UserType)}
      />

      <input
        className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
        type="email"
        name="Email"
        value={Email}
        placeholder="Email"
        onChange={HandleChange}
      />
      <div className="flex  w-[90%] mx-auto justify-center mt-[-10px] mb-[-10px]">
        <input
          className="border-2 border-blue-600 placeholder:font-mono ml-[-0.5px] w-full px-3 mr-[-3px]"
          type={passwordHidden ? "password" : "text"}
          name="Password"
          value={Password}
          placeholder="Password"
          onChange={HandleChange}
        />
        <button
          type="button"
          className=" border-2 bg-red-400 border-black h-fit mt-[10px] px-2 hover:bg-[aqua]"
          onClick={() => setpaswordHIdden((prev) => !prev)}
        >
          TE
        </button>
      </div>

      <button
        type="submit"
        className="block w-full bg-green-400 font-semibold hover:text-[black] hover:bg-[aqua] border-t-2 border-black mt-3"
      >
        Login
      </button>
    </form>
  );
}
