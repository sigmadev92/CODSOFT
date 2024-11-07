import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiFolderCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Loading from "../../../component/Loading";
import Error from "../../../component/Error";
import JobCard from "../../../component/JobCard/JobCard";
import { jobsUrl } from "../../../functionsJs/urls";
export default function SavedJobs(props) {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsloading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  const jobAction = useSelector((state) => state.jobAction);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const function1 = async () => {
      const Savedjobs = jobAction.records?.filter(
        (job) =>
          job.UserId === user.userData.USER_ID && job.ActionType === "save"
      );
      const SavedJobIds = [];
      Savedjobs.forEach((ele) => SavedJobIds.push(ele.JobId));
      await axios
        .post(`${jobsUrl}/get-jobs`, {
          jobIds: SavedJobIds,
          task: "Arrived here for getting saved jobs by the Seeker",
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          if (res.status) {
            setJobs(res.data);
            setIsloading(false);
          } else {
            setIsloading(false);
            setError(true);
          }
        })
        .catch((err) => console.log(err));
    };
    function1();
  }, [refresh]);

  return (
    <div
      id="applied-jobs"
      className="w-full min-h-[300px] text-white bg-slate-300 rounded-t-lg md:mb-[100px]"
    >
      <div className="flex justify-end gap-x-3 bg-black rounded-t-lg px-4">
        <button
          className="text-[12px]"
          onClick={() => setRefresh((prev) => !prev)}
        >
          Refresh
        </button>
        <h1 className="text-center font-semibold bg-black text-[12px] rounded-t-lg">
          Saved jobs
        </h1>
        <RiFolderCloseFill
          className="hover:text-red-700 cursor-pointer"
          onClick={() => props.fn(false)}
        />
      </div>
      {isLoading && <Loading />}
      {error && <Error />}
      {jobs.length > 0 && (
        <div className="flex flex-wrap">
          {jobs.map((job, index) => {
            return <JobCard data={job} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}
