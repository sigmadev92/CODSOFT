import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    UserType: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: function () {
        return this.UserType !== "org";
      },
    },
    FullName: {
      type: String,
      required: true,
    },
    BirthDate: {
      type: Date,
      required: function () {
        return this.UserType !== "org";
      },
    },

    Email: {
      type: String,
      required: true,
    },
    IsMailVerified: {
      type: Boolean,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },

    ProfilePic: {
      type: String,
      required: true,
    },
    USER_ID: {
      type: String,
      required: true,
    },
    Posts: {
      type: Array,
    },
    Resume: {
      type: String,
      required: function () {
        return this.UserType === "seeker";
      },
    },

    JobRole: {
      type: String,
      required: function () {
        return this.UserType === "seeker";
      },
    },
    CompanyName: {
      type: String,
      required: function () {
        return this.UserType === "recruiter";
      },
    },
    Position: {
      type: String,
      required: function () {
        return this.UserType === "recruiter";
      },
    },
    About: {
      type: String,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", UserSchema);
export default Users;
