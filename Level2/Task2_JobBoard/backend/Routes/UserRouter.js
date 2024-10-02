import express, { response } from "express";
import Users from "../Models/Users.js";
import upload from "../Config/multerConfig.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("<p>reached Seeker's Route</p>");
});

const saltRounds = Number(process.env.SALTROUNDS);
const salt = await bcrypt.genSalt(saltRounds);

UserRouter.post(
  "/register",
  upload.fields([
    { name: "ProfilePic", maxCount: 1 },
    { name: "Resume", maxCount: 1 },
  ]),
  async (req, res) => {
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

      //If user is not already registered
      //step-1 we will add name of profile pic to ProfilePic field.
      req.body.ProfilePic = req.files.ProfilePic[0].originalname;

      //step-2 If the UserType is seeker then we have to add field for resume.
      if (req.body.UserType === "seeker") {
        req.body.Resume = req.files.Resume[0].originalname;
      }
      //step-3 Protecting passwords using hashing

      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      if (hashedPassword) {
        req.body.Password = hashedPassword;
        const newUser = await Users(req.body);
        await newUser.save();

        return res.send({
          status: true,
        });
      } else {
        return res.send({
          status: false,
          message: "Error : Can't store info now. Try later",
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        status: false,
        message: "Error: Connection to the database",
      });
    }
  }
);

UserRouter.post("/login", (req, res) => {
  console.log(req.body);

  Users.findOne({ Email: req.body.Email })
    .then(async (user) => {
      if (user) {
        const result = await bcrypt.compare(req.body.Password, user.Password);
        if (result) {
          return res.send({
            status: true,
            jwt: user._id,
            userData: user,
          });
        } else {
          return res.send({
            status: false,
            message: "Error : The Password doesn't match",
          });
        }
      } else {
        return res.send({
          status: false,
          message: "Error : This email Id doesn't exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
        message: "Error : Database error",
      });
    });
});

UserRouter.get("/auth", (req, res) => {
  console.log(req.headers.auth);
  Users.findOne({ _id: req.headers.auth })
    .then((response) => {
      if (response)
        return res.send({
          status: true,
          data: response,
        });
      else
        res.send({
          status: false,
          message: "Authentication denied. ",
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
        message: "Server error",
      });
    });
});

UserRouter.get("/details/:user_id", async (req, res) => {
  console.log(req.params);
  try {
    const user = await Users.findOne({ USER_ID: req.params.user_id });
    if (user) {
      return res.send({
        status: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});
export default UserRouter;
