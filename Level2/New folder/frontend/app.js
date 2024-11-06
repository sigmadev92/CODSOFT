const api = async () => {
  await axios
    .get("http://localhost:1008")
    .then((res) => res.data)
    .then((res) => {
      if (res.status) {
        console.log("Get fetched");
      } else {
        console.log("error");
      }
    })
    .catch((error) => console.log(error));
};
