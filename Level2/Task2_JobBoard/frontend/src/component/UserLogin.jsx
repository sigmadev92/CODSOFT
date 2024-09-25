import React, { useState } from "react";
import seekerImg from "./images/blank-profile-pic.png";
import recruiterImg from "./images/recruiter-image.png";
import orgImg from "./images/org-image.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function UserLogin(props) {
  const navigate = useNavigate();
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
      .post("http://localhost:1008/users/register", details)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
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
      <input
        className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
        type="password"
        name="Password"
        value={Password}
        placeholder="Password"
        onChange={HandleChange}
      />
      <div className="flex justify-around text-[12px] mb-2">
        <Link to="/register" className="hover:text-[blue]">
          Don't have an account ? Register
        </Link>
        <Link to="forgot-password" className="hover:text-[red]">
          Forgot Password
        </Link>
      </div>

      <button
        type="submit"
        className="block w-full bg-green-400 font-semibold hover:text-[black] hover:bg-[aqua] border-t-2 border-black"
      >
        Submit
      </button>
    </form>
  );
}
