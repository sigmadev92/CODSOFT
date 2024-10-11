import React from "react";
import "./Home.css";
import Org from "../component/home/Org";
import Recruiter from "../component/home/Recruiter";
import bg from "../component/images/register.jpeg";
import Talent from "../component/home/Talent";
import WhoWeare from "../component/home/WhoWeare";
import WhyUs from "../component/home/WhyUs";
export default function Home() {
  // const [user, setUser] = useState({});

  return (
    <>
      <img src={bg} alt="back-ground" className="absolute -z-10 blur-xl" />
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
        <hr className="h-2 my-5" />
        <div className="">
          <h1 className="text-center font-bold text-[30px]">Who We are ?</h1>
          <WhoWeare />
          <hr className="h-2 my-5" />
          <h1 className="text-center  font-bold text-[30px]">
            Top Talents world wide
          </h1>
          <Talent />
          <hr className="h-2 my-5" />

          <h1 className="text-center  font-bold text-[30px]">
            Trusted by Top Organizations
          </h1>
          <Org />
          <hr className="h-2 my-5" />
          <h1 className="text-center font-bold text-[30px]">
            Recommended by Experienced Recruiters
          </h1>
          <Recruiter />
          <WhyUs />
        </div>
      </div>
    </>
  );
}
