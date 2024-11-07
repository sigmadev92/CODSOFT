import Users from "../../Models/Users.js";
import bcrypt from "bcrypt";
import gererator from "generate-password";
import { unlink } from "fs/promises";
import { transporter } from "../../Config/mail.js";

const saltRounds = Number(process.env.SALTROUNDS) || 10;
const salt = await bcrypt.genSalt(saltRounds);

export const registerUser = async (req, res) => {
  console.log("Arrived at POST backend/users/register");
  if (req.body.Email === process.env.MY_EMAIL) {
    deletefiles(req.body.USER_ID);
    console.log("Email same as HOST");
    return res.send({
      status: false,
      message: "ALERT-DANGER",
    });
  }

  try {
    const userExists = await Users.findOne({
      $or: [{ Email: req.body.Email }, { PhoneNumber: req.body.PhoneNumber }],
    });

    if (userExists) {
      deletefiles(req.body.USER_ID);
      console.log("User already registered");
      return res.send({
        status: false,
        message: "Error: User is already Registered",
      });
    }

    //If user is not already registered
    //step-1 we will add name of profile pic t o ProfilePic field.
    req.body.ProfilePic = req.files.ProfilePic[0].originalname;

    //step-2 If the UserType is seeker then we have to add field for resume.
    if (req.body.UserType === "seeker") {
      req.body.Resume = req.files.Resume[0].originalname;
    }
    //step-3 Protecting passwords using hashing
    const enteredPassword = req.body.Password;
    const hashedPassword = await bcrypt.hash(enteredPassword, salt);
    if (hashedPassword) {
      console.log("Password hashed successfully");
      req.body.Password = hashedPassword;
      req.body.IsMailVerified = false;
      const newUser = await Users(req.body);
      await newUser.save();
      //send a verification mail consisting of verification otp to registered mailId.
      //setp-1 generate an OTP
      const OTP = gererator.generate({
        length: 6,
        numbers: true,
        symbols: "#$@_",
        strict: true,
      });
      let message = {
        from: process.env.MY_EMAIL,
        to: req.body.Email,
        subject: "Verify Your Mail Id",
        html: `<P>Dear ${req.body.FullName} <br/>You have successfully registered with our website JobSoft as a ${req.body.UserType}.As a last step, you are requested to fill this verification code ${OTP} to the verification box provided so that we can verify your mail ID.Your credentials : ${req.body.Email} and password ${enteredPassword} <br/>Team JobSoft</p>`,
      };

      transporter
        .sendMail(message)
        .then(() => {
          console.log("OTP sent successfully");
          return res.send({
            status: true,
            code: OTP,
            USER_ID: req.body.USER_ID,
          });
        })
        .catch((err) => {
          deletefiles(req.body.USER_ID);
          console.log(err);
          res.send({
            status: false,
            message: "ERROR_SERVER_TO_MAIL_ERROR",
          });
        });
    } else {
      console.log("Password can't be hashed due to some error");
      return res.send({
        status: false,
        message: "HASH_ALGO_FAILED",
      });
    }
  } catch (err) {
    deletefiles();

    console.log(err);
    res.send({
      status: false,
      message: err.message,
    });
  }
};

function deletefiles(user_id) {
  console.info("THIS RAN FOR THE TIME");
  try {
    unlink(
      `C:\\Users\\DELL\\Desktop\\Software\\MERN\\CODSOFT\\Level2\\Task2_JobBoard\\backend\\profilepics\\images-${user_id}.jpg`
    );
    unlink(
      `C:\\Users\\DELL\\Desktop\\Software\\MERN\\CODSOFT\\Level2\\Task2_JobBoard\\backend\\resumes\\resumes-${user_id}.pdf`
    );
  } catch (error) {
    console.log(error);
  }
}
