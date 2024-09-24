import express from "express";

const SeekerRouter = express.Router();

SeekerRouter.get("/", (req, res) => {
  res.send("<p>reached Seeker's Route</p>");
});

export default SeekerRouter;
