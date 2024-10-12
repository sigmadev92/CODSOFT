import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jobsUrl } from "../component/functionsJs/urls";

export default function JobDetail() {
  const jobId = window.location.pathname.slice(6);
  const [jobDetail, setJobDetail] = useState({});
  const [error, setError] = useState(true);
  useEffect(() => {
    axios
      .get(`${jobsUrl}/get-details`, {
        headers: {
          job_id: jobId,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          setError(false);
          setJobDetail(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, []);
  if (error) {
    return <h1 className="text-center text-[30px]">Wrong url</h1>;
  }
  return (
    <div>
      <h1>{jobDetail.Experience}</h1>
    </div>
  );
}
