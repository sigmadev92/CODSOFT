import React from "react";
import moment from "moment";
import { BsSave } from "react-icons/bs";
import { BsSaveFill } from "react-icons/bs";
// import { SiGoogletasks } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ApplyToJob,
  SaveJobPost,
  UnSaveJobPost,
} from "../redux/slice/userSlice";
import axios from "axios";
import { baseUrl, jobsUrl } from "./functionsJs/urls";
// import axios from "axios";

export default function JobCard(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const jobDetail = props.data;
  const navigate = useNavigate();
  async function handleSaveButton() {
    dispatch(
      SaveJobPost({ user_id: user.userData.USER_ID, job_id: jobDetail._id })
    );
  }
  async function handleUnsaveJob() {
    dispatch(
      UnSaveJobPost({ job_id: jobDetail._id, user_id: user.userData.USER_ID })
    );
  }
  async function handleDeleteButton() {
    const confirm = window.confirm("Do you really want to delete this job ?");
    if (!confirm) return;
    await axios
      .delete(`${jobsUrl}/delete-job-post/${jobDetail._id}`)
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          toast.success("Job deleted successfully");
        } else {
          toast.error("Cannot delete job ");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  async function handleApplyButton() {
    // step-1 check if the seeker is logged in
    //        if not ask him to login first
    if (!user.loggedIn) {
      return toast.warn("You are not logged In");
    }
    // seeker is logged In .
    // step-2
    // put the job Id of this job post to the seeker's account.
    // const date = new Date().toLocaleString();
    const obj = {
      userId: user.userData.USER_ID,
      jobId: jobDetail._id,
    };
    dispatch(ApplyToJob(obj));

    // put the  userId of the seeker's account to the job post.
    // axios.post("http://localhost:1008/jobs/add-seeker");
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
        <h1 className="hover:text-blue-400 cursor-pointer">View Job</h1>
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
            {jobDetail.Salary + "LPA"}
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
            <FaEdit className="text-white cursor-pointer hover:text-green-300" />
          </>
        )}

        {user.loggedIn && (
          <>
            {user.userData.USER_ID !== jobDetail.CreatorInfo && (
              <>
                {!user.userData.SavedJobs.includes(jobDetail._id) ? (
                  <BsSave
                    className="text-white cursor-pointer hover:text-green-400"
                    onClick={handleSaveButton}
                  />
                ) : (
                  <BsSaveFill
                    onClick={handleUnsaveJob}
                    title="Job is saved. Click to unsave"
                    className="text-white hover:text-black cursor-pointer"
                  />
                )}
              </>
            )}
          </>
        )}

        {!user.loggedIn ||
        (user.loggedIn &&
          user.userData.UserType === "seeker" &&
          !user.userData.Applies.includes(jobDetail._id)) ? (
          <h1 className="text-[10px]" onClick={handleApplyButton}>
            Apply
          </h1>
        ) : (
          <>{user.userData.Applies.includes(jobDetail._id) ? "Applied" : ""}</>
        )}
      </div>
      <h1 className="text-[10px]">Job Id : {jobDetail._id}</h1>
    </div>
  );
}

//Scenerios when there will be apply button
// NO user is loggedIn
// A seeker is loogedIn

//When a person who created this job -> Edit button.

/*
Helpers
  <button onClick={() => console.log(user.userData.USER_ID)}>
          check
        </button>
*/
