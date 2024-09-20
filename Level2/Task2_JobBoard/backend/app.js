import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 1008;
app.use(
  cors({
    origin: "https://localhost:2000",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log("SERVER RUNNING AT " + "http://localhost:" + PORT)
);

app.get("/", (req, res) => {
  res.send("<h1>This is the backend</h1>");
});
