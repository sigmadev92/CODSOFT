import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { usersUrl } from "../component/functionsJs/urls";

export default function ForgotPassword() {
  const [Email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (Email === "") {
      toast.warn("Please enter Your email first");
      return;
    }
    axios
      .get(`${usersUrl}/forget-password`, {
        headers: {
          email: Email,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        if (res.status)
          toast.success("A temporary password has been sent to " + Email);
        else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  return (
    <div className="w-[90%] max-w-[400px] h-[200px] rounded-md border-2 border-black shadow-md bg-blue-200 m-auto mt-[50px] ">
      <h1 className="text-white bg-black font-bold text-center ">
        Recover Password
      </h1>
      <p className="p-2">
        Enter your registered Email. A temporary password will be sent to Your
        Email.
      </p>
      <form>
        <input
          type="email"
          name="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-[90%] m-auto border-2 border-black mt-2 px-3 placeholder:text-[12px] placeholder:text-red-400"
          placeholder="your email here..."
        />
        <button
          type="submit"
          className="px-2 bg-green-400 hover:bg-green-700 mt-3 border-2 border-black rounded-md  ml-[20px] text-[12px]"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
        <div className="flex justify-between mt-1 px-[20px] font-bold">
          <Link to={"/login"} className="text-[15px] hover:text-red-500">
            Login
          </Link>
          <Link to={"/register"} className="text-[15px] hover:text-red-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
