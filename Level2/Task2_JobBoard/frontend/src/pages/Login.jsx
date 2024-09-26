import React, { useState } from "react";
import UserLogin from "../component/UserLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const [UserType, setType] = useState("seeker"); //possible values are {seeker,recruiter,org}
  const [hidden, setHidden] = useState(true);
  function handleChange(event) {
    console.log(event.target.value);
    setType(event.target.value);
    setHidden(true);
  }
  return (
    <div className="w-full h-full" id="main12">
      <div className=" max-w-[400px] w-[90%] md:w-[50%] border-2 border-black m-auto my-[50px] rounded-t-[10px]">
        <h1 className="font-serif text-center bg-black text-[aqua]">
          You want to Login as
        </h1>
        <form className=" p-3">
          <input
            type="radio"
            name="Type"
            id="Type"
            value={"seeker"}
            onChange={handleChange}
            checked={UserType === "seeker"}
          />
          Job Seeker
          <input
            type="radio"
            name="Type"
            id="Type"
            value={"org"}
            onChange={handleChange}
          />
          Organisation
          <input
            type="radio"
            name="Type"
            id="Type"
            value={"recruiter"}
            onChange={handleChange}
          />
          Recruiter
        </form>
        <div className="flex justify-around text-[12px] my-2">
          <Link to="/register" className="hover:text-[blue]">
            Don't have an account ? Register
          </Link>
          <Link to="forgot-password" className="hover:text-[red]">
            Forgot Password
          </Link>
        </div>
        <button
          type="button"
          className="text-gray-900 bg-green-600 px-2 ml-3 my-1"
          onClick={() => setHidden(false)}
        >
          {" "}
          Proceed
        </button>
        <hr />
        {!hidden && <UserLogin UserType={UserType} />}
      </div>
    </div>
  );
}
