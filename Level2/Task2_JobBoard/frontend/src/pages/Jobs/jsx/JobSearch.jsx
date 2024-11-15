import axios from "axios";
import React, { useState } from "react";
import { jobsUrl } from "../../../functionsJs/urls";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";
export default function JobSearch(props) {
  const [Title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (Title === "") return;
    props.fn.setClickedSearch(true);
    await axios
      .get(`${jobsUrl}/search-jobs/${Title}`)
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          props.fn.setSearchedJobs(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some Error occured while fetching jobs.");
      });
  }
  return (
    <div
      id="job-search"
      className="w-[400px] mx-auto border-2 border-black mt-3 rounded-lg pl-2"
    >
      <form className="flex ">
        <input
          type="search"
          name="Title"
          value={Title}
          placeholder="Enter a job or a designation..."
          className="border-2 border-green- rounded-lg w-full block pl-3 text-red 

          placeholder:text-[12px]"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-col justify-center bg-black px-3">
          <BsSearch
            className="text-white cursor-pointer hover:text-[aqua]"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
