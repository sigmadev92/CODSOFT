import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { sectors } from "./functionsJs/JobClassification.js";
import { baseUrl, jobsUrl } from "./functionsJs/urls.js";
export default function JobPost(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    Sector: "Agriculture",
    Industry: "Crop Production",
    Department: "Crop Management",
    Vacancies: "",
    JobType: "full-time",
    Paid: "no",
    InternSalary: "",
    Venue: "office",
    Cities: "",
    Title: "",
    CompanyName: "",
    Experience: "",
    Education: "",
    MustHaveSkills: "",
    GoodToHaveSkills: "",
    SalaryToDisclose: "no",
    Salary: "",
    Preference: "none",
    About: "",
    PosterExp:
      user.userData.UserType === "recruiter" && user.userData.Experience,
  });

  const {
    Sector,
    Industry,
    Department,
    Vacancies,
    JobType,
    Paid,
    InternSalary,
    Venue,
    Title,
    CompanyName,
    SalaryToDisclose,
    Salary,
    Experience,
    Education,
    MustHaveSkills,
    GoodToHaveSkills,
    Preference,
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
      .post(`${jobsUrl}/add`, details)
      .then((response) => {
        if (response.data.status) {
          toast.success("Job Added Successfully");
          props.funs.setTab("1");
          props.funs.setJobPost(false);
        } else {
          toast.error(response.data.message);
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
            src={`${baseUrl}/${user.userData.ProfilePic}`}
            alt="The org or Recruiter"
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <h1 className="ml-5 font-semibold text-sm text-center">
          {user.userData.FullName}
        </h1>
        <div className="flex ml-3 gap-x-2 text-[12px]">
          Select Sector
          <select
            name="Sector"
            onChange={(e) => {
              setDetails((prev) => ({
                ...prev,
                Sector: e.target.value,
                Industry: sectors.find((sector) => sector.Name === Sector)
                  .Industries[0],
                Department: sectors.find((sector) => sector.Name === Sector)
                  .Departments[0],
              }));
            }}
          >
            {sectors.map((sector, index) => {
              return (
                <option value={sector.Name} key={index}>
                  {sector.Name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex ml-3 gap-x-2 mt-2 text-[12px]">
          Select Industry
          <select name="Industry" value={Industry} onChange={handleChange}>
            {sectors
              .find((sector) => {
                return sector.Name === Sector;
              })
              .Industries.map((industry, index) => {
                return (
                  <option value={industry} key={index}>
                    {industry}
                  </option>
                );
              })}{" "}
          </select>
        </div>
        {/* <button
          type="button"
          onClick={() => console.log(Industry, Sector, Department)}
        >
          check
        </button> */}
        <div className="flex ml-3 gap-x-1 mt-2 text-[12px]">
          Select Department
          <select name="Department" value={Department} onChange={handleChange}>
            {sectors
              .find((sector) => {
                return sector.Name === Sector;
              })
              .Departments.map((dept, index) => {
                return (
                  <option value={dept} key={index}>
                    {dept}
                  </option>
                );
              })}{" "}
          </select>
        </div>
        <input
          type="Number"
          name="Vacancies"
          placeholder="vacancies..."
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Vacancies}
          onChange={handleChange}
          required
        />
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
          name="Education"
          placeholder="Minimum Educational Qualifications"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Education}
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

        <textarea
          name="About"
          placeholder="Description of Job"
          rows={4}
          maxLength={1500}
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
