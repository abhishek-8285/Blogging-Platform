const multer = require('multer')


const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  if (err instanceof multer.MulterError) {
    err.message="File size should be less than 200kb",err.statusCode=400
  }
  err.statusCode = err.statusCode || 500;

  if (err?.code === 11000) {
    err.message = "Duplicate Key Error";
    err.statusCode = 409;
  }

  res.status(err.statusCode).send({
    status: false,
    message: err.message,
  });
};

module.exports = errorMiddleware;
