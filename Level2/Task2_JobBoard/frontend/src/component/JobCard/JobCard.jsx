import React from "react";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { baseUrl, jobsUrl } from "../../functionsJs/urls";
import ApplyToJob from "./jsx/ApplyToJob";
import SaveJob from "./jsx/SaveJob";
import axios from "axios";
import { toast } from "react-toastify";

export default function JobCard(props) {
  const user = useSelector((state) => state.user);
  const jobDetail = props.data;
  const navigate = useNavigate();

  async function handleDeleteButton() {
    const confirm = window.confirm(
      `Do you want to delete this job? Job_ID : ${jobDetail._id}`
    );

    if (!confirm) {
      return;
    }

    await axios
      .delete(`${jobsUrl}/delete-job-post/${jobDetail._id}`)
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          toast.success("job Deleted Successfully");
          props.deleteRefresh((prev) => !prev);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  async function handleEditButton() {
    toast.error("This functionality is in progress");
  }

  return (
    <div
      id="job-card-main"
      className="w-[200px] h-[170px] bg-gray-600 m-2 shadow-sm p-2 rounded-[10px] "
    >
      <div
        className="flex justify-around bg-white rounded-md"
        onClick={() => navigate(`/jobs/${jobDetail._id}`)}
      >
        <img
          src={`${baseUrl}/${jobDetail.ProfilePic}`}
          alt="Org or recruiter portrait"
          className="w-[40px] h-[40px] my-1 rounded-full"
        />
        <h1 className="hover:text-blue-400 cursor-pointer font-bold my-3 text-[12px]">
          View Details
        </h1>
      </div>
      <h1 className="text-white font-mono text-[12px] truncate">
        {jobDetail.Title}
      </h1>
      <h1 className="text-white font-sans text-[10px]">
        {jobDetail.CreatorType === "recruiter" ? "Posted by " : ""}
        <span
          className="text-green-700 bg-white px-1 rounded-sm hover:text-red-500 cursor-pointer"
          onClick={() => {
            navigate(`/profile/${jobDetail.CreatorInfo}`);
          }}
        >
          {jobDetail.CreatedBy}
        </span>
      </h1>
      <div className="flex gap-x-2">
        <h1 className="text-[10px] text-white font-bold">
          {jobDetail.JobType === "intern" && "Internship"}
          {jobDetail.JobType === "full-time" && "Full Time"}
          {jobDetail.JobType === "contract" && "Contract"}
        </h1>

        <h1 className="text-white font-mono text-[10px]">{jobDetail.Venue}</h1>

        {jobDetail.SalaryToDisclose === "yes" && (
          <h1 className="text-green-700 font-mono text-[10px] bg-white px-2 rounded-md">
            {jobDetail.Salary + " PA"}
          </h1>
        )}
      </div>
      <h1 className="text-white font-mono text-[10px] truncate">
        {jobDetail.Venue === "remote" ? "-" : jobDetail.Cities[0]}
      </h1>
      <div className="flex justify-between mt-2">
        {jobDetail.createdAt && (
          <h1 className="text-[10px] text-white">
            {moment(jobDetail.createdAt).fromNow()}
          </h1>
        )}

        {user.loggedIn && user.userData.USER_ID === jobDetail.CreatorInfo && (
          <>
            <RiDeleteBin5Line
              className="text-white cursor-pointer hover:text-red-500"
              onClick={handleDeleteButton}
            />
            <FaEdit
              className="text-white cursor-pointer hover:text-green-300"
              onClick={handleEditButton}
            />
          </>
        )}
        {user.loggedIn && user.userData.USER_ID !== jobDetail.CreatorInfo && (
          <>
            <SaveJob job_id={jobDetail._id} />
            <ApplyToJob job_id={jobDetail._id} />
          </>
        )}
      </div>
      <h1 className="text-[10px]">Job Id : {jobDetail._id}</h1>
    </div>
  );
}
