import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserProfile() {
  // const user = useSelector((state) => state.user.userData);
  const link = window.location.pathname;
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function getDetails() {
      axios
        .get(`http://localhost:1008/users/details/${link.slice(9)}`)
        .then((response) => {
          if (response.data.status) {
            setUserDetails(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getDetails();
  }, []);

  return (
    <div>
      {!userDetails ? (
        <div>
          <h1>Wrong URL</h1>
        </div>
      ) : (
        <>
          <div
            id="Main"
            className="p-3 bg-black md:w-[400px] w-[90%] md:ml-3 mx-auto mt-2 flex gap-x-[30px] rounded-md"
          >
            <img
              src={`http://localhost:1008/${userDetails.ProfilePic}`}
              alt="Pic of user"
              className="w-[100px] h-[100px] rounded-full"
            />
            <div className="mt-3 text-white">
              <h1 className="font-mono">{userDetails.FullName}</h1>
              <h1 className="font-medium text-[12px] text-[aqua]">
                {userDetails.Email}
              </h1>
              {link.slice(9) === userDetails.USER_ID && (
                <h1>
                  <span className="mr-3">{userDetails.PhoneNumber}</span>
                  <span className="text-[10px] font-medium">
                    (Not visible to others)
                  </span>
                </h1>
              )}
            </div>
          </div>

          <div id="posts"></div>
        </>
      )}
    </div>
  );
}
