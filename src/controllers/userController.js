const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
//Register user

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;
  console.log(process.env.JWT_SECRET)
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }


  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
   return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login a user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    
    const token = generateToken(user._id);
   return res
    .cookie("jwt", token, {httpOnly: true,})
    .json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Log out a User

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', '', {
      httpOnly: true
    });
    res.json({ message: 'User logged out' });
  });
module.exports = { registerUser, loginUser, logoutUser };