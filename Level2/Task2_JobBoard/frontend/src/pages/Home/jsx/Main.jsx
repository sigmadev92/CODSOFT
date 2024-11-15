import React from "react";

export default function Main() {
  return (
    <div className="bg-black h-[530px] flex justify-center relative">
      <img src="images/office.jpeg" className="w-full " alt="office" />
      <div className=" bg-[#2a8ae460] w-full absolute h-full pt-[100px]">
        <h1 className="text-center">
          <span className="font-serif text-[100px] md:text-[120px] font-bold ">
            Job
          </span>
          <span className="font-serif text-[100px] md:text-[120px] font-bold text-white bg-black rounded-md">
            Soft
          </span>
        </h1>
        <h1 className=" text-[20px] italic font-bold text-center mt-3 bg-white">
          India's largest platform for talent hunt
        </h1>
      </div>
    </div>
  );
}
