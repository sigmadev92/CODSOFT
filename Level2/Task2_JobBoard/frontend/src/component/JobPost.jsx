import React, { useState } from "react";

export default function JobPost(props) {
  const [details, setDetails] = useState({
    JobType: "full-time",
    Venue: "office",
    Cities: "",
    Title: "",

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
    Venue,
    Title,

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
  return (
    <div className="w-[90%] border-[2px] border-black rounded-lg h-[400px] bg-white mx-auto max-w-[400px] z-20 mt-3 md:absolute top-20 right-10 overflow-y-scroll">
      <h1 className="text-center text-white bg-black flex gap-x-2 justify-between sticky top-0">
        Enter Job Details
      </h1>
      <form>
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
            value={MustHaveSkills}
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          name="Title"
          placeholder="Job Title"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Experience"
          placeholder="Experience eg (0-5)"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={Experience}
          onChange={handleChange}
        />
        <input
          type="text"
          name="MustHaveSkills"
          placeholder="Must have skills (sparate by commas)"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={MustHaveSkills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="GoodToHaveSkills"
          placeholder="Good to have skills (separate by commas)"
          className="w-[90%] mx-auto block px-4 border-black border-[2px]"
          value={GoodToHaveSkills}
          onChange={handleChange}
        />
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
        {SalaryToDisclose === "yes" && (
          <input
            type="Number"
            name="Salary"
            placeholder="Salary (CTC) LPA"
            className="w-[90%] mx-auto block px-4 border-black border-[2px]"
            value={Salary}
            onChange={handleChange}
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
        />

        <textarea
          name="About"
          placeholder="Description of Job"
          className="w-[90%] mx-auto block px-4 border-black border-[2px] resize-none"
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
