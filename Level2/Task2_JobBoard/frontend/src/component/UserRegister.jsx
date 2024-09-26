import React, { useState } from "react";
import seekerImg from "./images/blank-profile-pic.png";
import recruiterImg from "./images/recruiter-image.png";
import orgImg from "./images/org-image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserRegister(props) {
  const navigate = useNavigate();
  const [passwordHidden, setpaswordHIdden] = useState(true);

  //We have total 13 fileds in database.
  // 8 are common for every type of user
  // UserType, FullName,Email,PhoneNumber,Password,USER_ID,Posts:[],ProfilePic
  //Other 5 based on UserType - Resume, JobRole,CompanyName,Position, JobPostings

  //Out of 8 which are common, 5 can be taken from input
  const [details, setDetails] = useState({
    UserType: props.UserType,
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
  });
  const { UserType, Fullname, Email, PhoneNumber, Password } = details;

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

  function HandleSubmit(event) {
    event.preventDefault();
    const USER_ID = UserType + "-" + Date.now();
    const formData = new FormData();
    //first insert common data
    Array.from(Object.keys(details)).forEach((field) => {
      formData.append(field, details[field]);
    });
    //Another compulsary data which can't be taken with details
    formData.append("USER_ID", USER_ID);
    formData.append("Posts", []);
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

    console.log(formData);
    axios
      .post("http://localhost:1008/users/register", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <form onSubmit={HandleSubmit} className="block">
      <img
        src={imgToBedisp}
        alt="You Profile pic"
        className="w-[50px] h-[50px] m-auto rounded-full my-[10px] border-2 border-blue-500"
        onClick={() => console.log(UserType)}
      />
      <h1
        className="text-center text-[10px] cursor-pointer"
        title="A profile pic increases authenticity"
      >
        Why Image?
      </h1>
      <div className="flex justify-center bg-black ">
        <label htmlFor="profile" className="text-white font-serif text-[10px]">
          Profile Picture
          <input
            className="text-[10px]"
            type="file"
            name="image"
            id="profile"
            onChange={(event) => {
              const file = event.target.files[0];
              const extnsion = file.name.slice(-3);
              console.log(extnsion);

              if (
                extnsion !== "jpg" &&
                extnsion !== "png" &&
                file.name.slice(-4) !== "jpeg"
              ) {
                alert("Only png or jpg/jpeg allowed");
                event.target.value = null;
                return;
              }

              const reader = new FileReader();
              reader.onload = (e) => setImage(e.target.result);
              reader.readAsDataURL(file);
              console.log(event.target.files[0]);
              setProfilePic(event.target.files[0]);
            }}
            required
          />
        </label>
      </div>

      <input
        className="border-2 border-blue-600 block w-[90%] px-3 mx-auto placeholder:font-mono"
        type="text"
        name="FullName"
        value={Fullname}
        placeholder="Full Name "
        onChange={HandleChange}
      />
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

      <button
        type="submit"
        className="block w-full bg-green-400 font-semibold hover:text-[black] hover:bg-[aqua] border-t-2 border-black font-serif"
      >
        Register
      </button>
    </form>
  );
}
