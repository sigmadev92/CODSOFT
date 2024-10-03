import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const user_ID = window.location.pathname.slice(9);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    function fetch() {
      axios
        .get("http://localhost:1008/users/data/", {
          headers: {
            profile: user_ID,
          },
        })
        .then((response) => {
          if (response.data.status) setUserDetails(response.data.data);
          else console.log(response.data);
        })
        .catch((error) => console.log(error));
    }

    fetch();
  }, []);

  return (
    <div>
      <h1>{userDetails && userDetails.FullName}</h1>
    </div>
  );
}
