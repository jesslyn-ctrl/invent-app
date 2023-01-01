const httpStatus = require('http-status');
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body

  // Validate user input
  if (!name || !email || !password) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error("Please fill in all required fields")
  }
  if (password.length < 8) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error("Password must start with 8 characters")
  }

  // Check if user email already exists
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(httpStatus.CONFLICT);
    throw new Error("Email has already been registered")
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  })

  // If the user created
  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(httpStatus.CREATED).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio
    })
  } else {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error("Invalid user data")
  }
})

module.exports = {
  registerUser,
}
