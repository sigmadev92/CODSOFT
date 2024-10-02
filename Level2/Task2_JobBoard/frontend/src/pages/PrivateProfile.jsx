import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateProfile() {
  const link = window.location.pathname;
  const user = useSelector((state) => state.user);
  if (!user.loggedIn || user.userData.USER_ID !== link.slice(9))
    return <Navigate to="/" />;
  return <div></div>;
}
