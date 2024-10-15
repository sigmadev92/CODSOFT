import React from "react";
import "./Home.css";
import Org from "../component/home/Org";
import Recruiter from "../component/home/Recruiter";
import bg from "../component/images/register.jpeg";
import Talent from "../component/home/Talent";
import WhoWeare from "../component/home/WhoWeare";
import WhyUs from "../component/home/WhyUs";
import Main from "../component/home/static/Main";
import FeaturedJobs from "../component/home/FeaturedJobs";
export default function Home() {
  // const [user, setUser] = useState({});

  return (
    <>
      <img src={bg} alt="back-ground" className="absolute -z-10 blur-xl " />
      <div className="make-blur">
        <Main />
        <hr className="h-2 my-5" />
        <FeaturedJobs />
        <hr className="h-2 my-5" />

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
    </>
  );
}
