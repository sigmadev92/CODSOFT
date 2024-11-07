import axios from "axios";
import React, { useEffect, useState } from "react";
import { jobsUrl } from "../../../functionsJs/urls";
import Error from "../../../component/Error";
import Loading from "../../../component/Loading";
import { useNavigate } from "react-router-dom";

export default function PostedJobs(props) {
  const [jobs, setJobs] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function func1() {
      console.log(props.user_id);
      await axios
        .get(`${jobsUrl}/get-posted-jobs/${props.user_id}`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setJobs(res.data);
          } else {
            setError(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
      setIsLoading(false);
    }
    func1();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap p-3 bg-slate-400 rounded-lg gap-x-3 gap-y-2">
        {isError && <Error message={isError} />}
        {isLoading && <Loading />}
        {jobs.length > 0 &&
          jobs.map((job, index) => {
            return (
              <div
                key={index}
                className="border-white border-2 rounded-md text-[12px] text-white p-3 bg-black w-full max-w-[300px]"
              >
                <h1>
                  <span className="font-bold ">Sector :</span> {job.Sector}
                </h1>
                <h1>
                  {" "}
                  <span className="font-bold ">Industry : </span>
                  {job.Industry}
                </h1>
                <h1>
                  <span className="font-bold ">Department : </span>
                  {job.Department}
                </h1>
                <h1>
                  <span className="font-bold ">Job Role : </span> {job.Title}
                </h1>
                <h1
                  className="cursor-pointer hover:underline hover:text-[aqua]"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  View Details
                </h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}
