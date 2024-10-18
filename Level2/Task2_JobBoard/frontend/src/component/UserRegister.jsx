import React, { useState } from "react";
import seekerImg from "./images/blank-profile-pic.png";
import recruiterImg from "./images/recruiter-image.png";
import orgImg from "./images/org-image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageDemo2 from "./ImageDemo2";
import { toast } from "react-toastify";
import { usersUrl } from "./functionsJs/urls";

export default function UserRegister(props) {
  const [imageDive, setImageDiv] = useState(false);
  const navigate = useNavigate();
  const [passwordHidden, setpaswordHIdden] = useState(true);
  const [autoGenEmailPass, setAutoGenEmailPass] = useState(false);
  const [verifyMail, setMailBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [resUSER_ID, setUSER_ID] = useState("");
  const [enterOtp, setEnterOTP] = useState("");
  //We have total 13 fileds in database.
  // 8 are common for every type of user
  // UserType, FullName,Email,PhoneNumber,Password,USER_ID,Posts:[],ProfilePic
  //Other 5 based on UserType - Resume, JobRole,CompanyName,Position, JobPostings

  //Out of 8 which are common, 5 can be taken from input
  const [details, setDetails] = useState({
    UserType: props.UserType,
    FullName: "",
    Gender: "0",
    Email: "",
    PhoneNumber: "",
    Password: "",
    BirthDate: "",
  });
  var { UserType, FullName, Gender, Email, PhoneNumber, Password, BirthDate } =
    details;

  //USER_ID and Posts are inserted at run time
  //ProfilePic is changed by different hook

  //Now other 5 which are are based on UserType
  //Resume, JobRole - only for Job Seeker
  //Position and CompanyName - only for Recruiter
  //JobPostings : Either for Organisation or Recruiter

  //Other details
  //posts:[], USER_ID, Resume, JobRole, CompanyName, Position,

  function profile() {
    if (UserType === "org") return orgImg;
    if (UserType === "recruiter") return recruiterImg;
    return seekerImg;
  }

  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [JobRole, setJobRole] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Position, setPosition] = useState("");
  const [imgToBedisp, setImage] = useState(profile);
  const HandleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function verifyMailButton(e) {
    e.preventDefault();
    if (otp === enterOtp) {
      await axios.put(`${usersUrl}/verify-mail/${resUSER_ID}`);
      toast.success(
        `Email ID ${Email} verified successfully.Login to Continue.`
      );
      navigate("/login");
    } else {
      toast.error("The code you entered is not correct.");
    }
  }

  async function HandleSubmit(event) {
    event.preventDefault();
    if (Array.from(FullName.split(" ")).length === 1) {
      return toast.warn(
        "First naame, middle name and lastname should be separated by space"
      );
    }
    if (Array.from(FullName.split(" ")).length > 3) {
      return toast.warn(
        "Please use only First name, middle name(optional) and last name"
      );
    }

    if (!profilePic) {
      toast.warn("Please add your profile picture");
      return;
    }
    const USER_ID = UserType + "-" + Date.now();
    const formData = new FormData();
    //first insert common data
    Array.from(Object.keys(details)).forEach((field) => {
      formData.append(field, details[field]);
    });
    //Another compulsary data which can't be taken with details
    formData.append("USER_ID", USER_ID);
    formData.append("ProfilePic", profilePic, `images-${USER_ID}.jpg`);
    if (UserType === "recruiter") {
      formData.append("CompanyName", CompanyName);
      formData.append("Position", Position);
    }
    if (UserType === "recruiter" || UserType === "org")
      formData.append("JobPostings", []);

    if (UserType === "seeker") {
      formData.append("Resume", resume, `resumes-${USER_ID}.pdf`);
      formData.append("JobRole", JobRole);
    }

    formData.append("AUTO_GENERATED", autoGenEmailPass);
    if (autoGenEmailPass && details.Email === "") {
      console.log("arrived here at main prob");
      const names = Array.from(FullName.split(" "));
      const n = names.length;
      console.log(names);
      const fname = names[0].toLowerCase();
      const lname = names[n - 1].toLowerCase();
      const tempEmail =
        fname +
        lname +
        fname.charCodeAt(0) +
        lname.charCodeAt(0) +
        "@gmail.com";

      const TempPassword = tempEmail.split("@")[0] + "123";
      setDetails((prev) => ({
        ...prev,
        Email: tempEmail,
        Password: TempPassword,
      }));
      formData.set("Email", tempEmail);
      formData.set("Password", TempPassword);
      console.log(details);
    }

    axios
      .post(`${usersUrl}/register`, formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success("You are Registered Successfully");
          setMailBox(true);
          setUSER_ID(response.data.USER_ID);
          setOtp(response.data.code);
        }
        toast.error("Registration Failed");
      })
      .catch((err) => {
        toast("SERVER ERROR");
        console.log(err);
      });
  }
  return (
    <>
      {!verifyMail ? (
        <form
          onSubmit={HandleSubmit}
          className="block h-[250px] overflow-y-scroll"
        >
          <img
            src={imgToBedisp}
            alt="You Profile pic"
            className="w-[50px] h-[50px] m-auto rounded-full my-[10px] border-2 border-blue-500"
            onClick={() => console.log(UserType)}
          />
          <h1
            className="text-center text-[10px] cursor-pointer text-red-500 hover:bg-blue"
            title="A profile pic increases authenticity"
            onClick={() => navigate("/about/#q2")}
          >
            Why Image?
          </h1>
          <div className="flex justify-center bg-black p-2">
            <button
              type="button"
              className="text-white font-mono bg-green-500 px-2 text-[12px] hover:bg-green-700 rounded-md"
              onClick={() => setImageDiv(true)}
            >
              Upload Image
            </button>
          </div>
          {imageDive && (
            <ImageDemo2 fn={{ setImageDiv, setImage, setProfilePic }} />
          )}

          <input
            className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
            type="text"
            name="FullName"
            value={FullName}
            placeholder="Full Name "
            onChange={HandleChange}
          />
          {UserType !== "org" && (
            <label>
              <h1 className="mx-4 font-sans ">Enter your Birth Date : </h1>
              <input
                className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
                type="date"
                name="BirthDate"
                value={BirthDate}
                placeholder="Birth date"
                onChange={HandleChange}
              />
            </label>
          )}

          <label className="ml-3">
            <input
              type="checkbox"
              onClick={() => setAutoGenEmailPass((prev) => !prev)}
            />
            <span className="text-center">
              Auto Generate Email and password
            </span>
          </label>
          {!autoGenEmailPass && (
            <>
              <input
                className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
                type="email"
                name="Email"
                value={Email}
                placeholder="Email"
                onChange={HandleChange}
              />
              <div className="flex  w-[90%] mx-auto justify-center mt-[-10px] mb-[-10px]">
                <input
                  className="border-2 border-blue-600 placeholder:font-mono ml-[-0.5px] w-full px-3 mr-[-3px]"
                  type={passwordHidden ? "password" : "text"}
                  name="Password"
                  value={Password}
                  placeholder="Password"
                  onChange={HandleChange}
                />
                <button
                  type="button"
                  className=" border-2 bg-red-400 border-black h-fit mt-[10px] px-2 hover:bg-[aqua]"
                  onClick={() => setpaswordHIdden((prev) => !prev)}
                >
                  TE
                </button>
              </div>
            </>
          )}

          {UserType !== "org" && (
            <>
              <h1 className="text-center font-bold font-serif"> Gender</h1>
              <h1
                className="text-center text-[10px] mt-[-1px] cursor-pointer text-red-400 hover:text-black font-bold"
                onClick={() => navigate("/about/#q1")}
              >
                why?
              </h1>

              <div className="flex justify-around">
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="Male"
                    onChange={HandleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    onChange={HandleChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="Futanari"
                    onChange={HandleChange}
                  />
                  Futanari
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="not-say"
                    onChange={HandleChange}
                    checked={Gender === "0"}
                  />
                  Skip
                </label>
              </div>
            </>
          )}

          <input
            className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
            type="text"
            maxLength={10}
            name="PhoneNumber"
            value={PhoneNumber}
            placeholder="Contact"
            onChange={HandleChange}
          />
          {UserType === "seeker" && (
            <>
              {" "}
              <input
                className="border-2 border-blue-600 block w-[90%] px-3 mx-auto"
                type="text"
                name="JobRole"
                value={JobRole}
                placeholder="Preferred Job Role"
                onChange={(ev) => setJobRole(ev.target.value)}
              />
              <div className="flex justify-center bg-slate-500">
                <label htmlFor="resume" className="text-white font-mono">
                  Resume
                  <input
                    className="border-2-600 text-black "
                    type="file"
                    name="resume"
                    id="resume"
                    accept="*.pdf"
                    onChange={(event) => {
                      if (event.target.files[0].name.slice(-3) !== "pdf") {
                        alert("Only pdf is allowed");
                        event.target.value = null;
                        return;
                      }
                      setResume(event.target.files[0]);
                    }}
                    required
                  />
                </label>
              </div>
            </>
          )}
          {UserType === "recruiter" && (
            <>
              <input
                className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
                type="text"
                name="Company"
                value={CompanyName}
                placeholder="Your Current Company Name"
                onChange={(ev) => setCompanyName(ev.target.value)}
              />
              <input
                className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
                type="text"
                name="Position"
                value={Position}
                placeholder="Your Position in Current Company"
                onChange={(ev) => setPosition(ev.target.value)}
              />
            </>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-2 mb-2 bg-green-400 font-semibold hover:text-[black] hover:bg-[aqua] border-2 border-black font-serif"
            >
              Register
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-center bg-black text-white">
            Please check your mail for verification code
          </h1>
          <form onSubmit={verifyMailButton} className="flex mx-3">
            <input
              type="text"
              value={enterOtp}
              onChange={(e) => setEnterOTP(e.target.value)}
              className="w-full block border-2 border-red-400 placeholder:text-[12px]"
              placeholder="Enter Verification code"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-black hover:text-white font-mono px-2"
            >
              Verify
            </button>
          </form>
        </>
      )}
    </>
  );
}
