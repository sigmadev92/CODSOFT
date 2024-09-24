import mongoose from "mongoose";
const OrganisationSchema = mongoose.Schema({
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
});
const Organisation = mongoose.model("Organisation ", OrganisationSchema);
export default Organisation;
