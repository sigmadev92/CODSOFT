import axios from "axios";
import React, { useEffect, useState } from "react";
import Error from "../../../component/Error";
import Loading from "../../../component/Loading";
import { baseUrl, usersUrl } from "../../../functionsJs/urls";

export default function Recruiter() {
  const [recData, setRecData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function function1() {
      await axios
        .get(`${usersUrl}/usertype/recruiter`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setRecData(res.data);
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
      className="flex gap-4 w-[90%] m-auto mt-4 flex-wrap justify-center mb-[40px]"
      id="recruiter-data-div"
    >
      {isError && <Error message={isError} />}
      {isLoading && <Loading />}
      {recData.length > 0 &&
        recData.slice(0, 9).map((recruiter, index) => {
          return (
            <div className="w-[100px] p-3 bg-black rounded-[15px]" key={index}>
              <img
                src={`${baseUrl}/${recruiter.ProfilePic}`}
                alt="Org Personality"
                className="w-200 h-200 rounded-lg"
              />
              <h1 className="text-[10px] bg-white font-bold pl-2">
                {recruiter.FullName.split(" ")[0]}
              </h1>
              <h1 className="text-[10px] bg-white font-bold text-red-400 pl-2">
                {recruiter.FullName.split(" ").at(-1)}
              </h1>
            </div>
          );
        })}
    </div>
  );
}
