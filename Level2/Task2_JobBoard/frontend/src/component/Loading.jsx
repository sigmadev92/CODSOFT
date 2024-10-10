import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="w-[50px] h-[50px] rounded-full border-[3px] border-black border-l-neutral-300 animate-spin"></div>
      </div>
    </div>
  );
}
