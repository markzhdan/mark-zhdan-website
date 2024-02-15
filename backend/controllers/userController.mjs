import asyncHandler from "express-async-handler";

import UserModel from "../models/UserModel.mjs";
import bcrypt from "bcrypt";

// @desc    Authenticate User
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await UserModel.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
