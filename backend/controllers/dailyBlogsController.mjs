import asyncHandler from "express-async-handler";

import DailyBlogList from "../models/DailyBlogListModel.mjs";

// @desc    Get daily blog by date (MM-DD-YYYY)
// @route   GET /api/daily-blogs/:date
// @access  Private
export const getDailyBlog = asyncHandler(async (req, res) => {
  const fileName = req.params.date + ".md";
  const bucketName = process.env.S3_BUCKET_NAME;

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    const data = await req.s3.getObject(params).promise();
    res.status(200).send(data.Body);
  } catch (error) {
    res.send(null);
  }
});

// @desc    Get list of all daily blogs
// @route   GET /api/daily-blogs/list
// @access  Private
export const getDailyBlogList = asyncHandler(async (req, res) => {
  try {
    let blog = await DailyBlogList.findOne({ dailyBlogYear: "2024" });

    if (!blog) throw new Error("Blog list not found.");

    return res.status(200).json(blog.listOfDates);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// @desc    Add a new daily blog
// @route   POST /api/daily-blogs/create
// @access  Private
export const createDailyBlog = asyncHandler(async (req, res) => {
  const { content, date } = req.body;
  if (!content || !date) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  let blogList = await DailyBlogList.findOne({ dailyBlogYear: "2024" });

  if (!blogList) throw new Error("Blog list not found.");

  if (!blogList.listOfDates.includes(date)) {
    blogList.listOfDates.push(date);
  }
  await blogList.save();

  const fileName = `${date}.md`;
  const backupFileName = `backups/${date}-${Date.now()}.md`;
  const bucketName = process.env.S3_BUCKET_NAME;

  const headParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    await req.s3.headObject(headParams).promise();
    const copyParams = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${fileName}`,
      Key: backupFileName,
    };
    await req.s3.copyObject(copyParams).promise();
  } catch (error) {
    if (error.code !== "NotFound") {
      console.log("Error checking or backing up Markdown file: ", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const putParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: content,
    ContentType: "text/markdown",
  };

  try {
    await req.s3.putObject(putParams).promise();
    res.status(200).json({
      success: true,
      message: "Markdown file added/updated successfully in S3.",
    });
  } catch (putError) {
    console.log("Error uploading Markdown file: ", putError);
    res.status(500).json({ success: false, message: putError.message });
  }
});
