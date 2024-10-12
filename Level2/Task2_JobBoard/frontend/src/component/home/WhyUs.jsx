import React from "react";

import investor1 from "../images/investor-1.jpeg";
import investor2 from "../images/investor-2.jpeg";
import investor3 from "../images/investor-3.jpeg";
import investor4 from "../images/investor-4.jpeg";
import investor5 from "../images/investor-5.jpeg";

import ambas1 from "../images/ambas-1.jpeg";
import ambas2 from "../images/ambas-2.jpeg";

import ceo from "../images/ceo.jpeg";
import cfo from "../images/cfo.jpeg";
export default function WhyUs() {
  //A static component
  const Investorimgs = [investor1, investor2, investor3, investor4, investor5];
  const ambasimgs = [ambas1, ambas2];
  return (
    <div className="my-[50px]">
      <h1 className="text-[30px] font-bold text-center mb-3 ">
        They believe in Us. Our Investors
      </h1>
      <div className="flex justify-center flex-wrap gap-x-3">
        {Investorimgs.map((investor, index) => {
          return (
            <img
              src={investor}
              alt="investors"
              key={index}
              className="max-w-[200px] max-h-[200px] rounded-3xl"
            />
          );
        })}
      </div>

      <h1 className="text-[30px] font-bold text-center mt-[30px] ">
        Our Brand Ambassadors
      </h1>
      <div className="flex justify-center gap-x-3 mb-[50px]">
        {ambasimgs.map((ambassdor, index) => {
          return (
            <img
              src={ambassdor}
              alt="Ambassdors"
              key={index}
              className="max-w-[200px] max-h-[200px] rounded-3xl"
            />
          );
        })}
      </div>
      <h1 className="text-[30px] font-bold text-center mt-[30px] ">
        Our Inspirations
      </h1>
      <div id="officers" className="flex justify-center">
        <div id="ceo">
          <img src={ceo} alt="CEO" className="w-[200px] h-[200px]" />
          <h1 className="text-[12px] font-bold">Alan Ruhansky </h1>
          <h1>CEO, JobSoft</h1>
        </div>
        <div id="cfo">
          <img src={cfo} alt="CFO" className="w-[200px] h-[200px]" />
          <h1 className="text-[12px] font-bold">Denis Scorpio </h1>
          <h1>CFO, JobSoft</h1>
        </div>
      </div>
    </div>
  );
}
