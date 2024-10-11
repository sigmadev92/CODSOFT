import React from "react";
import imgTeam from "../images/team.jpeg";
import imgTeam2 from "../images/team-2.jpeg";
import imgTeam3 from "../images/team-3.jpeg";
import dev1 from "../images/programer-1.jpeg";
import dev2 from "../images/programer-2.jpeg";
import dev3 from "../images/programer-3.jpeg";
import dev4 from "../images/programer-4.jpeg";
import dev5 from "../images/programer-5.jpeg";
import dev6 from "../images/programer-6.jpeg";
import dev7 from "../images/programer-7.jpeg";
export default function WhoWeare() {
  const devs = [dev1, dev2, dev3, dev4, dev5, dev6, dev7];
  return (
    <div className=" ">
      <div id="info" className="w-[80%] mx-auto mb-[50px]">
        <p className="">
          We are an experienced team of University Of Texas who have developed
          this website for the freshers and experienced professionals who are
          seeking job.This is a job portal initially designed for software
          related jobs but today this portal is used by top companies and
          recruiters world wide.{" "}
        </p>
        <p className="">
          Our aim is to provide a healthy job to each job seeker who meet the
          actual and required job requirements without any cost. Only top
          services costs you.
        </p>
      </div>

      <div className="w-[70%] m-auto">
        <div id="team">
          <h1 className="text-center">Our team</h1>
          <div className="flex justify-center gap-4 flex-wrap">
            <img src={imgTeam} alt="team" className="w-[300px]" />
            <img src={imgTeam2} alt="team" className="w-[300px]" />
            <img src={imgTeam3} alt="team" className="w-[300px]" />
          </div>
        </div>
        <div id="developers">
          <h1 className="text-center">Our developers. Join Us</h1>
          <div className="flex flex-wrap gap-6 justify-center">
            {devs.map((dev, index) => {
              return (
                <img
                  src={dev}
                  alt="developers"
                  key={index}
                  className="w-[100px]"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
