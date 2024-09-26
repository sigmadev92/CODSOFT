import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./Config/dbConfig.js";
import UserRouter from "./Routes/UserRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1008;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", UserRouter);

dbConfig.dbConnection();
app.listen(PORT, () =>
  console.log("SERVER RUNNING AT " + "http://localhost:" + PORT)
);
app.use(express.static("profilepics"));
app.use(express.static("resumes"));
app.get("/", (req, res) => {
  res.send("<h1>This is the backend</h1>");
});
