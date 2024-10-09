import React from "react";
import imgdiv1 from "../component/images/office.jpeg";
import "./Home.css";

export default function Home() {
  // const [user, setUser] = useState({});

  return (
    <>
      <img src={imgdiv1} alt="div-1" className="absolute -z-10 " />
      <div className="make-blur">
        <div className="w-full flex justify-center p-3 ">
          <div className="p-3 ">
            <h1 className="">
              <span className="font-serif text-[100px] md:text-[120px] font-bold text-green-500">
                Job
              </span>
              <span className="font-serif text-[100px] md:text-[120px] font-bold text-white">
                Soft
              </span>
            </h1>
            <h1 className=" text-[20px] italic text-[aqua] text-center ">
              India's largest platform for talent hunt
            </h1>
          </div>
        </div>

        <div className="">
          <h1 className="text-center text-white font-bold text-[30px]">
            Who We are ?
          </h1>
          <h1 className="text-center text-white font-bold text-[30px]">
            Top Talents world wide
          </h1>

          <h1 className="text-center text-white font-bold text-[30px]">
            Trusted by Top Organizations
          </h1>

          <h1 className="text-center text-white font-bold text-[30px]">
            Recommended by Experienced Recruiters
          </h1>
        </div>
      </div>
    </>
  );
}
