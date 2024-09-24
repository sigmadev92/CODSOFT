import express from "express";

const ProviderRouter = express.Router();

ProviderRouter.get("/", (req, res) => {
  res.send("<p>reached Provider's routes</p>");
});

export default ProviderRouter;
