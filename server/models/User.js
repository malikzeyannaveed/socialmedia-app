const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name:String,
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

