import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import JobPost from "../component/JobPost";
import axios from "axios";
import JobCard from "../component/JobCard";
export default function Jobs() {
  const user = useSelector((state) => state.user);
  const [tab, setTab] = useState("1");
  const [jobPost, setJobPost] = useState(false);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function fetch() {
      axios
        .get("http://localhost:1008/jobs/get-all")
        .then((res) => {
          if (res.data.status) {
            setJobs(res.data.data);
          } else console.log(res.data);
        })
        .catch((err) => console.log(err));
    }

    fetch();
  });
  return (
    <div>
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
        {user.loggedIn &&
          (user.userData.UserType === "recruiter" ||
            user.userData.UserType === "org") && (
            <button
              className={`
              font-thin bg-green-500 hover:bg-green-600 px-2 mt-3 ml-3 ${
                tab === "2" && "bg-white"
              }`}
              onClick={() => {
                setJobPost((prev) => !prev);
                setTab("2");
              }}
            >
              {!jobPost ? "Create A Job" : "Cancel"}
            </button>
          )}
      </div>

      {tab === "1" && (
        <div>
          <h1 className="bg-white">{jobs.length}</h1>
          <div className="flex flex-nowrap">
            {jobs.length > 0 &&
              jobs.map((job, index) => {
                return <JobCard key={index} data={job} />;
              })}
          </div>
        </div>
      )}
      {jobPost && tab === "2" && <JobPost />}
    </div>
  );
}
