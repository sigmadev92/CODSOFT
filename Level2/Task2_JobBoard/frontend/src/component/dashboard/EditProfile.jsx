import React from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
export default function EditProfile(props) {
  return (
    <div className="absolute top-0 left-0 z-20 bg-[rgba(51,52,46,0.5)] flex justify-center w-[1300px] ">
      <div className=" w-[300px] h-[330px] bg-white border-2 border-black rounded-lg z-20 top-0 mb-[100px]">
        <div className="rounded-t-md bg-black flex justify-around ">
          <h1>Edit Profile</h1>
          <AiOutlineCloseSquare
            onClick={() => props.fn(false)}
            className="hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
