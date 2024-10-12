import React, { useEffect, useState } from "react";
import { RiFolderCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import Error from "../Error";
import axios from "axios";
import JobCard from "../JobCard";
import { jobsUrl } from "../functionsJs/urls";
export default function SavedJobs(props) {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [savedJobsData, setSaveJobsData] = useState([]);
  useEffect(() => {
    const function1 = async () => {
      await axios
        .post(`${jobsUrl}/get-jobs`, {
          jobIds: user.userData.SavedJobs,
          task:
            "Arrived here for getting saved jobs. User type -" +
            user.userData.UserType,
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          if (res.status) {
            setSaveJobsData(res.data);
          } else {
            setIsError(true);
          }
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        });
    };
    function1();
  }, []);
  return (
    <div
      id="saved-jobs"
      className="w-full min-h-[300px] bg-slate-200 rounded-t-lg "
    >
      <div className="flex justify-end bg-black rounded-t-lg gap-x-4 px-4">
        <h1 className="text-center font-semibold bg-black text-white text-[12px] rounded-t-lg">
          Saved Jobs
        </h1>
        <RiFolderCloseFill
          className="cursor-pointer text-white hover:text-red-700 "
          onClick={() => props.fn(false)}
        />
      </div>
      <div className="flex flex-wrap">
        {isLoading && <Loading />}
        {isError && <Error />}
        {savedJobsData.length > 0 &&
          savedJobsData.map((job, index) => {
            return <JobCard data={job} key={index} />;
          })}
      </div>
    </div>
  );
}
