import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiFolderCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import Error from "../Error";
import JobCard from "../JobCard";
import { jobsUrl } from "../functionsJs/urls";
export default function PostedJobs(props) {
  const user = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const function1 = async () => {
      await axios
        .get(`${jobsUrl}/get-posted-jobs/${user.userData.USER_ID}`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setIsloading(false);
            setJobs(res.data);
          } else {
            console.log(res.message);
          }
        })
        .catch((error) => {
          setIsloading(false);
          setIsError(true);
        });
    };
    function1();
  }, []);
  return (
    <div
      id="saved-jobs"
      className="w-full min-h-[300px] bg-slate-200 rounded-t-lg"
    >
      <div className="flex justify-end bg-black rounded-t-lg gap-x-4 px-4">
        <h1 className="text-center font-semibold bg-black text-white text-[12px] rounded-t-lg">
          Posted Jobs
        </h1>
        <RiFolderCloseFill
          className="cursor-pointer text-white hover:text-red-700 "
          onClick={() => props.fn(false)}
        />
      </div>
      {isLoading && <Loading />}
      {isError && <Error />}
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
