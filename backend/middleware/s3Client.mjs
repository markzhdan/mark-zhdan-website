import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Middleware to attach s3 client to the request
const attachS3 = (req, res, next) => {
  req.s3 = s3;
  next();
};

export default attachS3;
