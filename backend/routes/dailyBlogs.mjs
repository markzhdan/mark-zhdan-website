import express from "express";
const router = express.Router();
import attachS3 from "../middleware/s3Client.mjs";
import {
  getDailyBlog,
  getDailyBlogList,
  createDailyBlog,
} from "../controllers/dailyBlogsController.mjs";

// @route   /api/daily-blogs
router.get("/list", getDailyBlogList);
router.post("/create", attachS3, createDailyBlog);
router.get("/:date", attachS3, getDailyBlog);

export default router;
