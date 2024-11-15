import React, { useState } from "react";
import UserRegister from "./jsx/UserRegister";
import "./Register.css";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../component/Loading";
import Box1 from "./jsx/Box1";
export default function Register() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [UserType, setType] = useState("seeker"); //possible values are {seeker,recruiter,org}
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="h-[530px] py-[50px] w-full flex justify-center bg-slate-500">
      {" "}
      <div className=" max-w-[400px] w-[90%] h-fit border-2 border-black  rounded-t-[10px] bg-white shadow-lg shadow-[#00000034]">
        <Box1 setType={setType} UserType={UserType} setHidden={setHidden} />
        <hr />
        {!hidden && <UserRegister UserType={UserType} loading={setLoading} />}
        {loading && <Loading />}
      </div>
    </div>
  );
}
