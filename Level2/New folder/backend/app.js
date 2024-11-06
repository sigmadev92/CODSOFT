const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 1008;

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  console.log("request came");

  res.json({
    status: true,
    message: "This is a get API",
  });
});

app.post("/post", (req, res) => {
  console.log(req.body);

  res.json({
    status: true,
    data: req.body,
  });
});
app.listen(PORT, () => console.log("Server"));
