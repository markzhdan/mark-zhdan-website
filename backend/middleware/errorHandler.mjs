const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  if (process.env.NODE_ENV !== "production") {
    console.log(`Error message (${res.statusCode}): `, err.message);
    console.log("Error stack: ", err.stack);
  }

  res.json({
    message: err.message,
    error: err,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
