import express from "express";
import Jobs from "../Models/Job.js";

const JobRouter = express.Router();

JobRouter.get("/", (req, res) => {
  res.send("<p>Job Post fetched</p>");
});

JobRouter.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const newJob = await Jobs(req.body);
    await newJob.save();
    return res.send({
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});

JobRouter.get("/get-all", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    return res.send({
      status: true,
      data: jobs,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "ERR_DB_CONN",
    });
  }
});
export default JobRouter;
