import express, { response } from "express";
import Users from "../Models/Users.js";
import upload from "../Config/multerConfig.js";
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("<p>reached Seeker's Route</p>");
});

UserRouter.post(
  "/register",
  upload.fields([
    { name: "ProfilePic", maxCount: 1 },
    { name: "Resume", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    try {
      const userExists = await Users.find({
        $or: [{ Email: req.body.Email }, { PhoneNumber: req.body.PhoneNumber }],
      });
      if (userExists.length >= 1) {
        return res.send({
          status: false,
          message: "Error: User is already Registered",
        });
      }
      req.body.ProfilePic = req.files.ProfilePic[0].originalname;
      if (req.body.UserType === "seeker") {
        req.body.Resume = req.files.Resume[0].originalname;
      }

      const newUser = await Users(req.body);
      await newUser.save();
      res.send({
        status: true,
      });
    } catch (err) {
      console.log(err);
      res.send({
        status: false,
        message: "Error: Connection to the database",
      });
    }
  }
);

export default UserRouter;
