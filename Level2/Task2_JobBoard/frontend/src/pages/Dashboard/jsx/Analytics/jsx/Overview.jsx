import React, { useEffect, useState } from "react";
import PostedJobs from "../../../../Jobs/jsx/PostedJobs";
import { toast } from "react-toastify";
import axios from "axios";
import { jobsUrl } from "../../../../../functionsJs/urls";

export default function Overview(props) {
  const [allPostedJobs, setAllPostedJobs] = useState([]);
  const [jobsInJobAction, setTheseJobs] = useState([]);
  // const [ViewedBy, setViewedBy] = useState([]);
  // const [AppliedBy,setAppliedBy] = useState([]);
  // const [SavedBy,setSavedBy] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      //fetch all jobs from database which are posted by this user
      //fetch all the jobs from the Db where the creatorInfo = props.created_by
      var jobIds = [];
      var jobRecords = [];
      try {
        const response = await axios.get(
          `${jobsUrl}/get-posted-jobs/${props.userDetails.USER_ID}`
        );
        if (response.data.status) {
          setAllPostedJobs(response.data.data);
          jobIds = Array.from(response.data.data).map((job) => job._id);
          //Now we will filter those records which have these jobIds
          jobIds.forEach((jobId) => {
            const tempArr = props.records.filter(
              (record) => jobId === record.JobId
            );
            jobRecords = [...jobRecords, ...tempArr];
          });
          setTheseJobs(jobRecords);
          console.log(jobRecords);
          console.log(allPostedJobs);
        }
      } catch (error) {
        console.log(error);
        toast.error("PIPELINE_ERROR", error.message);
      }
    }
    fetchDetails();
  }, []);
  return (
    <>
      <span className="font-bold text-white">Overview</span>
      <div id="overview" className="flex gap-x-4">
        <h1>
          Total Jobs Posted :{" "}
          <PostedJobs poster_id={props.userDetails.USER_ID} />
        </h1>
        <h1>
          Viewed by :{" "}
          {
            jobsInJobAction.filter((record) => record.ActionType === "View")
              .length
          }
        </h1>
        <h1>
          Applied by :{" "}
          {
            jobsInJobAction.filter((record) => record.ActionType === "apply")
              .length
          }
        </h1>
        <h1>
          Saved by :{" "}
          {
            jobsInJobAction.filter((record) => record.ActionType === "save")
              .length
          }
        </h1>
      </div>
    </>
  );
}
