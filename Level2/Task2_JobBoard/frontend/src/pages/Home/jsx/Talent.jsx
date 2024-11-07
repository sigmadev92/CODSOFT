import axios from "axios";
import React, { useEffect, useState } from "react";
import Error from "../../../component/Error";
import Loading from "../../../component/Loading";
import { baseUrl, usersUrl } from "../../../functionsJs/urls";

export default function Talent() {
  const [seekerData, setSeekerData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function function1() {
      await axios
        .get(`${usersUrl}/usertype/seeker`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setSeekerData(res.data);
          } else {
            setIsError(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsError(err.message);
        });
      setIsloading(false);
    }
    function1();
  }, []);
  return (
    <div
      className="flex gap-4 w-[90%] m-auto mt-4 flex-wrap justify-center"
      id="recruiter-data-div"
    >
      {isError && <Error message={isError} />}
      {isLoading && <Loading />}
      {seekerData.length > 0 &&
        seekerData.slice(0, 9).map((seeker, index) => {
          return (
            <div
              className="w-[150px] p-3 bg-black rounded-[15px] text-white text-[10px]"
              key={index}
            >
              <img
                src={`${baseUrl}/${seeker.ProfilePic}`}
                alt="Org Personality"
                className="w-200 h-200 rounded-lg"
              />
              <h1 className="">{seeker.FullName}</h1>

              <h1 className="font-mono text-[aqua]">{seeker.JobRole}</h1>
            </div>
          );
        })}
    </div>
  );
}
