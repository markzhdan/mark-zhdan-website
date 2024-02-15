import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import "./loadEnvironment.mjs";
import connectDB from "./services/database/database.mjs";
import errorHandler from "./middleware/errorHandler.mjs";
import notFound from "./middleware/notFound.mjs";

import dailyBlogs from "./routes/dailyBlogs.mjs";
import users from "./routes/user.mjs";

// import AWS from "aws-sdk";

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.BACK_PORT || 1337;
const app = express();

connectDB();

const frontURL = process.env.FRONT_BASE_URL
  ? process.env.FRONT_BASE_URL
  : `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`;
app.use(cors({ origin: frontURL, credentials: true }));

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/daily-blogs", dailyBlogs);
app.use("/api/users", users);

app.use(errorHandler);
app.use(notFound);

const backURL = process.env.BACK_BASE_URL
  ? process.env.BACK_BASE_URL
  : `http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${backURL}`);
});
