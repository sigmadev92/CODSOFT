import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!user.loggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <h1 className="text-center bg-black text-white font-bold">Dashboard</h1>
      <button
        className="bg-green-400 font-serif italic hover:bg-green-600 p-1 shadow-lg m-2 rounded-md border-black border-2 text-[10px]"
        onClick={() => navigate(`/profile/${user.userData.USER_ID}`)}
      >
        Your Public Profile
      </button>
    </div>
  );
}
