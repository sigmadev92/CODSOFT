import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function FeaturedJobs() {
  const [featJobs, setFeatJobs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="bg-black text-white font-bold pl-3 ">
        Featured Jobs{" "}
        <FaQuestionCircle
          className="inline mt-[-3px] hover:text-green-500 cursor-pointer "
          onClick={() => navigate("/about/#q3")}
        />
      </h1>
      <div className="flex gap-x-3"></div>
    </div>
  );
}
