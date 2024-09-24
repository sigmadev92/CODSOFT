import mongoose from "mongoose";
const JobSeekerSchema = mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  IsProfilePicUploaded: {
    type: Boolean,
  },
  ProfilePic: {
    type: String,
  },
  Resume: {
    type: String,
  },
});
const JobSeeker = mongoose.model("JobSeeker", JobSeekerSchema);
export default JobSeeker;
