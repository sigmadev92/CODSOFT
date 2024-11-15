import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import JobPost from "./jsx/JobPost";
import axios from "axios";
import JobCard from "../../component/JobCard/JobCard.jsx";
import { jobsUrl } from "../../functionsJs/urls.js";
import TotalApplies from "./jsx/TotalApplies";
import TotalSaves from "./jsx/TotalSaves";
import JobSearch from "./jsx/JobSearch";
import PostedJobs from "./jsx/PostedJobs";
export default function Jobs() {
  const user = useSelector((state) => state.user);
  const [tab, setTab] = useState("1");
  const [refresh, setRefresh] = useState(false);
  const [jobPost, setJobPost] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [clickedSearch, setClickedSearch] = useState(false);
  useEffect(() => {
    async function fetch() {
      await axios
        .get(`${jobsUrl}/get-all`)
        .then((res) => {
          if (res.data.status) {
            setJobs(res.data.data);
          } else console.log(res.data);
        })
        .catch((err) => console.log(err), "ERROR IN JOBS PAGE");
    }

    fetch();
  }, [refresh]);
  return (
    <div className="min-h-screen bg-blue-300">
      <h1 className="text-white text-center font-bold bg-black">Jobs</h1>
      <div className="bg-slate-500">
        <button
          className={`
            font-thin bg-green-500 hover:bg-green-600 px-2 mt-3 ml-3 ${
              tab === "1" && "bg-white"
            }`}
          onClick={() => {
            setJobPost(false);
            setTab("1");
          }}
        >
          Jobs
        </button>
        {user.loggedIn && user.userData?.UserType !== "seeker" && (
          <button
            className={`
              font-thin bg-green-500 hover:bg-green-600 px-2 mt-3 ml-3 ${
                tab === "2" && "bg-white"
              }`}
            onClick={() => {
              setJobPost((prev) => !prev);
              if (jobPost) setTab("1");
              else setTab("2");
            }}
          >
            {!jobPost ? "Create A Job" : "Cancel"}
          </button>
        )}
      </div>

      {tab === "1" && (
        <div className="mb-12">
          <JobSearch fn={{ setClickedSearch, setSearchedJobs }} />
          <div className="flex gap-x-4 justify-center bg-slate-800 text-white mt-2">
            <button onClick={() => setRefresh((prev) => !prev)}>Refresh</button>
            <h1 className="">Total Jobs : {jobs.length}</h1>
            {user.loggedIn && (
              <>
                <h1>
                  Your Saves : <TotalSaves />
                </h1>
                {user.userData.UserType === "seeker" ? (
                  <h1>
                    {/* if user is logged in and is a seeker we have to show his  total applies*/}
                    Your applies : <TotalApplies />
                  </h1>
                ) : (
                  <h1>
                    Your Posted Jobs :{" "}
                    <PostedJobs
                      poster_id={user.userData.USER_ID}
                      refresh={setRefresh}
                    />
                  </h1>
                )}
              </>
            )}
          </div>
          {clickedSearch ? (
            <div className="w-[90%] mx-auto">
              <button
                className="px-2 bg-green-300 hover:bg-green-600 shadow-lg rounded-sm text-[12px] my-2 border-black  border-2"
                onClick={() => {
                  setClickedSearch(false);
                }}
              >
                Go Back to jobs
              </button>
              <h1 className="text-center text-white bg-black font-bold text-[12px]">
                Searched Results
              </h1>

              <div className="flex gap-1 md:gap-3">
                {searchedJobs.length > 0 ? (
                  searchedJobs.map((job, index) => {
                    return <JobCard key={index} data={job} />;
                  })
                ) : (
                  <h1>No Job matches with your search query.</h1>
                )}
              </div>
            </div>
          ) : (
            <div className="flex  flex-wrap justify-start md:w-[90%] m-auto">
              {jobs.length > 0 &&
                jobs.map((job, index) => {
                  return <JobCard key={index} data={job} />;
                })}
            </div>
          )}
        </div>
      )}
      {jobPost && tab === "2" && (
        <JobPost funs={{ setTab, setJobPost, setRefresh }} />
      )}
    </div>
  );
}
