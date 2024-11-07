import React, { useEffect, useState } from "react";
import { jobsUrl } from "../../../functionsJs/urls";
import axios from "axios";

export default function PostedJobs(props) {
  const posterId = props.poster_id;
  const [postedJobs, setPostedJobs] = useState(0);
  useEffect(() => {
    async function getPostedJobs() {
      await axios
        .get(`${jobsUrl}/get-posted-jobs/${posterId}`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setPostedJobs(res.data.length);
          } else {
            setPostedJobs("ERROR FETCHING YOur posted jobs");
          }
        })
        .catch((err) => {
          console.log(err);
          setPostedJobs("Some error");
        });
    }
    getPostedJobs();
  }, []);
  return <>{postedJobs}</>;
}
