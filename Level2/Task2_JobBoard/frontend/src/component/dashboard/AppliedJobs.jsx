import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiFolderCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import Error from "../Error";
import JobCard from "../JobCard";
export default function AppliedJobs(props) {
  const user = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const function1 = async () => {
      await axios
        .post("http://localhost:1008/jobs/get-applied-jobs", {
          jobIds: user.userData.Applies,
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
  }, []);

  return (
    <div
      id="applied-jobs"
      className="w-full min-h-[300px] bg-slate-300 rounded-t-lg md:mb-[100px]"
    >
      <div className="flex justify-end gap-x-3 bg-black rounded-t-lg px-4">
        <h1 className="text-center font-semibold bg-black text-white text-[12px] rounded-t-lg">
          Applied jobs
        </h1>
        <RiFolderCloseFill
          className="hover:text-red-700 cursor-pointer text-white"
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
