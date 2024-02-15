import express from "express";
const router = express.Router();

import { loginUser } from "../controllers/userController.mjs";

// @route   /api/users
router.post("/login", loginUser);

export default router;
