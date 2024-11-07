import React, { useState } from "react";
import UserRegister from "./jsx/UserRegister";
import "./Register.css";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../component/Loading";
export default function Register() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [UserType, setType] = useState("seeker"); //possible values are {seeker,recruiter,org}
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  function handleChange(event) {
    console.log(event.target.value);
    setType(event.target.value);
    setHidden(true);
  }
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className=" max-w-[400px] w-[90%] md:w-[50%] border-2 border-black m-auto my-[50px] rounded-t-[10px] bg-white">
        <h1 className="font-serif text-center bg-black text-[aqua]">
          You want to get Registered as
        </h1>
        <form className=" p-3">
          <label>
            {" "}
            <input
              type="radio"
              name="Type"
              id="Type"
              value={"seeker"}
              onChange={handleChange}
              checked={UserType === "seeker"}
            />
            Job Seeker
          </label>

          <label>
            {" "}
            <input
              type="radio"
              name="Type"
              id="Type"
              value={"org"}
              onChange={handleChange}
            />
            Organisation
          </label>

          <label>
            <input
              type="radio"
              name="Type"
              id="Type"
              value={"recruiter"}
              onChange={handleChange}
            />
            Recruiter
          </label>
        </form>
        <div className="flex justify-around text-[12px] my-2">
          <Link to="/login" className="hover:text-[blue]">
            Already have an account ? Login
          </Link>
          <Link to="/forgot-password" className="hover:text-[red]">
            Forgot Password
          </Link>
        </div>
        <button
          type="button"
          className="text-gray-900 bg-green-600 px-2 ml-3 my-1 rounded-md hover:bg-green-500 "
          onClick={() => {
            setHidden(false);
          }}
        >
          {" "}
          Proceed
        </button>
        <hr />
        {!hidden && <UserRegister UserType={UserType} loading={setLoading} />}
        {loading && <Loading />}
      </div>
    </>
  );
}
