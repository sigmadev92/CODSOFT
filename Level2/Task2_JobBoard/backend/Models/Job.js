import mongoose from "mongoose";
const JobSchema = mongoose.Schema({
  ProfilePic: {
    type: String,
  },
  CreatedBy: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
  },
  JobType: {
    //internship, Full Time, Contract
    type: String,
    required: true,
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
  Experience: { Type: String },
  MustHaveSkills: { type: Array },
  GoodToHaveSkills: {
    type: Array,
  },
  SalaryToDisclose: {
    type: String,
  },
  Salary: {
    type: Number,
    required: function () {
      return this.SalaryToDisclose === "yes";
    },
  },

  Preference: {
    type: String,
  },
  Department: {
    type: String,
  },

  About: {
    type: String,
  },
});
const Jobs = mongoose.model("Jobs", JobSchema);
export default Jobs;
