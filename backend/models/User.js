const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  language: {
    type: String,
    enum: ["english", "hindi", "telugu"],
    default: "english"
  },

  // ✅ NEW FIELD ADDED
  photo: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("User", userSchema);