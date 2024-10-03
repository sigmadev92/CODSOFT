import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function JobPost() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    JobType: "full-time",
    Paid: "no",
    InternSalary: "",
    Venue: "office",
    Cities: "",
    Title: "",
    CompanyName: "",
    Experience: "",
    MustHaveSkills: "",
    GoodToHaveSkills: "",
    SalaryToDisclose: "no",
    Salary: "",
    Preference: "none",
    Department: "",

    About: "",
  });

  const {
    JobType,
    Paid,
    InternSalary,
    Venue,
    Title,
    CompanyName,
    SalaryToDisclose,
    Salary,
    Experience,
    MustHaveSkills,
    GoodToHaveSkills,
    Preference,
    Department,
    Cities,
    About,
  } = details;

  const handleChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    details.ProfilePic = user.userData.ProfilePic;
    details.CreatedBy = user.userData.FullName;
    details.CreatorType = user.userData.UserType;
    details.CreatorInfo = user.userData.USER_ID;
    if (user.userData.UserType === "recruiter")
      details.CompanyName = CompanyName;

    axios
      .post("http://localhost:1008/jobs/add", details)
      .then((response) => {
        if (response.data.status) {
          alert("Job added successfully");
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Connection Issues");
      });
  }
  return (
    <div className="w-[90%] border-[2px] border-black rounded-lg h-[400px] bg-white mx-auto max-w-[400px]  mt-3 right-10 overflow-y-scroll">
      <h1 className="text-center text-white bg-black flex gap-x-2 justify-between sticky top-0 pl-3">
        Enter Job Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center pt-3">
          <img
            src={`http://localhost:1008/${user.userData.ProfilePic}`}
            alt="The org or Recruiter"
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <h1 className="ml-5 font-semibold text-sm text-center">
          {user.userData.FullName}
        </h1>
        {user.userData.UserType === "recruiter" && (
          <input
            type="text"
            name="CompanyName"
            placeholder="Hiring for"
            className="w-[90%] mx-auto block px-4 border-black border-[2px]"
            value={CompanyName}
            onChange={handleChange}
            required
          />
        )}
        <h1 className="text-center text-">Specify the nature of Job</h1>
        <div className="justify-around flex ">
          <label>
            <input
              type="radio"
              name="JobType"
              onChange={handleChange}
              value="full-time"
              checked={JobType === "full-time"}
            />{" "}
            Full Time
          </label>
          <label>
            <input
              type="radio"
              name="JobType"
              value="intern"
              onChange={handleChange}
            />{" "}
            Internship
          </label>
          <label>
            <input
              type="radio"
              name="JobType"
              value="contract"
              onChange={handleChange}
            />{" "}
            Contract
          </label>
        </div>
        {JobType === "intern" && (
          <div>
            <h1 className="text-center">Whether Internship Is paid or not?</h1>
            <div className="justify-around flex ">
              <label>
                <input
                  type="radio"
                  name="Paid"
                  onChange={handleChange}
                  value="no"
                  checked={Paid === "no"}
                />{" "}
                Unpaid
              </label>
              <label>
                <input
                  type="radio"
                  name="Paid"
                  value="yes"
                  onChange={handleChange}
                />{" "}
                Paid
              </label>
            </div>
          </div>
        )}
        {JobType === "intern" && Paid === "yes" && (
          <input
            type="Number"
            name="InternSalary"
            placeholder="Stipend"
            className="w-[90%] mx-auto block px-4 border-black border-[2px]"
            value={InternSalary}
            onChange={handleChange}
            required={Paid === "yes"}
          />
        )}
        <h1 className="text-center">Location of Job</h1>
        <div className="justify-around flex ">
          <label>
            <input
              type="radio"
              name="Venue"
              onChange={handleChange}
              value="office"
              checked={Venue === "office"}
            />{" "}
            Office
          </label>
          <label>
            <input
              type="radio"
              name="Venue"
              value="remote"
              onChange={handleChange}
            />{" "}
            Remote
          </label>
          <label>
            <input
              type="radio"
              name="Venue"
              value="hybrid"
              onChange={handleChange}
            />{" "}
            Hybrid
          </label>
        </div>
        {Venue !== "remote" && (
          <input
            type="text"
            name="Cities"
            placeholder="Enter Cities (separate by commas)"
            className="w-[90%] mx-auto block px-4 border-black border-[2px]"
            value={Cities}
            onChange={handleChange}
            required={Venue !== "remote"}
          />
        )}
        <input
          type="text"
          name="Title"
          placeholder="Job Title"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Title}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="Experience"
          placeholder="Experience eg (0-5)"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Experience}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="MustHaveSkills"
          placeholder="Must have skills (sparate by commas)"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={MustHaveSkills}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="GoodToHaveSkills"
          placeholder="Good to have skills (separate by commas)"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={GoodToHaveSkills}
          onChange={handleChange}
          required
        />
        {JobType !== "intern" && (
          <>
            <h1 className="text-center text-">
              Whether salary to be shown on post
            </h1>
            <div className="justify-around flex ">
              <label>
                <input
                  type="radio"
                  name="SalaryToDisclose"
                  id="SalaryToDisclose"
                  onChange={handleChange}
                  value="no"
                  checked={SalaryToDisclose === "no"}
                />{" "}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="SalaryToDisclose"
                  id="SalaryToDisclose"
                  value="yes"
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
            </div>
          </>
        )}
        {JobType !== "intern" && SalaryToDisclose === "yes" && (
          <input
            type="Number"
            name="Salary"
            placeholder="Salary (CTC) LPA"
            className="w-[90%] mx-auto block px-4 border-black border-[2px]"
            value={Salary}
            onChange={handleChange}
            required={SalaryToDisclose === "yes"}
          />
        )}
        <h1 className="text-center">Any gender preference ?</h1>
        <div className="justify-around flex ">
          <label>
            <input
              type="radio"
              name="Preference"
              onChange={handleChange}
              value="male"
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="Preference"
              value="female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="Preference"
              value="none"
              onChange={handleChange}
              checked={Preference === "none"}
            />{" "}
            None
          </label>
        </div>
        <input
          type="text"
          name="Department"
          placeholder="Department"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Department}
          onChange={handleChange}
          required
        />

        <textarea
          name="About"
          placeholder="Description of Job"
          rows={4}
          className="w-[90%] mx-auto block px-4 border-black border-[2px] resize-none"
          onChange={handleChange}
          value={About}
          required
        ></textarea>
        <div className="flex justify-center p-3">
          <button
            type="submit"
            className="text-white bg-black hover:bg-green-600 rounded-md px-3 "
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
}
