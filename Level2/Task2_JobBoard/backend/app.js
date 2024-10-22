import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./Config/dbConfig.js";
import UserRouter from "./Routes/UserRouter.js";
import JobRouter from "./Routes/JobsRoute.js";
import JobActionRouter from "./Routes/JobActionsRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1008;
app.use(
  cors({
    origin: "https://jobsoft-front-end.vercel.app/",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", UserRouter);
app.use("/jobs", JobRouter);
app.use("/job-actions", JobActionRouter);
dbConfig.dbConnection();
app.listen(PORT, () =>
  console.log("SERVER RUNNING AT " + "http://localhost:" + PORT)
);
app.use(express.static("profilepics"));
app.use(express.static("resumes"));
app.get("/", (req, res) => {
  res.send("<h1>This is the backend</h1>");
});
