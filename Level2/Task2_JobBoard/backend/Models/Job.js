import mongoose from "mongoose";
const JobSchema = mongoose.Schema({
  ProfilePic: {
    type: String,
    required: function () {
      return true;
    },
  },
  CreatedBy: {
    type: String,
    required: function () {
      return true;
    },
  },
  CreatorType: {
    type: String,
    required: function () {
      return true;
    },
  },
  CreatorInfo: {
    type: String,
    required: function () {
      return true;
    },
  },
  CompanyName: {
    //A company for which recruiter is hiring
    type: String,
    required: function () {
      return this.CreatorType === "recruiter";
    },
  },
  JobType: {
    //internship, Full Time, Contract
    type: String,
    required: function () {
      return true;
    },
  },
  Paid: {
    type: String,
    required: function () {
      return this.JobType === "intern";
    },
  },
  InternSalary: {
    type: Number,
    required: function () {
      return this.Paid === "yes";
    },
  },
  Venue: {
    //whether remote, onsite or hybrid
    type: String,
  },
  Cities: {
    type: Array,
    required: function () {
      return this.Venue !== "remote";
    },
  },

  Title: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: function () {
      return true;
    },
  },
  MustHaveSkills: {
    type: Array,
    required: function () {
      return true;
    },
  },
  GoodToHaveSkills: {
    type: Array,
    required: function () {
      return true;
    },
  },
  SalaryToDisclose: {
    type: String,
    required: function () {
      return true;
    },
  },
  Salary: {
    type: Number,
    required: function () {
      return this.SalaryToDisclose === "yes" && this.JobType !== "intern";
    },
  },

  Preference: {
    type: String,
    required: function () {
      return true;
    },
  },
  Department: {
    type: String,
    required: function () {
      return true;
    },
  },

  About: {
    type: String,
    required: function () {
      return true;
    },
  },
});
const Jobs = mongoose.model("Jobs", JobSchema);
export default Jobs;
