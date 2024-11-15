import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "../../../component/Error";
import Loading from "../../../component/Loading";
import axios from "axios";
import { jobsUrl } from "../../../functionsJs/urls";
export default function FeaturedJobs() {
  const user = useSelector((state) => state.user);
  const [featJobs, setFeatJobs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const featuredJobs = async () => {
      await axios
        .get(`${jobsUrl}/feat-jobs/${user.userData.JobRole}`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setFeatJobs(res.data);
          } else {
            setIsError(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsError(err.message);
        });
    };

    if (user.loggedIn && user.userData) {
      featuredJobs();
    } else {
      setIsError(
        "You must logged in as a job seeker to explore featured jobs according to your profile."
      );
    }
    setLoading(false);
  }, [refresh, user.loggedIn, user.userData?.JobRole]);

  if (!user.loggedIn || user.userData?.UserType !== "seeker") {
    return;
  }
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="bg-black text-white font-bold pl-3 ">
        Featured Jobs{" "}
        <FaQuestionCircle
          className="inline mt-[-3px] hover:text-green-500 cursor-pointer "
          onClick={() => navigate("/about/#q3")}
        />
        <button
          className="ml-4 bg-green-500 hover:bg-red-500 text-[10px]"
          onClick={() => setRefresh((prev) => !prev)}
        >
          Refresh
        </button>
      </h1>
      {isError && <Error message={isError} />}
      {loading && <Loading />}
      {featJobs.length > 0 ? (
        <div className="flex gap-2 justify center"></div>
      ) : (
        <h1>No featured jobs today</h1>
      )}
      <div className="flex gap-x-3"></div>
    </div>
  );
}
