import express from "express";
import Users from "../Models/Users.js";
import upload from "../Config/multerConfig.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import gererator from "generate-password";
import nodemailer from "nodemailer";

dotenv.config();
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("<p>reached Seeker's Route</p>");
});

const saltRounds = Number(process.env.SALTROUNDS);
const salt = await bcrypt.genSalt(saltRounds);

//ROUTE-1 REGISTRATION
UserRouter.post(
  "/register",
  upload.fields([
    { name: "ProfilePic", maxCount: 1 },
    { name: "Resume", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.body.Email === process.env.MY_EMAIL) {
      return res.send({
        status: false,
        message: "WARNING_EMAIL_NEVER_USE",
      });
    }

    try {
      const userExists = await Users.findOne({
        $or: [{ Email: req.body.Email }, { PhoneNumber: req.body.PhoneNumber }],
      });
      if (req.body.AUTO_GENERATED && userExists) {
        console.log("jsdksd");
        return res.send({
          status: false,
          message: "ERR_AUTO_GENE_EMAIL_PASS_SAME_NAME_CONFLICT_CONFUSION",
        });
      }
      if (userExists) {
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

UserRouter.get("/data/:user_id", async (req, res) => {
  try {
    const user = await Users.findOne({ USER_ID: req.params.user_id });
    if (user) {
      return res.send({
        status: true,
        data: user,
      });
    }
    res.send({
      status: false,
      message: "ERR_INVALID_USER_ID",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "ERR_DB_CONN",
    });
  }
});

UserRouter.get("/forget-password", async (req, res) => {
  console.log("reacherd here", req.headers.email);
  const UserEmail = await Users.findOne({ Email: req.headers.email });
  if (!UserEmail) {
    return res.send({
      status: false,
      message: "ERROR_INVALID_EMAIL",
    });
  }

  ///IF USER FOUND THEN WE HAVE TO SEND A TEMPORARY PASSWORD TO THIS EMAIL and STORE THIS TEMP_PASSWORD in THE DB.

  //step-1 CREATE A TEMPORARY PASSWORD using generate-password library

  const password = gererator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: "#$@_",
    strict: true,
  });

  console.log("stp-1 done");
  //step-2 Hash this password
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await Users.updateOne(
      { Email: req.headers.email },
      { $set: { Password: hashedPassword } }
    );
  } catch (err) {
    console.log(err);
    return res.send({
      status: false,
      message: error.message,
    });
  }

  console.log("step-2 done");

  //Pasword is stored in DB. We have to send it to Email of user using nodemailer

  //Approach-1 with the testing account
  /*
  {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: "",
    to: "madularscorpian194@gmail.com",
    subject: "password change",
    text: `password is ${password}`,
    html: "",
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        status: true,
        msg: "you should recieve an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
  }
    */
  //Approach with a real account
  let config = {
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);
  // let MailGenerator = new Mailgen({
  //   theme:"default",
  //   product:{
  //     name:"Mailgen",
  //     link:"https://mailgen.js",
  //   }
  // })
  let message = {
    from: process.env.MY_EMAIL,
    to: req.headers.email,
    subject: "Alert! Your Password is Changed",
    html: `<P>Dear ${UserEmail.FullName} <br/>Your new password is ${password}. Do not share it with anyone. You can change it later in dashboard .<br/>Team JobSoft</p>`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.send({
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
        message: "ERROR_SERVER_TO_MAIL_ERROR",
      });
    });
});

UserRouter.post("/add-job", async (req, res) => {
  console.log(req.body);

  try {
    const response = await Users.updateOne(
      { USER_ID: req.body.userId },
      { $push: { Applies: req.body.jobId } }
    );
    console.log(response);
    if (response.modifiedCount === 1)
      res.send({
        status: true,
      });
    else
      res.send({
        status: false,
        message: "Invalid userId or JOb id",
      });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "ERR_DB_CONN",
    });
  }
});
UserRouter.post("/save-job", async (req, res) => {
  console.log(req.body);
  try {
    const response = await Users.updateOne(
      { USER_ID: req.body.user_id },
      { $push: { SavedJobs: req.body.job_id } }
    );
    if (response.modifiedCount === 1)
      return res.send({
        status: true,
      });

    res.send({
      status: false,
      message: "Job Cannot be saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});
UserRouter.post("/unsave-job", async (req, res) => {
  console.log("Arrived here to unsave the saved job", req.body);
  try {
    const response = await Users.updateOne(
      { USER_ID: req.body.user_id },
      { $pull: { SavedJobs: req.body.job_id } }
    );
    console.log(response);
    if (response.modifiedCount === 1)
      return res.send({
        status: true,
      });

    res.send({
      status: false,
      message: "Job Cannot be unsaved successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});
UserRouter.get("/usertype/:user_type", async (req, res) => {
  console.log(`${Date()} `);
  try {
    const response = await Users.find({ UserType: req.params.user_type });
    return res.send({
      status: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});
export default UserRouter;
