import mongoose from "mongoose";
const JobProviderSchema = mongoose.Schema({
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
  Organisation: {
    type: String,
  },
  JobRole: {
    type: String,
  },
});
const JobProvider = mongoose.model("JobProvider", JobProviderSchema);
export default JobProvider;
