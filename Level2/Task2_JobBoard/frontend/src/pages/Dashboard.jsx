import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { LuPanelRightClose } from "react-icons/lu";
import Details from "../component/dashboard/Details";
import AppliedJobs from "../component/dashboard/AppliedJobs";
import MyPosts from "../component/dashboard/MyPosts";
import { FcBusinessman } from "react-icons/fc";
import { TfiWrite } from "react-icons/tfi";
import SavedJobs from "../component/dashboard/SavedJobs";
import PostedJobs from "../component/dashboard/PostedJobs";
import Loading from "../component/Loading";
export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const [openProfile, setopenProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openAppliedJobs, setAppliedJObs] = useState(true);
  const [openMyPosts, setMyPosts] = useState(true);
  const [openSavedJobs, setSavedJobs] = useState(true);
  const [openPostedJobs, setPostedJobs] = useState(true);
  // const [appliedJobsData, setAppliedJobsData] = useState([]);
  const navigate = useNavigate();
  if (!user.loggedIn && isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center bg-black text-white font-bold">Dashboard</h1>
      <div id="operations" className="flex gap-x-3">
        <button
          className="bg-green-400 font-serif  hover:bg-green-600 p-1 shadow-lg m-2 rounded-md border-black border-2 text-[10px]"
          onClick={() => navigate(`/profile/${user.userData.USER_ID}`)}
        >
          My Public Profile <FcBusinessman className="inline text-[15px]" />
        </button>
        <button
          className="bg-green-400 font-serif  hover:bg-green-600 p-1 shadow-lg m-2 rounded-md border-black border-2 text-[10px]"
          onClick={() => {}}
        >
          Write a Post <TfiWrite className="inline text-[15px] text-black" />
        </button>
      </div>

      <div className="h-[30px] bg-red-300 flex gap-x-3 ">
        {!openProfile && (
          <h1 onClick={() => setopenProfile(true)}>
            <button className="text-[aqua] text-[12px] bg-black px-2 rounded-r-lg py-1">
              Details <LuPanelRightClose className="inline" />
            </button>
          </h1>
        )}
        {user.userData.UserType === "seeker" && !openAppliedJobs && (
          <h1 onClick={() => setAppliedJObs(true)}>
            <button className="text-[aqua] text-[12px] bg-black px-2 rounded-r-lg py-1">
              Applied Jobs <LuPanelRightClose className="inline" />
            </button>
          </h1>
        )}
        {user.userData.UserType !== "seeker" && !openPostedJobs && (
          <h1 onClick={() => setPostedJobs(true)}>
            <button className="text-[aqua] text-[12px] bg-black px-2 rounded-r-lg py-1">
              Posted Jobs <LuPanelRightClose className="inline" />
            </button>
          </h1>
        )}

        {!openSavedJobs && (
          <h1 onClick={() => setSavedJobs(true)}>
            <button className="text-[aqua] text-[12px] bg-black px-2 rounded-r-lg py-1">
              Saved Jobs <LuPanelRightClose className="inline" />
            </button>
          </h1>
        )}
        {!openMyPosts && (
          <h1 onClick={() => setMyPosts(true)}>
            <button className="text-[aqua] text-[12px] bg-black px-2 rounded-r-lg py-1">
              My Posts <LuPanelRightClose className="inline" />
            </button>
          </h1>
        )}
      </div>

      <div className="flex gap-x-2 flex-wrap justify-center md:flex-nowrap p-1  ">
        {openProfile && <Details fn={setopenProfile} />}
        {user.userData.UserType === "seeker" && openAppliedJobs && (
          <AppliedJobs fn={setAppliedJObs} />
        )}
        {user.userData.UserType !== "seeker" && openPostedJobs && (
          <PostedJobs fn={setPostedJobs} />
        )}
        {openMyPosts && <MyPosts fn={setMyPosts} />}
        {openSavedJobs && <SavedJobs fn={setSavedJobs} />}
      </div>
    </div>
  );
}
