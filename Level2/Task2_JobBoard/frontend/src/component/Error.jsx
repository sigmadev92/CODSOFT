import React from "react";

export default function Error(props) {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col justify-center mt-[-50px]">
        <h1 className="text-white font-bold">
          {props.message ? props.message : "Some Unknown Error Occured"}
        </h1>
      </div>
    </div>
  );
}
