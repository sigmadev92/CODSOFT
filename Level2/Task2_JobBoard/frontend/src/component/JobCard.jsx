import React from "react";

export default function JobCard(props) {
  const jobDetail = props.data;
  return (
    <div
      id="job-card-main"
      className="w-[200px] h-[150px] bg-gray-600 m-2 shadow-sm p-2 rounded-[10px] "
    >
      <img
        src={`http://localhost:1008/${jobDetail.ProfilePic}`}
        alt="Org or recruiter portrait"
        className="w-[30px] h-[30px] ml-2 mt-2 mb-3"
      />
      <h1 className="text-white font-mono text-[12px]">{jobDetail.Title}</h1>
      <h1 className="text-white font-sans text-[10px]">
        {jobDetail.CreatedBy}
      </h1>
      <div className="flex gap-x-2">
        <h1 className="text-[10px] text-white font-bold">
          {jobDetail.JobType === "intern" && "Internship"}
          {jobDetail.JobType === "full-time" && "Full Time"}
          {jobDetail.JobType === "contract" && "Contract"}
        </h1>

        <h1 className="text-white font-mono text-[10px]">{jobDetail.Venue}</h1>
      </div>
      <h1 className="text-white font-mono text-[10px]">
        {jobDetail.Venue !== "remote" && jobDetail.Cities[0]}
      </h1>
    </div>
  );
}
