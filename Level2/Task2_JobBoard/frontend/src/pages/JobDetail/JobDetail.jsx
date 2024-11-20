import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { MdOutlineAssuredWorkload } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiMoney } from "react-icons/pi";
import { MdNetworkCell } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaExternalLinkAlt } from "react-icons/fa";
import Applies from "./jsx/Applies";
import { baseUrl, jobsUrl } from "../../functionsJs/urls";
import Error from "../../component/Error";
import Loading from "../../component/Loading";
export default function JobDetail() {
  const user = useSelector((state) => state.user);

  const jobId = window.location.pathname.slice(6);
  const [jobDetail, setJobDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    async function func1() {
      await axios
        .get(`${jobsUrl}/get-details/${jobId}`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setJobDetail(res.data);
          } else {
            setError(res.message);
            toast.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
      setLoading(false);
    }
    func1();
  }, []);

  return (
    <div className="min-h-screen">
      {error && <Error />}
      {loading && <Loading />}
      {jobDetail && (
        <>
          <div className="w-[90%] md:w-[70%] mx-auto bg-slate-500 px-10 pt-10 pb-3 rounded-b-lg">
            <img
              src={`${baseUrl}/${jobDetail.ProfilePic}`}
              alt="recruiter-logo"
              className="w-[15%] md:w-[60px] rounded-[20px]"
            />
            <h1>Job Title: {jobDetail.Title}</h1>
            <div className="flex justify-between pr-3 flex-wrap gap-x-5">
              <h1>
                {jobDetail.CreatorType === "recruiter" ? "Posted By" : ""}{" "}
                <span
                  className="font-bold hover:text-[white] cursor-pointer"
                  onClick={() => navigate(`/profile/${jobDetail.CreatorInfo}`)}
                >
                  {jobDetail.CreatedBy}
                  {jobDetail.CreatorType === "org" && (
                    <MdOutlineAssuredWorkload className="inline text-white ml-3 mt-[-5px]" />
                  )}{" "}
                </span>
              </h1>
              <h1>Posted {moment(jobDetail.createdAt).fromNow()}</h1>
            </div>
            <h1 className="text-[10px]">
              Applies : <Applies job_id={jobId} />
            </h1>
            {!user.loggedIn ||
            (user.loggedIn &&
              user.userData.UserType === "seeker" &&
              !user.userData.Applies.includes(jobDetail._id)) ? (
              <button className="text-[10px] cursor-pointer bg-white hover:bg-green-400  rounded-md px-2">
                Apply
              </button>
            ) : (
              <>
                {user.userData.Applies?.includes(jobDetail._id)
                  ? "Applied"
                  : ""}
              </>
            )}
          </div>
          <div className="w-[90%] rounded-md md:w-[70%] mx-auto bg-gray-500 p-2 mt-[5px] ">
            <div
              id="tab"
              className="bg-white px-3 font-serif font-semibold text-[12px]"
            >
              <span
                className={`mr-[5px] cursor-pointer hover:bg-black hover:text-white px-2 rounded-sm ${
                  tab === "1" && "border-b-2 border-orange-500"
                }`}
                onClick={() => setTab("1")}
              >
                Job Details
              </span>
              <span
                className={`mr-[5px] cursor-pointer hover:bg-black hover:text-white px-2 rounded-sm ${
                  tab === "2" && "border-b-2 border-orange-500"
                }`}
                onClick={() => setTab("2")}
              >
                About{" "}
                {jobDetail.CreatorType === "org" ? "Organization" : "Recruiter"}
              </span>
            </div>
          </div>
          {tab === "1" && (
            <>
              <div className="bg-slate-400 mt-5 w-[90%] mx-auto rounded-lg py-4 md:w-[70%] pl-3 text-[12px]">
                <h1>
                  <FaBriefcase className="inline mr-2" />
                  {jobDetail.Experience} years
                </h1>
                <h1>
                  <BsPeopleFill className="inline mr-2" />
                  vacancies
                </h1>
                <h1>
                  {" "}
                  <FaMapLocationDot className="inline mr-2" />
                  Hiring Office Located At{" "}
                </h1>
                <h1>
                  <PiMoney className="inline mr-2" />
                  {jobDetail.SalaryToDisclose === "yes" ? (
                    <span>{jobDetail.Salary}</span>
                  ) : (
                    "Salary not disclosed"
                  )}
                </h1>
                <h1 className="font-bold text-white">
                  <MdNetworkCell className="inline mr-2 mt-[-3px]" />
                  {jobDetail.Venue?.toUpperCase()} {"   "} {jobDetail.JobType}
                </h1>
                {jobDetail.Venue && jobDetail.Venue !== "remote" && (
                  <span>
                    <FaMapMarkerAlt className="inline mr-2" />
                    {jobDetail.Cities}
                  </span>
                )}

                <h1 className="font-semibold text-black mt-2">
                  Must Have Skills
                </h1>
                <p>{jobDetail.MustHaveSkills}</p>
                <h1 className="font-semibold text-black mt-2">
                  Good to have Skills
                </h1>
                <p>{jobDetail.GoodToHaveSkills}</p>
              </div>

              <div className="w-[90%] md:w-[70%] mx-auto bg-slate-400 p-3 mb-[100px] rounded-lg mt-2">
                <h1 className="text-[20px] font-bold">Job Description</h1>
                <p className="text-[12px]">{jobDetail.About}</p>
              </div>
            </>
          )}

          {tab === "2" && (
            <div className="w-[90%] md:w-[70%] mx-auto bg-slate-400 rounded-lg p-3">
              <h1
                className="font-bold text-white cursor-pointer hover:text-blue-300"
                onClick={() => navigate(`/profile/${jobDetail.CreatorInfo}`)}
              >
                {jobDetail.CreatedBy}
                <FaExternalLinkAlt className="inline ml-2 mt-[-5px]" />
              </h1>
              <h1>{}</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
