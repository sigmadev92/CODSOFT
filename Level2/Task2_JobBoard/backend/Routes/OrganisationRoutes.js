import express from "express";

const OrgRouter = express.Router();

OrgRouter.get("/", (req, res) => {
  res.send("<p> Organisation routes</p>");
});

export default OrgRouter;
