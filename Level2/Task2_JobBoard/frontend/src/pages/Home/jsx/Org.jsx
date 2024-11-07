import axios from "axios";
import React, { useEffect, useState } from "react";
import Error from "../../../component/Error";
import Loading from "../../../component/Loading";
import { baseUrl, usersUrl } from "../../../functionsJs/urls";

export default function Org() {
  const [orgData, setOrgData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function function1() {
      await axios
        .get(`${usersUrl}/usertype/org`)
        .then((res) => res.data)
        .then((res) => {
          if (res.status) {
            setOrgData(res.data);
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
    <div className="flex gap-4 w-[80%] m-auto mt-4 flex-wrap justify-center">
      {isError && <Error message={isError} />}
      {isLoading && <Loading />}
      {orgData.length > 0 &&
        orgData.map((org, index) => {
          return (
            <div className="w-[100px]" key={index}>
              <img
                src={`${baseUrl}/${org.ProfilePic}`}
                alt="Org Personality"
                className="w-200 h-200 rounded-lg"
              />
            </div>
          );
        })}
    </div>
  );
}
