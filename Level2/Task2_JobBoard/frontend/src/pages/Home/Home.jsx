import React from "react";
import "./Home.css";
import Org from "./jsx/Org";
import Recruiter from "./jsx/Recruiter";
import Talent from "./jsx/Talent";
import Main from "./jsx/Main";
import FeaturedJobs from "./jsx/FeaturedJobs";
export default function Home() {
  // const [user, setUser] = useState({});

  return (
    <>
      <Main />
      <FeaturedJobs />

      <h1 className="text-center  font-bold text-[30px]">
        Top Talents world wide
      </h1>
      <Talent />

      <h1 className="text-center  font-bold text-[30px]">
        Trusted by Top Organizations
      </h1>
      <Org />
      <h1 className="text-center font-bold text-[30px]">
        Recommended by Experienced Recruiters
      </h1>
      <Recruiter />
    </>
  );
}
