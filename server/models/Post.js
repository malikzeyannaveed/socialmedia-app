const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  name:String,
  description:String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

