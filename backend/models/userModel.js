const mongoose = require("mongoose");
// const validator = require('email-validator');
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input your name"]
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please input your password"],
    minLength: [8, "Password must start with 8 characters"],
    trim: true
  },
  photo: {
    type: String,
    required: [true, "Please add your photo"],
    default: "http://clipart-library.com/images/6iy5E5gKT.jpg"
  },
  phone: {
    type: String,
    default: "+62"
  },
  bio: {
    type: String,
    maxLength: [250, "Bio must not be more than 250 characters"],
    default: "Enter your bio"
  }
}, {
  timestamps: true
})

// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
